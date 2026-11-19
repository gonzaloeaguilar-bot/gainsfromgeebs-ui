import ResourceLibrary from "@/app/resources/library";

/** Reuse the original book UI, including its covers and horizontal browsing. */
export default function ScienceHubFeature() {
  return <section className="mt-8" aria-labelledby="hub-science-heading">
    <h2 id="hub-science-heading" className="display text-[30px] leading-tight md:text-[40px]">Science library</h2>
    <p className="mt-3 text-[15px] leading-relaxed text-mute">
      Browse the books by topic. Open one to explore the research.
    </p>
    <ResourceLibrary shelfIds={["science"]} />
  </section>;
}
