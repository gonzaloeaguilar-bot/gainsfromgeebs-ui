#!/usr/bin/env python3
"""Validate Cortex quality-enforcement evidence in a GitHub PR body."""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
from typing import Any


FENCED_JSON_RE = re.compile(r"```(?:json)?\s*(\{.*?\})\s*```", re.DOTALL | re.IGNORECASE)


def load_body(path: str | None = None) -> str:
    if path:
        with open(path, "r", encoding="utf-8") as handle:
            return handle.read()
    return os.environ.get("PR_BODY", "")


def candidate_json_blocks(body: str) -> list[dict[str, Any]]:
    candidates: list[str] = []
    stripped = body.strip()
    if stripped.startswith("{") and stripped.endswith("}"):
        candidates.append(stripped)
    candidates.extend(match.group(1).strip() for match in FENCED_JSON_RE.finditer(body))

    out: list[dict[str, Any]] = []
    for candidate in candidates:
        try:
            parsed = json.loads(candidate)
        except json.JSONDecodeError:
            continue
        if isinstance(parsed, dict):
            out.append(parsed)
    return out


def enforcement_record(candidate: dict[str, Any]) -> dict[str, Any]:
    nested = candidate.get("quality_enforcement")
    if isinstance(nested, dict):
        return nested
    return candidate


def target_id_matches(target_id: Any, pr_number: str | None) -> bool:
    if not pr_number:
        return bool(str(target_id or "").strip())
    normalized = str(target_id or "").strip().lower()
    expected = str(pr_number).strip().lower()
    accepted = {expected, f"pr-{expected}", f"#{expected}", f"pull-{expected}", f"pull/{expected}"}
    return normalized in accepted


def validate_record(
    record: dict[str, Any],
    *,
    allowed_projects: set[str],
    pr_number: str | None,
) -> list[str]:
    errors: list[str] = []
    if record.get("status") != "quality_enforced_passed":
        errors.append("status must be quality_enforced_passed")
    if record.get("allowed") is not True:
        errors.append("allowed must be true")
    if record.get("recorded") is not True:
        errors.append("recorded must be true")
    if record.get("target_type") != "pr":
        errors.append("target_type must be pr")
    if not target_id_matches(record.get("target_id"), pr_number):
        errors.append("target_id must match the PR number")
    project = str(record.get("project") or "")
    if allowed_projects and project not in allowed_projects:
        errors.append(f"project {project!r} is not allowed for this repository")
    quality_result = record.get("quality_result")
    if isinstance(quality_result, dict) and quality_result.get("status") != "quality_passed":
        errors.append("quality_result.status must be quality_passed")
    # The evidence has to NAME the gate that ran. Without this, "quality was
    # enforced" is an unfalsifiable claim and the check only verifies that a
    # correctly shaped JSON block exists.
    #
    # Measured on 2026-09-24: PR #700 merged carrying a passing block that
    # asserted builder/skeptic/taste all "ok" while no verdict row for it
    # existed in cto-tasks.db and no CTO decision record referenced it. The
    # honest writer (cto-pr-evidence-drain) always emits deterministic_gate
    # describing what actually ran; the block on #700 had no such field, and
    # neither does the hardcoded block in geebs-page-cycle.sh. Requiring the
    # field fails closed on exactly those self-certified payloads while #697
    # and #699, which were independently reviewed, both carry it.
    if not isinstance(quality_result, dict):
        errors.append("quality_result must be an object")
    else:
        gate = quality_result.get("deterministic_gate")
        if not isinstance(gate, str) or not gate.strip():
            errors.append(
                "quality_result.deterministic_gate must name the gate that ran "
                "(a self-certified payload omits it)"
            )
        missing = quality_result.get("missing_evidence")
        if not isinstance(missing, list):
            errors.append("quality_result.missing_evidence must be a list")
        elif missing:
            errors.append(f"missing_evidence is not empty: {missing}")
    if "quality_enforced_blocked" in json.dumps(record, sort_keys=True):
        errors.append("blocked enforcement evidence is present")
    return errors


def validate_body(
    body: str,
    *,
    allowed_projects: set[str],
    pr_number: str | None = None,
) -> dict[str, Any]:
    candidates = candidate_json_blocks(body)
    checked: list[dict[str, Any]] = []
    for candidate in candidates:
        record = enforcement_record(candidate)
        errors = validate_record(record, allowed_projects=allowed_projects, pr_number=pr_number)
        checked.append(
            {
                "project": record.get("project"),
                "status": record.get("status"),
                "target_type": record.get("target_type"),
                "target_id": record.get("target_id"),
                "errors": errors,
            }
        )
        if not errors:
            return {"status": "quality_pr_evidence_passed", "checked": checked}
    return {
        "status": "quality_pr_evidence_blocked",
        "checked": checked,
        "required_action": (
            "Add a fenced JSON quality-enforce result to the PR body. It must be "
            "quality_enforced_passed, allowed true, recorded true, target_type pr, "
            "and target_id matching this PR number."
        ),
    }


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Validate Cortex quality-enforcement evidence in a PR body.")
    parser.add_argument("--body-file")
    parser.add_argument("--pr-number", default=os.environ.get("PR_NUMBER"))
    parser.add_argument("--allowed-project", action="append", default=[])
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    result = validate_body(
        load_body(args.body_file),
        allowed_projects=set(args.allowed_project),
        pr_number=args.pr_number,
    )
    print(json.dumps(result, indent=2, sort_keys=True))
    return 0 if result["status"] == "quality_pr_evidence_passed" else 2


if __name__ == "__main__":
    sys.exit(main())
