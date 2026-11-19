import Link from "next/link";
import {
  scienceQuestionPageBySlug,
  type ScienceQuestionPage,
} from "@/data/scienceQuestions";

type Props = {
  slugs: string[];
};

function resolveQuestions(slugs: string[]): ScienceQuestionPage[] {
  return slugs
    .map((slug) => scienceQuestionPageBySlug(slug))
    .filter((page): page is ScienceQuestionPage => Boolean(page));
}

export default function RelatedScienceQuestions({ slugs }: Props) {
  const questions = resolveQuestions(slugs);
  if (!questions.length) return null;

  return (
    <section
      aria-labelledby="related-science-questions-heading"
      className="mt-14 border-t border-line2 pt-8"
      data-analytics-source="related_science_questions"
    >
      <p className="eyebrow text-cloudText">Peer-reviewed science answers</p>
      <h2
        id="related-science-questions-heading"
        className="display mt-3 text-[24px] leading-[1.12] text-bone md:text-[30px]"
      >
        Keep going with a clear, study-backed answer.
      </h2>
      <p className="mt-3 max-w-[68ch] text-[15px] leading-[1.65] text-mute">
        These pages answer related questions in plain English and link to the
        original PubMed studies.
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {questions.map((page) => (
          <Link
            key={page.slug}
            href={`/science/questions/${page.slug}`}
            className="rounded-lg border border-line2 bg-bone/[0.025] p-4"
            data-analytics-event="related_science_question_click"
            data-analytics-link-kind="science_question"
          >
            <p className="text-[12.5px] font-medium uppercase tracking-[0.16em] text-cloudText">
              {page.eyebrow}
            </p>
            <h3 className="mt-2 text-[18px] font-semibold leading-[1.2] tracking-normal text-bone">
              {page.h1}
            </h3>
            <p className="mt-2 line-clamp-3 text-[14px] leading-[1.55] text-mute">
              {page.shortAnswer}
            </p>
          </Link>
        ))}
      </div>
      <Link
        href="/science/questions"
        className="mt-5 inline-flex text-[14px] font-medium text-bone underline decoration-cloudText/60 underline-offset-4 hover:text-cloudText"
        data-analytics-event="related_science_question_index_click"
        data-analytics-link-kind="science_question_index"
      >
        Browse every peer-reviewed science question
      </Link>
    </section>
  );
}
