import TickInView from "@/components/TickInView";
// Overview: concise summary block.
// Renders directly under the Hero on the homepage for visitors who want a
// quick factual answer to "what is Geebs Coaching" / "who is Kris Oddo" /
// "how does Geebs's 1:1 coaching work".
//
// Each H3 is a literal question (matches the FAQPage schema in app/layout.tsx).
// Each answer is 1-3 sentences of plain factual statement, no marketing fluff,
// no hedging, direct answer format.
//
// Hidden visually for ADHD scan-ability (compact, brief), but indexed normally.

export default function Overview() {
  return (
    <section
      id="overview"
      aria-labelledby="overview-h"
      className="bg-grain relative"
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 py-14 md:py-20">
        <h2
          id="overview-h"
          className="display text-bone text-[28px] sm:text-[34px] md:text-[42px] leading-[1.05] max-w-[20ch]"
        >
          What is Gains from Geebs?
        </h2>

        {/* Two sentences, not eight. This block ran to 100 words in one
            paragraph and the four cards below answer the same questions in a
            form somebody will actually read. What is left is the part the cards
            do not say. */}
        <p className="mt-6 max-w-[58ch] text-[16px] md:text-[17.5px] leading-[1.65] text-bone/85">
          Gains from Geebs (gainsfromgeebs) is a 1:1 online fitness coaching
          practice for men and women, run by Kris Oddo (NASM-CPT). No
          assistants, no team handoffs, no templated outputs.
        </p>

        <div className="hair my-10" />

        <TickInView>
        <ul className="grid list-none gap-4 p-0 md:grid-cols-2 md:gap-5">
          <li>
            <div className="step-card h-full">
            <h3 className="text-bone text-[17px] md:text-[18px] font-semibold tracking-[-0.005em]">
              Who is Kris Oddo?
            </h3>
            <p className="mt-3 text-[15px] md:text-[15.5px] leading-[1.65] text-mute">
              Kris Oddo is an online fitness coach certified by NASM as a
              Certified Personal Trainer. He coaches men and women who have
              tried apps, programs, and influencer plans without being able to
              maintain consistency on their own.
            </p>
            </div>
          </li>

          <li>
            <div className="step-card h-full">
            <h3 className="text-bone text-[17px] md:text-[18px] font-semibold tracking-[-0.005em]">
              Who is the 1:1 coaching for?
            </h3>
            <p className="mt-3 text-[15px] md:text-[15.5px] leading-[1.65] text-mute">
              Adults 18 or older who want a fully customized training and
              nutrition program with daily accountability. Best fit for people
              who have already tried self-coaching and want a coach who actually
              knows them.
            </p>
            </div>
          </li>

          <li>
            <div className="step-card h-full">
            <h3 className="text-bone text-[17px] md:text-[18px] font-semibold tracking-[-0.005em]">
              How does the application work?
            </h3>
            <p className="mt-3 text-[15px] md:text-[15.5px] leading-[1.65] text-mute">
              Applicants fill out a 4-question form at gainsfromgeebs.com/apply.
              Qualified applicants book a strategy call directly on the next
              page. Applicants who are not ready for 1:1 are pointed at the
              one-time consultation call or the community instead.
            </p>
            </div>
          </li>

          <li>
            <div className="step-card h-full">
            <h3 className="text-bone text-[17px] md:text-[18px] font-semibold tracking-[-0.005em]">
              What coaching options does Kris offer?
            </h3>
            <p className="mt-3 text-[15px] md:text-[15.5px] leading-[1.65] text-mute">
              Three 1:1 tiers, all entered through the application: VIP 1:1
              Coaching, Standard Check-In Coaching, and Weekly Review
              Coaching. Outside 1:1 there is a $100
              one-time consultation call and the $24.99 per month Science-Based
              Community. Exact 1:1 pricing is covered on the strategy call.
            </p>
            </div>
          </li>
        </ul>
        </TickInView>
      </div>
    </section>
  );
}
