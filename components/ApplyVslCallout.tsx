import CoachingDecisionVideo from "@/components/CoachingDecisionVideo";

export default function ApplyVslCallout() {
  return (
    <CoachingDecisionVideo
      source="apply"
      eyebrow="Want more context?"
      title="See how Kris approaches the call."
      body="This focused video explains what happens on the call and how Kris thinks about fit, without sending you off the page."
      headingLevel={2}
      className="mt-12 md:mt-16"
    />
  );
}
