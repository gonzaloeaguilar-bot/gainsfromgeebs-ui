/**
 * The two angles the kit will not write for you.
 *
 * rail-kit ships the tilt states and geometry and stops there, on purpose:
 * "the SITE writes the two angles, because only the site knows which element
 * is being pointed at and how it wants to sample the pointer."
 *
 * ON THE CEILING, which the kit also leaves to the site and calls a design
 * decision: "the card that IS the gesture can afford five degrees. A card with
 * a PRICE on it cannot: a tariff that sways reads as a banner." A pack card is
 * the gesture — the whole invitation is "tear it open" — so it gets the wider
 * end, but not the full five: it carries a photograph of a real person, and a
 * face that sways reads as a gif.
 */
const MAX_DEG = 4;

export function attachPackTilt(card: HTMLElement) {
  let frame = 0;
  let pending: { x: number; y: number } | null = null;

  /* ONE requestAnimationFrame per frame, which is the kit's instruction and
     not a micro-optimisation: pointermove fires faster than the compositor
     paints, so writing the custom properties per event queues style
     recalculations the screen never shows. */
  const flush = () => {
    frame = 0;
    if (!pending) return;
    const { x, y } = pending;
    card.style.setProperty("--rail-tilt-x", `${(0.5 - y) * 2 * MAX_DEG}deg`);
    card.style.setProperty("--rail-tilt-y", `${(x - 0.5) * 2 * MAX_DEG}deg`);
    card.style.setProperty("--rail-tilt-lx", `${x * 100}%`);
    card.style.setProperty("--rail-tilt-ly", `${y * 100}%`);
  };

  const move = (event: PointerEvent) => {
    const box = card.getBoundingClientRect();
    pending = {
      x: (event.clientX - box.left) / box.width,
      y: (event.clientY - box.top) / box.height,
    };
    if (!frame) frame = requestAnimationFrame(flush);
  };

  const enter = () => card.classList.add("is-tilting");
  const leave = () => {
    card.classList.remove("is-tilting", "is-pressed");
    /* Back to flat rather than frozen at the last angle. The kit's return
       transition is the slow one, so this reads as the card settling. */
    card.style.setProperty("--rail-tilt-x", "0deg");
    card.style.setProperty("--rail-tilt-y", "0deg");
  };
  const press = () => card.classList.add("is-pressed");
  const release = () => card.classList.remove("is-pressed");

  card.addEventListener("pointerenter", enter);
  card.addEventListener("pointermove", move);
  card.addEventListener("pointerleave", leave);
  card.addEventListener("pointerdown", press);
  card.addEventListener("pointerup", release);
  card.addEventListener("pointercancel", leave);

  return () => {
    if (frame) cancelAnimationFrame(frame);
    card.removeEventListener("pointerenter", enter);
    card.removeEventListener("pointermove", move);
    card.removeEventListener("pointerleave", leave);
    card.removeEventListener("pointerdown", press);
    card.removeEventListener("pointerup", release);
    card.removeEventListener("pointercancel", leave);
  };
}
