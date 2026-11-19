import type { ReactNode, Ref } from "react";

export type RailConversationMessage = {
  id: string;
  side: "character" | "visitor";
  body: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
};

export type RailConversationSceneProps = {
  source: string;
  label: string;
  characterLabel: string;
  character: ReactNode;
  messages: RailConversationMessage[];
  composer: ReactNode;
  background?: ReactNode;
  status?: ReactNode;
  typing?: ReactNode;
  endMarker?: ReactNode;
  messageListRef?: Ref<HTMLDivElement>;
  keyboardState?: "closed" | "opening" | "open" | "closing";
  className?: string;
};

/**
 * A full-height conversation canvas where a character, messages and composer
 * share one scene. MANDATORY: in character-led phone chats, keep the character
 * in a stable world column, keep messages in their own readable stream, and
 * keep the composer visible without browser zoom or page scroll. The message
 * history owns vertical scrolling so the page behind a takeover stays still.
 * Character art, seasonal rooms, day/night variants and brand styling come
 * from the consumer; readable messages and the composer always remain in the
 * DOM.
 *
 * Consumer contract: short bubble chunks beat large text blocks; quick replies
 * are chat bubbles, not cards; the host must handle VisualViewport keyboard
 * geometry, 16px inputs, capped multiline drafts, and no cropped character or
 * scene props while typing. If the OS keyboard is open or transitioning, pass
 * keyboardState so the scene can switch to the compact safe composition rather
 * than letting the keyboard cover the character.
 */
export default function RailConversationScene({
  source,
  label,
  characterLabel,
  character,
  messages,
  composer,
  background,
  status,
  typing,
  endMarker,
  messageListRef,
  keyboardState,
  className,
}: RailConversationSceneProps) {
  return (
    <section
      className={["rail-conversationscene", className].filter(Boolean).join(" ")}
      data-rail-conversationscene={source}
      data-rail-keyboard-state={keyboardState}
      aria-label={label}
    >
      <div className="rail-conversationscene__viewport">
        {background && <div className="rail-conversationscene__background" aria-hidden="true">{background}</div>}
        <div className="rail-conversationscene__stage" aria-label={characterLabel}>
          {character}
          {status && <div className="rail-conversationscene__status">{status}</div>}
        </div>
        <div
          ref={messageListRef}
          className="rail-conversationscene__messages"
          data-rail-conversation-messages
          role="log"
          aria-label="Conversation messages"
          aria-live="polite"
          tabIndex={0}
        >
          {messages.map((message) => (
            <article key={message.id} className="rail-conversationscene__message" data-rail-side={message.side}>
              <div className="rail-conversationscene__bubble">{message.body}</div>
              {message.meta && <div className="rail-conversationscene__meta">{message.meta}</div>}
              {message.actions && <div className="rail-conversationscene__actions">{message.actions}</div>}
            </article>
          ))}
          {typing && <div className="rail-conversationscene__typing">{typing}</div>}
          {endMarker}
        </div>
      </div>
      <div className="rail-conversationscene__composer">{composer}</div>
    </section>
  );
}
