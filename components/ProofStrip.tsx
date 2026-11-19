// Ordered strongest-first. On a phone only the first MOBILE_ITEMS show: the
// full five wrap to three rows, which pushed the hero's Apply button past the
// fold on a 375x812 screen. The two that drop are the weakest of the set here —
// "Coach-led 1:1" restates the h1, and "3-6 month coaching blocks" is a
// commitment detail, not a credential. Both still appear from md up, and on
// every surface that carries the packages copy.
const proofItems = [
  "31K+ on Instagram",
  "NASM-CPT",
  "Weekly check-ins",
  "Coach-led 1:1",
  "3-6 month coaching blocks",
];

const MOBILE_ITEMS = 3;

export default function ProofStrip({ className = "" }: { className?: string }) {
  return (
    <ul
      aria-label="Gains from Geebs trust signals"
      className={`trust-strip flex flex-wrap items-center gap-x-3 gap-y-2 text-[12.5px] md:text-[13px] text-mute2 tracking-[0.04em] ${className}`}
    >
      {proofItems.map((item, index) => (
        <li
          key={item}
          className={`items-center gap-3 ${
            index < MOBILE_ITEMS ? "inline-flex" : "hidden md:inline-flex"
          }`}
        >
          {index > 0 ? (
            <span aria-hidden="true" className="text-mute2/60">
              ·
            </span>
          ) : null}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
