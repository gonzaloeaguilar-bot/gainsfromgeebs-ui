import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";
import ToolRetentionCTA from "@/components/ToolRetentionCTA";
import FAQSection from "@/components/FAQSection";
import EducationCostForm from "./EducationCostForm";
import { CERTIFICATION_PRESETS, calculateEducationCost } from "./logic";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/tools/online-trainer-education-cost";

export const metadata: Metadata = {
  title: "Online Trainer Education Cost: Certification Guide & Comparison",
  description:
    "Online trainer education costs $400–$2,000. Compare NASM, ACE, ISSA, and NSCA certification fees, then calculate first-year and renewal costs—free, no signup.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${SLUG}`,
    title: "Online Trainer Education Cost: Certification Guide & Comparison",
    description:
      "Online trainer education costs $400–$2,000. Compare NASM, ACE, ISSA, and NSCA certification fees, then calculate first-year and renewal costs—free, no signup.",
    siteName: "Geebs Coaching",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Trainer Education Cost: Certification Guide & Comparison",
    description:
      "Online trainer education costs $400–$2,000. Compare NASM, ACE, ISSA, and NSCA certification fees, then calculate first-year and renewal costs—free, no signup.",
  },
  robots: { index: true, follow: true },
};

const softwareSchema = {
  "@context": "https://schema.org",
  // WebPage, not SoftwareApplication: Google requires a rating or review on
  // SoftwareApplication and we publish no ratings for our free tools.
  "@type": "WebPage",
  name: "Online Trainer Education Cost Calculator",
  url: `${SITE_URL}${SLUG}`,
  isAccessibleForFree: true,
  publisher: { "@type": "Organization", name: "Geebs Coaching", url: SITE_URL },
  description:
    "A free calculator that totals entered certification, study, exam, and renewal costs for an online trainer education budget.",
};

// Was hand-rolled, and named the hub "Tools" while the other 21 trails name it
// "Free tools" — one node with two names. Derived from the shared helper now.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Online Trainer Education Cost & Certification Comparison",
});

