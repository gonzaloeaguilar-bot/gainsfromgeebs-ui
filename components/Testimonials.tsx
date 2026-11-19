import Link from "next/link";
import ProofRail from "@/components/ProofRail";
import TransformationGallery from "@/components/TransformationGallery";
import {
  aggregateProof,
  clientResults,
  hasClientResults,
} from "@/data/clientResults";

const coachingProof = [
  {
    label: "Accountability",
    title: "The daily text is the difference.",
    body: "Breakfast, training window, meal timing, sleep, and the plan for the day get handled while the day is still happening.",
  },
  {
    label: "Programming",
    title: "The plan bends before it breaks.",
    body: "Travel week, poor sleep, stalled lifts, missed sessions. The program changes around real constraints instead of pretending they do not exist.",
  },
  {
    label: "Nutrition",
    title: "Macros without the moralizing.",
    body: "Protein targets, flexible food choices, and real-time adjustment. The point is a diet you can keep when work and life get loud.",
  },
];

/**
 * `source` so this can stand beside a decision on more than one page. The rail
 * id is the only thing that differs — the proof does not. Default keeps the
 * homepage's existing GA4 series unbroken.
 */
export default function Testimonials({
  source = "homepage_proof",
}: {
  source?: string;
} = {}) {
  const featuredResults = clientResults.slice(0, 5);
  const featuredAggregateProof = aggregateProof.slice(0, 3);

  return (
    <section aria-labelledby="proof-title" className="relative">
      <svg
        className="cloud-tiny"
        viewBox="0 0 200 130"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{
          bottom: "12%",
          right: "10%",
          ["--cloud-size" as string]: "80px",
        }}
      >
        <path
          fill="currentColor"
          d="M30 110 Q10 100 15 80 Q5 60 25 50 Q30 25 60 30 Q75 10 100 25 Q125 5 145 30 Q175 25 180 55 Q195 75 175 95 Q180 115 150 115 L30 110 Z"
        />
      </svg>
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 section-y">
        <div className="flex items-baseline justify-between gap-6 mb-14 md:mb-16 reveal">
          <div>
            <p className="eyebrow text-mute2">Why it holds</p>
            <h2
              id="proof-title"
              className="display mt-4 text-[34px] sm:text-[44px] md:text-[56px] text-bone max-w-[18ch]"
            >
              Where coaching gets{" "}
              <span className="display-accent">specific</span>.
            </h2>
          </div>
        </div>

        {hasClientResults ? (
          <>
            {/* The photos lead the proof section: they are the evidence a
                visitor recognises before reading a word. They live inside this
                band rather than adding a sixth one, because the homepage
                density guard caps top-level bands at five and a long homepage
                is the defect it exists to prevent. */}
            <div className="reveal">
              <TransformationGallery limit={3} columns={3} />
              <p className="mt-4 text-[13px] leading-[1.6] text-mute2 max-w-[62ch]">
                Photos are shown exactly as shared by the client, nothing is
                added. These are individual client examples, not promised
                outcomes.
              </p>
            </div>

            <div className="mt-10 md:mt-12">
            <ProofRail
              results={featuredResults}
              aggregate={featuredAggregateProof}
              source={source}
            />
            </div>

            <div className="mt-8 md:mt-10 reveal">
              <Link href="/results" className="btn btn-secondary">
                See full client proof
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </>
        ) : (
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {coachingProof.map((item) => (
              <article key={item.label} className="tcard reveal flex flex-col">
                <p className="eyebrow text-cloudText">{item.label}</p>
                <h3 className="display mt-5 text-[22px] md:text-[24px] leading-[1.25] text-bone">
                  {item.title}
                </h3>
                <p className="mt-5 text-[15px] leading-[1.65] text-mute">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
