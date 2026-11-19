import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import TopicPackRail from "@/components/TopicPackRail";
import { getTopicPacks } from "@/data/topicPacks";
import ResourceHub from "@/components/ResourceHub";
import { hubCategories } from "@/lib/resourceHub";
import HowItWorks from "@/components/HowItWorks";

export default async function Home() {
  return (
    <>
      <main id="main">
        <Hero />

        {/* The Kris chat card came OFF the homepage 2026-10-07. Added 10-02 as a
            sixth top-level band, past the five-band rule in
            tests/e2e/homepage-density.spec.ts without the conversation that
            rule asks for. GA4 10-02 -> 10-07: 26 users saw it, 1 clicked.
            The dock's "Ask Kris" is the homepage chat entry. */}

        {/* PROOF, THEN THE PACK, THEN THE PLANS.
            The page used to ask for a choice between five tiers in band 2,
            directly under the hero and above any evidence — a decision
            requested before anything had earned the right to request it.
            Proof comes first now, then the pack mechanic, which was the
            most interesting thing here and sat last where few reached it. */}
        <Testimonials />
        <div className="section-divider">
          <div className="hair" />
        </div>
        {/* One pack mechanic across the site. The homepage used to run its own
            smaller deck beside the resource centre's article packs; this is
            the same component, so the cards, the tear and the collection all
            behave identically wherever someone meets them. */}
        <section
          aria-label="Article packs"
          /* py-9 on a phone, not py-14. Measured on the live homepage at
             390x664: each band paid 56px top AND bottom, so every boundary
             between two of them cost 112px of nothing on a page that already
             ran 5,215px. Gonzalo: "hay como demasiado dead space". Desktop
             keeps its looser rhythm — there is room for it there. */
          className="mx-auto max-w-[980px] px-6 py-9 md:px-10 md:py-20"
        >
          <TopicPackRail
            packs={getTopicPacks()}
            captureSource="homepage_packs"
          />
        </section>
        <div className="section-divider">
          <div className="hair" />
        </div>
        {/* THE FIVE-TIER GRID CAME OFF THIS PAGE 2026-09-21.
            Measured in GA4 over the 28 days to 09-20: the homepage rail was
            seen 96 times and produced ONE offer_select. Two across the whole
            site. It was not a conversion path — it was a question almost
            nobody answered, sitting above the proof.

            Today's tip keeps the band. It shared one with the plans because
            the hero left 131px of nothing beneath it, and that gap does not
            close just because the rail left. */}
        {/* THE TIP ASK CAME OFF THIS PAGE 2026-09-21. Gonzalo, from his phone:
            "esto está dos veces en el homepage y no lo necesitamos porque ya
            presentamos esto como parte de los booster packs."
 
            He is right twice over. It was on the page twice — here, and again
            in the footer through FooterNewsletter — and the pack rail directly
            above already makes the same offer, inside an opened pack, where the
            value has just landed. Three asks for one email address on one page
            is not persistence, it is noise. */}
        <div className="mx-auto max-w-[1100px] px-6 pb-4 pt-5 md:px-10 md:pb-6 md:pt-10">
          <HowItWorks inBand />
        </div>
        <div className="section-divider">
          <div className="hair" />
        </div>
        <div className="section-divider">
          <div className="hair" />
        </div>
        {/* Replaces the "Go deeper" cartel rather than joining it. Two
            discovery surfaces were already on this page and the point of the
            pass is to ask less of people, not more. */}
        <ResourceHub categories={hubCategories()} />
        {/* NO BYLINE HERE, deliberately.
            The GEO audit listed `/` among four money pages with no NASM-CPT
            credential. Re-measured on the rendered page: the homepage ALREADY
            carries a visible "NASM-CPT" text node independent of any byline, so the
            credential was never missing — only an explicit author line was.
            And this page has a hard height budget: homepage-density.spec.ts caps the
            mobile document at 5260px, and its comment says exceeding it "needs the
            same conversation, not a quiet edit." A byline here measured +82px
            (42px of text plus 40px padding), taking the page from 5242px to 5324px.
            Adding a redundant mention to break a deliberate budget is the wrong
            trade, so the byline goes on the three pages that genuinely had zero
            credential: /geebs-method, /results, /packages. */}
      </main>

    </>
  );
}