const FAQS = [
  {
    question: "How much does online personal trainer certification cost on average?",
    answer:
      "A primary personal trainer certification typically costs between $400 and $2,000 depending on the certifying body, study package, and exam inclusions. Self-study exam-only options start around $435 to $499, while guided study bundles that add practice exams, hardcopy textbooks and retest vouchers sit at the upper end of that range.",
  },
  {
    question: "Which personal trainer certification is the most cost-effective?",
    answer:
      "NSCA-CPT ($435 base exam fee) and ACE ($499 base package) provide the lowest entry pricing for self-directed students. NASM ($699 base) and ISSA ($799 all-inclusive package) include comprehensive digital study portals. Total first-year costs across these four major accredited bodies range from $599 to $924.",
  },
  {
    question: "What hidden or ongoing expenses should online trainers budget for?",
    answer:
      "Beyond the core certification fee, online trainers need to budget for prerequisite CPR/AED certification, exam retest fees if you do not pass on the first attempt, annual recertification renewals ($50–$99/yr), continuing education units (CEUs every 2 years), and trainer liability insurance. Only the renewal range is priced here because it is the one figure this calculator models directly — check each certifying body for the rest, since they are set by third parties and change.",
  },
  {
    question: "Do you need a college degree or just a certification to train online?",
    answer:
      "You do not need a college degree to work as an online personal trainer. Major accredited certifying bodies (NASM, ACE, ISSA, and NSCA-CPT) require a high school diploma or GED, an active CPR/AED credential, and a passing score on their proctored certification exam.",
  },
  {
    question: "How often do you have to pay recertification or CEU fees?",
    answer:
      "Most major fitness certifying organizations require renewal every two years (NASM, ACE, and ISSA require ~2.0 CEUs), while NSCA operates on a three-year cycle. Renewal fees typically average $50 to $99 per year when budgeted annually.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function OnlineTrainerEducationCostPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="online-trainer-education-cost-software-schema" data={softwareSchema} />
      <JsonLd id="online-trainer-education-cost-faq-schema" data={faqSchema} />
      <JsonLd id="online-trainer-education-cost-breadcrumb-schema" data={breadcrumbSchema} />

      <section className="mx-auto max-w-[760px] px-6 pb-20 pt-14 md:px-10 md:pb-28 md:pt-24">
        <header>
          <p className="eyebrow text-cloudText">Free tool</p>
          <h1 className="mt-4 display text-[30px] leading-[1.05] text-bone sm:text-[38px] md:text-[48px]">
            Online Trainer Education Cost &amp; Certification Comparison
          </h1>
          <p className="mt-5 max-w-[62ch] text-[15.5px] leading-[1.6] text-mute md:text-[17px]">
            Online trainer education and certification typically costs <strong className="text-bone">$400–$2,000</strong> for a primary credential (such as NASM, ACE, ISSA, or NSCA), plus study materials, exam fees, and annual renewals ($50–$99/yr). Use this calculator to model your exact first-year budget and ongoing renewal expenses with zero signup.
          </p>
        </header>

        <div className="mt-8 md:mt-10">
          <EducationCostForm />
        </div>

        <div className="hair my-12 md:my-14" />

        {/* Comparison Table */}
        <section aria-labelledby="benchmark-comparison">
          <p className="eyebrow text-cloudText">Cost benchmarks</p>
          <h2 id="benchmark-comparison" className="mt-3 display text-[22px] leading-[1.15] text-bone md:text-[26px]">
            Major trainer certification cost comparison
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-mute md:text-[16px]">
            Here is how first-year education and certification fees compare across the four most recognized personal training certifications:
          </p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-line2 bg-ink3/20">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-line2 bg-ink3/40 text-bone">
                  <th className="px-4 py-3 font-semibold">Certification</th>
                  <th className="px-4 py-3 font-semibold">Course / Exam</th>
                  <th className="px-4 py-3 font-semibold">Materials</th>
                  <th className="px-4 py-3 font-semibold">Exam/Retest</th>
                  <th className="px-4 py-3 font-semibold text-cloudText">Year 1 Total</th>
                  <th className="px-4 py-3 font-semibold text-mute">Annual Renewal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line2 text-bone/90">
                {CERTIFICATION_PRESETS.map((preset) => {
                  const calculated = calculateEducationCost(preset);
                  return (
                    <tr key={preset.id} className="transition-colors hover:bg-ink3/30">
                      <td className="px-4 py-3 font-medium text-bone">{preset.name}</td>
                      <td className="px-4 py-3">${preset.certification}</td>
                      <td className="px-4 py-3">{preset.studyMaterials > 0 ? `$${preset.studyMaterials}` : "Included"}</td>
                      <td className="px-4 py-3">{preset.examOrRetest > 0 ? `$${preset.examOrRetest}` : "Included"}</td>
                      <td className="px-4 py-3 font-semibold text-cloudText">${calculated.firstYearTotal}</td>
                      <td className="px-4 py-3 text-mute">${preset.renewal}/yr</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <aside
          aria-labelledby="choosing-a-coach-heading"
          className="mt-8 rounded-xl border border-line2 bg-ink3/30 p-6 md:mt-10 md:p-8"
        >
          <p className="eyebrow text-cloudText">Choosing a coach</p>
          <h2
            id="choosing-a-coach-heading"
            className="mt-3 display text-[22px] leading-[1.15] text-bone md:text-[26px]"
          >
            Comparing credentials is a good start. The coaching relationship matters too.
          </h2>
          <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.65] text-mute md:text-[16px]">
            A certification can tell you about a trainer&apos;s education. Before you hire
            someone, make sure their coaching approach, communication, and plan fit your
            goals and real life. If you&apos;re looking for that kind of support, you can
            apply to work with Kris one-on-one.
          </p>
          <p className="mt-3 max-w-[62ch] text-[14.5px] leading-[1.65] text-mute md:text-[15.5px]">
            Looking for what it costs to hire a coach rather than getting certified? Read our guide on{" "}
            <Link
              href="/guides/how-much-does-an-online-fitness-coach-cost"
              className="underline hover:text-bone"
            >
              how much an online fitness coach costs
            </Link>
            .
          </p>
          <a href="/apply" className="btn btn-primary mt-6 inline-flex" data-cta="tool_primary">
            Turn these numbers into a plan <span aria-hidden="true">→</span>
          </a>
        </aside>

        <div className="hair my-12 md:my-14" />

        {/* Detailed Cost Breakdown */}
        <section aria-labelledby="cost-breakdown-heading">
          <p className="eyebrow text-cloudText">Budgeting guide</p>
          <h2 id="cost-breakdown-heading" className="mt-3 display text-[22px] leading-[1.15] text-bone md:text-[26px]">
            Online trainer education cost breakdown
          </h2>
          <div className="mt-6 space-y-6 text-[15px] leading-[1.7] text-bone/85 md:text-[16px]">
            <div>
              <h3 className="font-semibold text-bone text-[17px]">1. Primary Certification Course ($400–$2,000)</h3>
              <p className="mt-2 text-mute">
                Your foundational credential establishes competency in exercise physiology, biomechanics, client screening, and program design. Major accredited programs (NASM, ACE, ISSA, NSCA) offer tiered packages ranging from basic self-study exam vouchers to premium packages with live coaching and practice question banks.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-bone text-[17px]">2. Prerequisite CPR &amp; AED Certification</h3>
              <p className="mt-2 text-mute">
                Every accredited fitness certification requires an up-to-date CPR and Automated External Defibrillator (AED) certification with a hands-on skills check before you can sit for the final exam. These credentials must typically be renewed every two years.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-bone text-[17px]">3. Study Materials and Retest Protection ($0–$160)</h3>
              <p className="mt-2 text-mute">
                Depending on whether you purchase a bundle or an exam-only voucher, textbooks, anatomy guides, and test prep subscriptions cost an extra $100–$160. Retest fees are set by the certifying body and are charged separately if you do not pass on your first attempt, which is what makes a bundled retest voucher worth comparing if you are studying independently.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-bone text-[17px]">4. Ongoing Renewals & Continuing Education ($50–$99/yr)</h3>
              <p className="mt-2 text-mute">
                Certifications do not last indefinitely. Most organizations mandate 1.9–2.0 Continuing Education Units (CEUs) every two years, accompanied by a $50–$99 recertification processing fee to keep your active trainer status in good standing.
              </p>
            </div>
          </div>
        </section>

        {/* Visible HTML FAQ Section */}
        <FAQSection
          faqs={FAQS}
          id="trainer-education-faq"
          eyebrow="Frequently Asked Questions"
          heading="Online trainer education & cost questions"
        />

        <ToolRetentionCTA tool="online-trainer-education-cost" />
      </section>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} exit />
    </main>
  );
}
