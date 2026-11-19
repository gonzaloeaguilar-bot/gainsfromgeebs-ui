/**
 * About Kris — named coach, credentials, and trust context.
 * Kris Oddo, NASM-CPT. No outcome claims per Meta health-vertical policy.
 * Copy sourced from Kris's 2026-05-21 voice notes (origin story F1-F4).
 */

import Image from "next/image";
import ProofStrip from "./ProofStrip";
import ReadMore from "@/components/ReadMore";
import SpotifyPlaylist from "./SpotifyPlaylist";

export default function AboutKris() {
  return (
    <section aria-labelledby="meet-title" className="relative">
      <svg
        className="cloud-tiny"
        viewBox="0 0 200 130"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ bottom: "8%", right: "6%", ["--cloud-size" as string]: "75px", transform: "rotate(-8deg)" }}
      >
        <path
          fill="currentColor"
          d="M30 110 Q10 100 15 80 Q5 60 25 50 Q30 25 60 30 Q75 10 100 25 Q125 5 145 30 Q175 25 180 55 Q195 75 175 95 Q180 115 150 115 L30 110 Z"
        />
      </svg>
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 section-y">

        {/* items-start, not items-center. The right column carries the bio, the
            proof strip and the playlist, so the row is far taller than the
            220px portrait; centring left the portrait floating in the middle of
            an empty column with a void above and below it. */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">

          {/* Portrait — Kris Oddo, NASM-CPT */}
          <div className="md:col-span-4 reveal flex md:block justify-center">
            <figure className="photo-slot photo-slot--round relative w-[180px] h-[180px] md:w-[220px] md:h-[220px] border border-line2 overflow-hidden rounded-full">
              <Image
                src="/kris-hero.jpg"
                alt="Kris Oddo, NASM-CPT, online fitness coach"
                fill
                sizes="(max-width: 768px) 180px, 220px"
                className="object-cover object-[50%_20%]"
              />
            </figure>
          </div>

          <div className="md:col-span-8 reveal">
            <p className="eyebrow text-mute2">The coach</p>
            <h2
              id="meet-title"
              className="display mt-4 text-[34px] sm:text-[44px] md:text-[56px] text-bone leading-[1]"
            >
              Meet <span className="display-accent">Kris</span>.
            </h2>

            <p className="mt-6 text-[16.5px] md:text-[17.5px] text-mute leading-[1.65] max-w-[60ch]">
              Kris Oddo, NASM-CPT, has been in the weight room more than half
              his life. His dad bought him his first weight set at twelve. He
              wanted to get strong for sports and, honestly, to look like his
              dad. Sports gave way to college, and college gave way to a real
              lock-in during 2020: garage workouts, a cousin who drilled his
              form, and the slow grind from a skinny teenager to the build he
              has now.
            </p>
            <ReadMore id="kris-bio-more" moreLabel="More about Kris">
              <p className="mt-5 text-[16.5px] md:text-[17.5px] text-mute leading-[1.65] max-w-[60ch]">
                He started coaching the way the good ones do. Friends asked him
                for help, he gave it, and it worked. Today Kris runs Gains from
                Geebs, a 1:1 online coaching practice for men and women, many of
                them busy people who have tried the apps and the influencer plans
                and want a coach who actually knows them.
              </p>
              <p className="mt-5 text-[16.5px] md:text-[17.5px] text-mute leading-[1.65] max-w-[60ch]">
                No team, no assistants, no copy-paste: every program, every
                check-in call, every adjustment comes from Kris. For people who are
                not ready for monthly coaching, the one-time consultation call and
                the Science-Based Community are open without the application path.
              </p>
            </ReadMore>

            <div className="mt-8 hair max-w-[60ch]" />
            <ProofStrip className="mt-6" />
            <SpotifyPlaylist className="mt-8" headingTag="h3" />
          </div>

        </div>
      </div>
    </section>
  );
}
