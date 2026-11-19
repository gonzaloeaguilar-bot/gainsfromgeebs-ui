type ShortFaq = {
  q: string;
  a: string;
};

type NamedFaq = {
  question: string;
  answer: string;
};

type SchemaFaq = {
  name: string;
  acceptedAnswer: {
    text: string;
  };
};

type Faq = ShortFaq | NamedFaq | SchemaFaq;

type FAQSectionProps = {
  faqs: readonly Faq[];
  id?: string;
  eyebrow?: string;
  heading?: string;
};

function faqText(faq: Faq) {
  if ("q" in faq) return { question: faq.q, answer: faq.a };
  if ("question" in faq) return faq;
  return { question: faq.name, answer: faq.acceptedAnswer.text };
}

export default function FAQSection({
  faqs,
  id = "faq-heading",
  eyebrow = "FAQ",
  heading = "Quick questions",
}: FAQSectionProps) {
  if (!faqs.length) return null;

  return (
    <section aria-labelledby={id} className="mt-12 border-t border-line2 pt-8">
      <p className="eyebrow text-cloudText">{eyebrow}</p>
      <h2
        id={id}
        className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
      >
        {heading}
      </h2>
      <div className="mt-5 divide-y divide-line2 border-y border-line2">
        {faqs.map((faq) => {
          const { question, answer } = faqText(faq);
          return (
            <details key={question} className="group py-1">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cloudText">
                {/* An h3 with the prose primitive, not a span with a fixed
                    px size. The blog's hand-rolled FAQ used prose-h3 and
                    prose-small, so the reader text-size control reached it;
                    this component's hard-coded text-[16px] did not, and
                    swapping the blog onto it silently removed scaling from
                    every FAQ answer. Heading content is allowed inside
                    summary, so the outline survives too. */}
                <h3 className="prose-h3 font-semibold leading-[1.3] tracking-normal text-bone">
                  {question}
                </h3>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-[20px] leading-none text-mute transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="prose-small max-w-[64ch] pb-5 pr-10 text-mute">
                {answer}
              </p>
            </details>
          );
        })}
      </div>
    </section>
  );
}
