import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import NewsletterSignup from "@/components/NewsletterSignup";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/resources/how-to-calculate-macros-for-body-recomposition";
const TITLE = "How to Calculate Macros for Body Recomposition";
const DESCRIPTION =
  "A practical step-by-step guide to setting calories, protein, carbs, and fats for body recomposition.";

export const metadata: Metadata = {
  title: `${TITLE} | Geebs Coaching`,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: `${TITLE} | Geebs Coaching`,
    description: DESCRIPTION,
    siteName: "Geebs Coaching",
    images: ["/social-preview-coaching.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Geebs Coaching`,
    description: DESCRIPTION,
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const steps = [
  {
    name: "Find maintenance calories first",
    text:
      "Use a TDEE estimate as the starting line. Body recomposition works best when you know roughly what keeps your weight stable before you choose a deficit.",
  },
  {
    name: "Set protein before carbs and fats",
    text:
      "Start with 0.8 to 1.0 grams of protein per pound of bodyweight. If you carry a lot of body fat, use goal bodyweight instead.",
  },
  {
    name: "Use a small deficit, not a crash cut",
    text:
      "For most recomp phases, start around 10 to 15 percent below maintenance. That is enough to support fat loss without turning every lift into survival.",
  },
  {
    name: "Set fats, then give the rest to carbs",
    text:
      "A practical starting point is 25 to 30 percent of calories from fat, then the remaining calories from carbs so training performance does not disappear.",
  },
  {
    name: "Adjust from weekly trends",
    text:
      "Track weight average, waist, photos, strength, protein consistency, and training performance. One noisy day does not decide the plan.",
  },
];

const faqs = [
  {
    q: "How do I calculate macros for body recomposition?",
    a:
      "Estimate maintenance calories, set protein at 0.8 to 1.0 grams per pound, use a small 10 to 15 percent deficit, set fats around 25 to 30 percent of calories, then use the remaining calories for carbs.",
  },
  {
    q: "How much protein do I need for body recomp?",
    a:
      "Most people should start around 0.8 to 1.0 grams per pound of bodyweight. If body fat is high, use goal bodyweight so the target stays realistic.",
  },
  {
    q: "Can I lose fat and build muscle at the same time?",
    a:
      "Yes, especially if you are newer to consistent lifting, returning after time off, or have body fat to lose. It still requires hard training, enough protein, and enough recovery.",
  },
  {
    q: "What is a good calorie deficit for recomp?",
    a:
      "A small deficit is usually better than an aggressive cut. Start around 10 to 15 percent below maintenance and adjust from weekly averages, gym performance, and waist trend.",
  },
  {
    q: "Do I need to track macros every day?",
    a:
      "You do not have to track forever. Track long enough to learn portions, protein anchors, and calorie reality. After that, many people can use repeatable meals and weekly check-ins.",
  },
  {
    q: "How long does body recomposition take to see results?",
    a:
      "Strength and energy can improve within weeks. Visible recomposition usually needs multiple consistent months because fat loss, muscle gain, photos, and scale weight move at different speeds.",
  },
  {
    q: "When does a macro calculator stop being enough?",
    a:
      "A calculator gives a starting target. Coaching helps when your week keeps breaking the target: missed lifts, restaurant meals, low sleep, stress, or inconsistent follow-through.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
    datePublished: "2026-06-03",
  dateModified: "2026-06-03",
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
  author: {
    "@type": "Person",
      "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    url: `${SITE_URL}/about`,
  },
  publisher: {
    "@type": "Organization",
    name: "Geebs Coaching",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/apple-touch-icon.png`,
    },
  },
  about: [
    { "@type": "Thing", name: "Body recomposition macros" },
    { "@type": "Thing", name: "Macro calculator" },
    { "@type": "Thing", name: "Protein intake" },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to calculate macros for body recomposition",
  description:
    "A five-step macro setup for body recomposition: maintenance calories, protein, small deficit, fats, carbs, and weekly adjustments.",
  totalTime: "PT10M",
  step: steps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Resources",
      item: `${SITE_URL}/blog`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: TITLE,
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

function MacroMathBox() {
  return (
    <aside className="rounded-2xl border border-line2 bg-bone/[0.03] p-5 md:p-6">
      <p className="eyebrow text-cloudText">Worked example</p>
      <h2 className="mt-3 text-[24px] font-semibold leading-[1.15] text-bone md:text-[30px]">
        180 lb desk worker recomp target
      </h2>
      <div className="mt-5 grid gap-3 text-[14.5px] leading-[1.55] text-bone/85">
        <p>
          Say maintenance is roughly <strong>2,600 calories</strong>. A 12
          percent deficit puts the starting target around{" "}
          <strong>2,300 calories</strong>.
        </p>
        <ul className="grid gap-2">
          <li>
            <strong>Protein:</strong> 180 g = 720 calories.
          </li>
          <li>
            <strong>Fat:</strong> 70 g = 630 calories.
          </li>
          <li>
            <strong>Carbs:</strong> 238 g = about 950 calories.
          </li>
        </ul>
        <p className="text-mute">
          That is not a promise that this person will recomp at a certain speed.
          It is a clean starting point. The next two weeks decide the first
          adjustment.
        </p>
      </div>
    </aside>
  );
}

export default function MacroRecompResourcePage() {
  return (
    <>
      <JsonLd id="macros-recomp-article-schema" data={articleSchema} />
      <JsonLd id="macros-recomp-howto-schema" data={howToSchema} />
      <JsonLd id="macros-recomp-faq-schema" data={faqSchema} />
      <JsonLd id="macros-recomp-breadcrumb-schema" data={breadcrumbSchema} />
      <ArticleShell className={"mx-auto max-w-[900px] px-6 pb-20 pt-14 md:px-10 md:pb-28 md:pt-24"}>
        <header className="max-w-[760px]">
          <p className="eyebrow text-cloudText">Free guide · MACROS</p>
          <h1 className="display mt-4 text-[34px] leading-[1.04] text-bone sm:text-[44px] md:text-[56px]">
            How to calculate macros for body recomposition.
          </h1>
          <p className="mt-6 max-w-[62ch] text-[16.5px] leading-[1.6] text-bone/85 md:text-[18px]">
            Body recomposition does not start with a magic macro split. It
            starts with a realistic calorie target, enough protein, hard
            training, and weekly adjustments from what actually happened.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/tools/macro-calculator?utm_source=site&utm_medium=resource&utm_campaign=macros_recomp&utm_content=top_cta"
              className="btn btn-primary"
            >
              Use the macro calculator
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/blog/body-recomposition-macros"
              className="btn btn-secondary"
            >
              Read the macro guide
            </Link>
          </div>
        </header>

        <div className="hair my-10 md:my-14" />

        <section className="rounded-2xl border border-line2 bg-white/[0.025] p-5 md:p-7">
          <p className="eyebrow text-cloudText">Short answer</p>
          <p className="mt-3 text-[17px] leading-[1.65] text-bone/90 md:text-[18px]">
            To <Link href="/tools/body-recomposition-calculator">calculate macros for body recomposition</Link>, estimate maintenance
            calories, set protein at 0.8 to 1.0 grams per pound, use a small
            10 to 15 percent calorie deficit, set fat around 25 to 30 percent
            of calories, and give the remaining calories to carbs.
          </p>
        </section>

        <section className="prose-section mt-12">
          <h2>The mistake most people make with recomp macros</h2>
          <p>
            Most people try to make the macro split perfect before the training
            week is even real. They ask whether carbs should be 38 percent or 42
            percent, but they have not trained hard three times this week, hit a
            protein floor, or checked whether their weight trend is stable.
          </p>
          <p>
            Kris&apos;s coaching process starts simpler. The first version of
            the plan should be boring enough to execute. You need a target you
            can hit during work, meals out, low sleep, and imperfect weekends.
            Then you adjust from data instead of rebuilding the diet every
            Monday.
          </p>
        </section>

        <section className="mt-12" aria-labelledby="macro-steps-heading">
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="eyebrow text-cloudText">How to set them</p>
              <h2
                id="macro-steps-heading"
                className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
              >
                Five steps for a realistic recomp setup.
              </h2>
            </div>
            <ol className="grid gap-3">
              {steps.map((step, index) => (
                <li
                  key={step.name}
                  className="rounded-lg border border-line2 bg-bone/[0.03] p-4"
                >
                  <p className="text-[13px] font-medium text-cloudText">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-2 text-[17px] font-semibold leading-[1.25] text-bone">
                    {step.name}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-bone/85">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className="my-12">
          <MacroMathBox />
        </div>

        <section className="prose-section">
          <h2>What to adjust first</h2>
          <p>
            Do not change everything after one weird day. If weight is dropping
            fast and lifts are sliding, the deficit may be too aggressive. If
            weight is not moving for two to three weeks and the waist is not
            changing, calories may be too high or tracking may be loose. If
            energy is fine but hunger is out of control, food choices and meal
            timing may need work before calories change.
          </p>
          <p>
            A good recomp check-in looks at the whole picture: training effort,
            top-set performance, steps, sleep, protein days, waist trend, scale
            average, and photos. That is why the macro calculator is only the
            start. The weekly adjustment is where the plan becomes yours.
          </p>
        </section>

        <div className="my-12">
          <NewsletterSignup
            source="resource:macros-recomp"
            heading="Want the simple version saved?"
            subheading="Get Geebs notes on macros, protein targets, and realistic recomp execution. Useful even if you are not ready for coaching."
            ctaLabel="Send me the notes"
          />
        </div>

        <section className="prose-section">
          <h2>When a calculator is enough, and when coaching helps</h2>
          <p>
            If you can train consistently, hit protein, and adjust from weekly
            averages without spiraling, a calculator and a few good guides may
            be enough. Use the targets, repeat the week, and keep the plan
            boring.
          </p>
          <p>
            Coaching helps when execution keeps breaking: missed sessions,
            meals out, travel, low sleep, weekends, or no clear read on what to
            change next. The goal is not a more complicated spreadsheet. The
            goal is a plan that survives the week you actually have.
          </p>
        </section>

        <section className="mt-12 border-t border-line2 pt-8">
          <p className="eyebrow text-cloudText">FAQ</p>
          <h2 className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]">
            Macro questions people get stuck on.
          </h2>
          <div className="mt-6 grid gap-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-lg border border-line2 bg-bone/[0.025] p-4"
              >
                <h3 className="text-[17px] font-semibold leading-[1.3] text-bone">
                  {faq.q}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-mute">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 border-t border-line2 pt-8">
          <p className="eyebrow text-cloudText">Keep going</p>
          <h2 className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]">
            Tools and guides that pair with this.
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              {
                href: "/tools/tdee-calculator",
                label: "TDEE calculator",
                description: "Estimate the maintenance number first.",
              },
              {
                href: "/tools/macro-calculator",
                label: "Macro calculator",
                description: "Turn calories into protein, carbs, and fats.",
              },
              {
                href: "/blog/how-much-protein-to-lose-fat",
                label: "Protein target",
                description: "Why protein is the first macro to set.",
              },
              {
                href: "/blog/body-recomposition-for-men",
                label: "Body recomposition",
                description: "The broader training and nutrition setup.",
              },
              {
                href: "/blog/how-to-fix-skinny-fat",
                label: "Skinny-fat fix",
                description: "When recomp beats another crash cut.",
              },
              {
                href: "/blog/how-long-to-see-results-working-out",
                label: "Results timeline",
                description: "What changes first and what takes longer.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg border border-line2 bg-bone/[0.025] p-4"
              >
                <h3 className="text-[17px] font-semibold leading-[1.25] tracking-normal text-bone">
                  {item.label}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.55] text-mute">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-line2 bg-bone/[0.03] p-5 md:p-7">
          <p className="eyebrow text-cloudText">Want Kris to adjust it?</p>
          <h2 className="mt-3 text-[24px] font-semibold leading-[1.15] text-bone md:text-[30px]">
            If the targets are easy but the week keeps breaking, apply for
            coaching.
          </h2>
          <p className="mt-3 max-w-[58ch] text-[15.5px] leading-[1.65] text-mute">
            The application helps Kris see your goal, training history, and what
            has gotten in the way. If 1:1 is not the right path, the $100 one-time
            consultation call is still there.
          </p>
          <div className="mt-5">
            <Link
              href="/apply?utm_source=site&utm_medium=resource&utm_campaign=macros_recomp&utm_content=end_apply"
              className="btn btn-primary"
            >
              Apply for coaching
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </ArticleShell>
    </>
  );
}
