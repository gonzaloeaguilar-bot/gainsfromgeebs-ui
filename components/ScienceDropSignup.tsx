"use client";

import NewsletterSignup from "@/components/NewsletterSignup";

type ScienceDropSignupProps = {
  source?: string;
  compact?: boolean;
  topicLabel?: string;
};

export default function ScienceDropSignup({
  source = "science-drop",
  compact = false,
  topicLabel,
}: ScienceDropSignupProps) {
  const topicCopy = topicLabel
    ? `Get one useful ${topicLabel.toLowerCase()} study breakdown each week, with Kris's practical takeaway and a clear explanation of what the research does and does not prove.`
    : "Get one useful peer-reviewed finding each week, with Kris's practical takeaway and a clear explanation of what the research does and does not prove.";

  return (
    <NewsletterSignup
      source={source}
      variant={compact ? "compact" : "default"}
      heading="Weekly Science Drop"
      subheading={`${topicCopy} No spam, no fake certainty, unsubscribe anytime.`}
      ctaLabel="Get the drop"
      showName
    />
  );
}
