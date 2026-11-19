"use client";

import { useRef } from "react";
import { trackClientEvent } from "@/lib/clientAnalytics";

const folders = [
  {
    id: "coaching",
    label: "Choose your coaching",
    tone: "cherry",
    links: [
      {
        href: "/geebs-method",
        title: "The Geebs Method",
        text: "See how training, food, recovery, and accountability fit together.",
      },
      {
        href: "/packages",
        title: "Compare packages",
        text: "Find the level of support that fits your goals and budget.",
      },
      {
        href: "/for/online-fitness-coach-for-men",
        title: "Online coaching for men",
        text: "Learn what personal coaching looks like around a busy schedule.",
      },
      {
        href: "/personal-training-denver",
        title: "Denver coaching",
        text: "Explore coaching for Denver and Colorado clients.",
      },
    ],
  },
  {
    id: "proof",
    label: "See real client proof",
    tone: "graphite",
    links: [
      {
        href: "/results",
        title: "Client results",
        text: "View photos, reviews, and tracked outcomes from real clients.",
      },
    ],
  },
  {
    id: "research",
    label: "Use the research",
    tone: "wine",
    links: [
      {
        href: "/science",
        title: "Science library",
        text: "Turn peer-reviewed research into practical decisions.",
      },
      {
        href: "/science/protein-body-composition-studies",
        title: "Protein & body composition",
        text: "Understand what protein can actually change.",
      },
      {
        href: "/science/sleep-and-fat-loss-studies",
        title: "Sleep & fat loss",
        text: "See how sleep affects hunger, recovery, and progress.",
      },
    ],
  },
  {
    id: "compare",
    label: "Compare your options",
    tone: "oxide",
    links: [
      {
        href: "/blog/best-online-fitness-coaches-for-busy-men",
        title: "Best coaches for busy men",
        text: "Compare credible coaching choices without the sales fog.",
      },
      {
        href: "/blog/online-fitness-coach-vs-personal-trainer",
        title: "Online coach vs personal trainer",
        text: "Choose the format that fits how you actually live.",
      },
    ],
  },
] as const;

export default function ExploreCartel() {
  const cabinetRef = useRef<HTMLDivElement>(null);

  function keepOneOpen(current: HTMLDetailsElement) {
    if (!current.open) return;
    cabinetRef.current
      ?.querySelectorAll<HTMLDetailsElement>("details[open]")
      .forEach((folder) => {
        if (folder !== current) folder.open = false;
      });
  }

  return (
    <section
      className="mx-auto max-w-[1100px] px-6 py-14 md:px-10 md:py-20"
      data-homepage-discovery=""
      aria-labelledby="discovery-title"
    >
      <div className="max-w-[680px]">
        <p className="eyebrow text-cloudText">Go deeper</p>
        <h2
          id="discovery-title"
          className="mt-3 text-[30px] font-semibold leading-[1.12] text-bone md:text-[38px]"
        >
          What do you want to figure out?
        </h2>
        <p className="mt-3 text-[15px] leading-[1.6] text-mute">
          Open a folder and choose the page that matches your next question.
        </p>
      </div>

      <div ref={cabinetRef} className="file-cabinet mt-9" data-file-cabinet="">
        {folders.map((folder) => (
          <details
            key={folder.id}
            className="file-drawer"
            data-folder-tone={folder.tone}
            onToggle={(event) => keepOneOpen(event.currentTarget)}
          >
            <summary>
              <span>{folder.label}</span>
              <span className="file-drawer__count">
                {folder.links.length}{" "}
                {folder.links.length === 1 ? "page" : "pages"}
              </span>
              <span className="file-drawer__chevron" aria-hidden="true">
                ⌄
              </span>
            </summary>
            <div className="file-drawer__reveal">
              <div className="file-drawer__content">
                {folder.links.map((link, linkIndex) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="file-drawer__link"
                    onClick={() =>
                      trackClientEvent("discovery_select", {
                        folder_id: folder.id,
                        link_index: linkIndex + 1,
                        destination: link.href,
                      })
                    }
                  >
                    <span>
                      <strong>{link.title}</strong>
                      <small>{link.text}</small>
                    </span>
                    <span aria-hidden="true">→</span>
                  </a>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>

      <aside className="explore-intensive-invite">
        <a
          href="https://titanforgefit.com/coaching-intensive?utm_source=gainsfromgeebs&utm_medium=referral&utm_campaign=geebs_titanforge_intensive_bridge&utm_content=homepage_discovery"
          data-analytics-event="titanforge_intensive_referral_click"
          data-analytics-link-kind="titanforge_intensive_referral"
          className="explore-intensive-invite__link"
        >
          <span className="explore-intensive-invite__message">
            <small>Prefer a shorter commitment?</small>
            <strong>Take the 30-day coaching intensive</strong>
            <span>
              A focused month of training, nutrition, and accountability built
              around your real schedule.
            </span>
          </span>
          <span className="explore-intensive-invite__action">
            See what is included
            <span aria-hidden="true">→</span>
          </span>
        </a>
      </aside>
    </section>
  );
}
