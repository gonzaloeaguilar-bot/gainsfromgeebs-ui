import type { Metadata } from "next";
import PersonalTrainingDeck from "./PersonalTrainingDeck";

export const metadata: Metadata = {
  title: "Titan Forge Personal Training Deck | Geebs Coaching",
  description:
    "Animated presentation deck for Titan Forge personal training and nutrition coaching packages.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://gainsfromgeebs.com/presentations/personal-training",
  },
};

export default function PersonalTrainingPresentationPage() {
  return <PersonalTrainingDeck />;
}
