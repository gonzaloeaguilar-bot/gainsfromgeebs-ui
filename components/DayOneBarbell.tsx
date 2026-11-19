/**
 * The Day One barbell.
 *
 * WAS A VECTOR, AND THAT WAS THE PROBLEM. The art-direction pass scored the
 * imagery 3/10: "a flat vector with gradient shading — no contact shadow, no
 * depth-of-field falloff, no floor. It floats. The site's own hero is a real
 * photograph of Kris; the intro is a scaled SVG." Gonzalo's word for it was
 * cartoonish, and a different brand's notes had already reached the same
 * diagnosis in the same words: "the remaining cheap feeling is source-art
 * fidelity, not missing animation timing."
 *
 * So the fix is the asset, not the easing. This is a photoreal render —
 * matte rubber bumper plates with visible texture, steel hubs, one hard key
 * from upper left, a crimson rim on the plate edges, shallow depth of field
 * with the near collar sharp and the far collar falling off, and a contact
 * shadow so it sits on a floor instead of hovering over one.
 * Generated once via google/gemini-3-pro-image, $0.139.
 *
 * AND IT IS LOADED ON BOTH SIDES. The old one never was, at any frame: "men
 * who lift know a one-sided bar is the thing that tips off the rack, and Kris
 * is a coach selling technique." That was the worst semantic in the piece.
 *
 * THE MOTION IS A CAMERA, NOT AN ASSEMBLY. The proposal had the plates flying
 * in and seating — which is motion-graphics grammar, and parts assembling
 * themselves is the exact register Gonzalo called cartoonish. Cinematic is a
 * light and a lens: the bar is revealed by a key light travelling across it,
 * on a slow push-in, with the focus already where the eye should land.
 */
export default function DayOneBarbell() {
  return (
    <div className="dayone-bar" aria-hidden="true">
      <img
        className="dayone-bar__plate"
        src="/intro/barbell.png"
        alt=""
        width={1600}
        height={714}
        /* eager + fetchpriority: this is the first paint of the session and a
           hero that arrives after its own reveal has finished is not a hero. */
        loading="eager"
        fetchPriority="high"
        decoding="sync"
      />
      <span className="dayone-bar__sweep" />
    </div>
  );
}
