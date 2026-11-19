export type EducationCostInput = {
  certification: number;
  studyMaterials: number;
  examOrRetest: number;
  renewal: number;
};

export type EducationCostResult = {
  firstYearTotal: number;
  renewalTotal: number;
};

export type CertificationPreset = {
  id: string;
  name: string;
  certification: number;
  studyMaterials: number;
  examOrRetest: number;
  renewal: number;
};

export const CERTIFICATION_PRESETS: CertificationPreset[] = [
  { id: "nasm", name: "NASM CPT", certification: 699, studyMaterials: 150, examOrRetest: 75, renewal: 99 },
  { id: "ace", name: "ACE Personal Trainer", certification: 499, studyMaterials: 100, examOrRetest: 0, renewal: 99 },
  { id: "issa", name: "ISSA Personal Trainer", certification: 799, studyMaterials: 0, examOrRetest: 0, renewal: 99 },
  { id: "nsca", name: "NSCA-CPT", certification: 435, studyMaterials: 160, examOrRetest: 75, renewal: 50 },
];

export function calculateEducationCost({
  certification,
  studyMaterials,
  examOrRetest,
  renewal,
}: EducationCostInput): EducationCostResult {
  return {
    firstYearTotal: Math.round(certification + studyMaterials + examOrRetest),
    renewalTotal: Math.round(renewal),
  };
}

export function parseCost(value: string): number | null {
  const normalized = value.trim().replace(/[$,\s]/g, "");
  if (!normalized) return 0;
  const amount = Number(normalized);
  return Number.isFinite(amount) && amount >= 0 ? amount : null;
}

