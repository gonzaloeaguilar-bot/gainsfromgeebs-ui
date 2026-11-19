import type { ScienceStudy } from "@/data/scienceLibrary";

type StudyIdentifierSource = Pick<
  ScienceStudy,
  "pubmedId" | "doi" | "sourceUrl" | "doiUrl"
>;

// Schema.org has no `doi` property (Semrush/Rich Results flag it), so DOIs are
// expressed as a PropertyValue identifier plus a doi.org sameAs URL instead.
export function scienceStudyIdentifierProps(study: StudyIdentifierSource) {
  const identifiers = [
    ...(study.pubmedId
      ? [{ "@type": "PropertyValue", propertyID: "PMID", value: study.pubmedId }]
      : []),
    ...(study.doi
      ? [{ "@type": "PropertyValue", propertyID: "DOI", value: study.doi }]
      : []),
  ];
  const doiUrl =
    study.doiUrl ?? (study.doi ? `https://doi.org/${study.doi}` : undefined);
  const sameAs = [study.sourceUrl, ...(doiUrl ? [doiUrl] : [])];
  return {
    sameAs: sameAs.length === 1 ? sameAs[0] : sameAs,
    ...(identifiers.length
      ? { identifier: identifiers.length === 1 ? identifiers[0] : identifiers }
      : {}),
  };
}
