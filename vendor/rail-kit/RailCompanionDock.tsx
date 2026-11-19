import type { ReactNode } from "react";

export type RailCompanionDockAction = {
  label: string;
  value?: string;
  onSelect?: () => void;
};

export type RailCompanionDockProps = {
  source: string;
  label: string;
  name: string;
  prompt: ReactNode;
  character: ReactNode;
  background: ReactNode;
  suggestions: RailCompanionDockAction[];
  inputLabel: string;
  inputPlaceholder: string;
  sendLabel: string;
  moreLabel?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onInputFocus?: () => void;
  onInputBlur?: () => void;
  keyboardState?: "closed" | "opening" | "open" | "closing";
  closeLabel?: string;
  onClose?: () => void;
  className?: string;
};

/**
 * A full-screen companion assistant scene with the character and place as the
 * main object, and chat controls kept in a compact bottom dock.
 *
 * The component does not choose a model, store memory, ship a persona, or draw
 * the brand character. Consumers provide those. It only enforces the reusable
 * layout rule learned from Geebs and Caro: short prompt, large character,
 * small suggestions, and one composer dock that does not cover the character.
 *
 * Companion consumers must pair this visual shell with the behavior contract in
 * docs/COMPANION-ASSISTANT-STANDARD.md: intent-aware answers, sourced context,
 * server-side GPT only when used, deterministic fallback, and persona UAT.
 *
 * Quest/game consumers must also follow
 * docs/COMPANION-QUEST-SPRITE-WORKFLOW.md before integration: build real
 * full-body sprite packs first, author walk targets and blocked areas, and keep
 * working/item interactions physically plausible in the room.
 *
 * Keyboard-led consumers must pass keyboardState from the host's measured
 * VisualViewport/native keyboard inset. The open state is a separate art
 * composition: character face above the composer, latest message visible, and
 * the lower world treated as keyboard-owned space.
 */
export default function RailCompanionDock({
  source,
  label,
  name,
  prompt,
  character,
  background,
  suggestions,
  inputLabel,
  inputPlaceholder,
  sendLabel,
  moreLabel,
  value,
  onValueChange,
  onSubmit,
  onInputFocus,
  onInputBlur,
  keyboardState,
  closeLabel,
  onClose,
  className,
}: RailCompanionDockProps) {
  return (
    <section
      className={["rail-companiondock", className].filter(Boolean).join(" ")}
      data-rail-companiondock={source}
      data-rail-keyboard-state={keyboardState}
      aria-label={label}
    >
      <div className="rail-companiondock__scene" aria-hidden="true">{background}</div>
      <header className="rail-companiondock__top">
        <div className="rail-companiondock__brand"><span aria-hidden="true">{name.slice(0, 1)}</span>{name}</div>
        {onClose && (
          <button className="rail-companiondock__close" type="button" aria-label={closeLabel ?? "Close"} onClick={onClose}>
            x
          </button>
        )}
      </header>
      <div className="rail-companiondock__prompt">{prompt}</div>
      <div className="rail-companiondock__character">{character}</div>
      <div className="rail-companiondock__suggestions" aria-label="Suggested searches">
        {suggestions.map((item) => (
          <button key={item.label} type="button" onClick={item.onSelect} data-rail-value={item.value ?? item.label}>
            {item.label}
          </button>
        ))}
      </div>
      <form
        className="rail-companiondock__composer"
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const input = form.elements.namedItem("rail-companiondock-input") as HTMLInputElement | null;
          onSubmit?.(input?.value ?? value ?? "");
        }}
      >
        {moreLabel && <button className="rail-companiondock__more" type="button" aria-label={moreLabel}>+</button>}
        <input
          name="rail-companiondock-input"
          aria-label={inputLabel}
          placeholder={inputPlaceholder}
          value={value}
          onChange={(event) => onValueChange?.(event.currentTarget.value)}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
        />
        <button className="rail-companiondock__send" type="submit">{sendLabel}</button>
      </form>
    </section>
  );
}
