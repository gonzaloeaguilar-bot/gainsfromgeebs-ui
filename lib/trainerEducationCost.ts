export type EducationCostResult = {
  headline: string;
  detail: string;
};

const CERTIFICATION_LOW = 400;
const CERTIFICATION_HIGH = 2000;

export function getTrainerEducationCostResult(budget: number): EducationCostResult {
  if (budget < CERTIFICATION_LOW) {
    return { headline: "Plan for a larger starting budget", detail: "The primary certification range on this page starts at $400. Study materials and retest fees can add to that total." };
  }
  if (budget < CERTIFICATION_HIGH) {
    return { headline: "Within the published certification range", detail: "Your budget falls within the $400–$2,000 range listed here for a primary certification. Keep room for study materials and any retest fees." };
  }
  return { headline: "Covers the published certification range", detail: "Your budget meets the top of the $400–$2,000 primary-certification range listed here. Continuing education and recertification are separate costs to plan for." };
}
