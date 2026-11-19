import Link from "next/link";
import FooterNewsletter from "@/components/FooterNewsletter";
import FooterGroup from "@/components/FooterGroup";

/**
 * Footer — social links are SAFE per refined cross-platform safety model (Gonzalo confirmed 2026-05-20):
 * - IG / TikTok / YouTube from a business website = standard practice, Meta does not flag for this
 * - BANNED: Beacons / Linktree / OnlyFans / any link aggregator — do NOT add these back
 *
 * The nav block is the site's full link tree. Header handles immediate route
 * recovery; footer keeps every non-homepage route discoverable.
 *
 * Newsletter signup (compact variant) sits between the brand row and nav —
 * source='footer' for attribution.
 */

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 min-w-11 items-center text-[14px] text-mute hover:text-bone transition-colors"
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="relative">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <div className="hair" />

        {/* Row 1: brand */}
        <div className="pt-10 md:pt-12 pb-8">
          <Link
            href="/"
            className="eyebrow inline-flex min-h-11 items-center text-bone/85 hover:text-bone transition-colors"
            aria-label="Geebs Coaching home"
          >
            <span className="inline-flex items-center gap-2.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-cloud" />
              Geebs Coaching
            </span>
          </Link>
        </div>

        {/* Newsletter signup — stands down when the page already has one */}
        <FooterNewsletter />

        {/* Row 2: site navigation — full link tree to every page */}
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-9 pb-10 border-b border-line"
        >
          <FooterGroup title={<span>Coaching</span>}>
            <ul className="mt-3.5 space-y-2.5">
              <li>
                <NavLink href="/packages">Coaching packages</NavLink>
              </li>
              <li>
                <NavLink href="/referral">Referral program</NavLink>
              </li>
              <li>
                <NavLink href="/apply">Apply for 1:1</NavLink>
              </li>
              <li>
                <NavLink href="/geebs-method">The Geebs Method</NavLink>
              </li>
              <li>
              </li>
              <li>
                <NavLink href="/methodology">Detailed methodology</NavLink>
              </li>
              <li>
                <NavLink href="/for/busy-professionals">
                  For busy professionals
                </NavLink>
              </li>
              <li>
                <NavLink href="/for/executives">For executives</NavLink>
              </li>
              <li>
                <NavLink href="/for/founders">For founders</NavLink>
              </li>
              <li>
                <NavLink href="/for/high-income-professionals">
                  Premium coaching
                </NavLink>
              </li>
              <li>
                <NavLink href="/for/software-engineers">
                  For software engineers
                </NavLink>
              </li>
              <li>
                <NavLink href="/for/remote-workers">For remote workers</NavLink>
              </li>
              <li>
                <NavLink href="/for/online-fitness-coach-for-men">
                  Online fitness coach for men
                </NavLink>
              </li>
              <li>
                <NavLink href="/for/online-fitness-coach-for-women">
                  Online fitness coach for women
                </NavLink>
              </li>
              <li>
                <NavLink href="/personal-training-denver">
                  Denver personal training
                </NavLink>
              </li>
              <li>
                <NavLink href="/body-recomposition-coach-denver">
                  Denver body recomposition coach
                </NavLink>
              </li>
              <li>
                <NavLink href="/skinny-fat-transformation-coach-denver">
                  Denver skinny-fat transformation coach
                </NavLink>
              </li>
              <li>
                <NavLink href="/for/men-getting-married">
                  Fitness coaching for grooms
                </NavLink>
              </li>
              <li>
                <NavLink href="/locations/cherry-creek">Cherry Creek coaching</NavLink>
              </li>
              <li>
                <NavLink href="/locations/englewood">Englewood coaching</NavLink>
              </li>
              <li>
                <NavLink href="/locations/parker">Parker coaching</NavLink>
              </li>
              <li>
                <NavLink href="/results">Client results</NavLink>
              </li>
              <li>
                <NavLink href="/faq">FAQ</NavLink>
              </li>
              <li>
                <NavLink href="/about">About Kris</NavLink>
              </li>
            </ul>
          </FooterGroup>
          <FooterGroup title={<span>Compare</span>}>
            <ul className="mt-3.5 space-y-2.5">
              <li>
                <NavLink href="/vs/future">Geebs vs Future</NavLink>
              </li>
              <li>
                <NavLink href="/vs/caliber">Geebs vs Caliber</NavLink>
              </li>
              <li>
                <NavLink href="/vs/hiring-a-personal-trainer">
                  Geebs vs a personal trainer
                </NavLink>
              </li>
              <li>
                <NavLink href="/vs/chatgpt">Geebs vs ChatGPT</NavLink>
              </li>
              <li>
                <NavLink href="/vs/fitness-apps">Geebs vs fitness apps</NavLink>
              </li>
              <li>
                <NavLink href="/vs/trainwell">Geebs vs Trainwell</NavLink>
              </li>
            </ul>
          </FooterGroup>
          <FooterGroup title={<span>Tools &amp; guides</span>}>
            <ul className="mt-3.5 space-y-2.5">
              <li>
                <NavLink href="/free/daily">Today&apos;s Finding, one study a day</NavLink>
              </li>
              <li>
                <NavLink href="/blog">Learning hub</NavLink>
              </li>
              <li>
                <NavLink href="/nutrition">Nutrition evidence guides</NavLink>
              </li>
              <li>
                <NavLink href="/science">Peer-reviewed science library</NavLink>
              </li>
              <li>
                <NavLink href="/science/questions">Science question index</NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/can-you-build-muscle-and-lose-fat-at-the-same-time">
                  Build muscle and lose fat?
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/should-you-cut-or-recomp-first">
                  Cut or recomp first?
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/fresh-research">
                  Fresh research
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/weekly-digest">
                  Weekly Science Drop archive
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/weekly-science-drop">
                  Weekly Science Drop email
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/weekly-digest/2026-07-06">
                  Latest Science Drop
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/weekly-digest/sleep-screens-cravings">
                  Sleep and cravings drop
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/weekly-digest/protein-satiety-recomposition">
                  Protein and recomp drop
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/weekly-digest/lifting-cardio-longevity">
                  Lifting and longevity drop
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/weekly-digest/food-environment-calorie-control">
                  Cravings and calorie-control drop
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/weekly-digest/creatine-strength-aging">
                  Creatine and strength drop
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/weekly-digest/cardio-dose-fat-loss">
                  Cardio and fat-loss drop
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/weekly-digest/muscle-retention-fat-loss">
                  Fat loss and muscle drop
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/citation-map">
                  Science source guide
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/studies">
                  Science study library
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/sleep-and-fat-loss-studies">
                  Sleep and fat-loss studies
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/protein-body-composition-studies">
                  Protein and body-composition studies
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/cardio-longevity-studies">
                  Cardio and longevity studies
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/anti-aging-fitness-studies">
                  Anti-aging fitness studies
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/cravings-appetite-studies">
                  Cravings and appetite studies
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/omega-3-fish-oil-studies">
                  Omega-3 and fish-oil studies
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/does-omega-3-help-workout-recovery">
                  Omega-3 and workout recovery
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/does-fish-oil-build-muscle">
                  Does fish oil build muscle?
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/what-omega-3-dose-did-exercise-studies-test">
                  Omega-3 amounts in studies
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/does-poor-sleep-cause-cravings">
                  Does poor sleep cause cravings?
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/does-sleep-deprivation-make-you-eat-more">
                  Sleep deprivation and appetite
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/how-much-protein-for-body-recomposition">
                  Protein for body recomposition
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/does-protein-help-you-stay-full">
                  Protein and staying full
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/does-protein-help-preserve-muscle-as-you-age">
                  Protein and aging muscle
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/does-cardio-hurt-muscle-growth">
                  Does cardio hurt muscle growth?
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/cardio-or-weights-for-fat-loss">
                  Cardio or weights for fat loss?
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/is-lifting-enough-for-longevity">
                  Is lifting enough for longevity?
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/does-strength-training-help-you-age-better">
                  Strength training and aging
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/does-resistance-training-help-brain-health-as-you-age">
                  Resistance training and brain health
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/do-cravings-mean-you-are-deficient">
                  Do cravings mean deficiency?
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/why-do-i-crave-snacks-at-night">
                  Why night cravings happen
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/does-caffeine-before-bed-hurt-sleep">
                  Caffeine before bed
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/can-pre-workout-at-night-hurt-sleep">
                  Pre-workout and sleep
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/does-phone-in-bed-hurt-sleep">
                  Phone in bed and sleep
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/is-intermittent-fasting-better-than-calorie-restriction">
                  Intermittent fasting vs calories
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/will-intermittent-fasting-cause-muscle-loss">
                  Fasting and muscle loss
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/should-men-over-30-take-creatine">
                  Creatine after 30
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/does-creatine-work-without-lifting">
                  Creatine without lifting
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/does-creatine-help-brain-health-as-you-age">
                  Creatine and brain health
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/are-ultra-processed-foods-bad-for-fat-loss">
                  Ultra-processed foods and fat loss
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/is-hiit-better-than-steady-cardio-for-fat-loss">
                  HIIT vs steady cardio
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/questions/what-is-the-best-exercise-for-longevity">
                  Best exercise for longevity
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/studies/phone-in-bed-sleep-wearables">
                  Phone-in-bed sleep study
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/studies/protein-satiety-review">
                  Protein satiety study
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/studies/resistance-training-mortality-2026">
                  Lifting and longevity study
                </NavLink>
              </li>
              <li>
                <NavLink href="/science/studies/omega3-inflammation-recovery-meta-2026">
                  Omega-3 recovery review
                </NavLink>
              </li>
              <li>
                <NavLink href="/free/goal-tracker">
                  Goal weight forecast
                </NavLink>
              </li>
              <li>
                <NavLink href="/tools">Free tools &amp; calculators</NavLink>
              </li>
              <li>
                <NavLink href="/tools/tdee-calculator">TDEE calculator</NavLink>
              </li>
              <li>
                <NavLink href="/tools/macro-calculator">
                  Macro calculator
                </NavLink>
              </li>
              <li>
                <NavLink href="/tools/1rm-calculator">1RM calculator</NavLink>
              </li>
              <li>
                <NavLink href="/tools/body-fat-calculator">
                  Body fat calculator
                </NavLink>
              </li>
              <li>
                <NavLink href="/tools/calorie-deficit-calculator">
                  Calorie deficit calculator
                </NavLink>
              </li>
              <li>
                <NavLink href="/tools/body-recomposition-calculator">
                  Body recomposition calculator
                </NavLink>
              </li>
              <li>
                <NavLink href="/tools/perfect-day-builder">
                  Perfect day of eating builder
                </NavLink>
              </li>
              <li>
                <NavLink href="/tools/daily-habit-tracker">
                  Daily habit tracker
                </NavLink>
              </li>
              <li>
                <NavLink href="/tools/daily-protein-tracker">
                  Daily protein tracker
                </NavLink>
              </li>
              <li>
                <NavLink href="/tools/daily-hydration-tracker">
                  Daily hydration tracker
                </NavLink>
              </li>
              <li>
                <NavLink href="/tools/daily-readiness-tracker">
                  Daily readiness tracker
                </NavLink>
              </li>
              <li>
                <NavLink href="/tools/daily-step-tracker">
                  Daily step tracker
                </NavLink>
              </li>
              <li>
                <NavLink href="/tools/online-trainer-education-cost">
                  Online trainer education cost
                </NavLink>
              </li>
              <li>
                <NavLink href="/resources/protein-guide">Protein guide</NavLink>
              </li>
              <li>
                <NavLink href="/resources/busy-guy-training-plan">
                  Busy guy training plan
                </NavLink>
              </li>
              <li>
                <NavLink href="/resources/bad-week-adjustment-loop">
                  Bad week adjustment loop
                </NavLink>
              </li>
              <li>
                <NavLink href="/resources/diet-soda-cutting">
                  Diet soda cutting guide
                </NavLink>
              </li>
              <li>
                <NavLink href="/resources/online-fitness-coaching-fit-check">
                  Coaching fit check
                </NavLink>
              </li>
              <li>
                <NavLink href="/guides/body-recomposition-for-beginners">
                  Body recomposition for beginners
                </NavLink>
              </li>
              <li>
                <NavLink href="/guides/how-much-does-an-online-fitness-coach-cost">
                  Coaching cost guide
                </NavLink>
              </li>
              <li>
                <NavLink href="/guides/what-does-an-online-fitness-coach-do">
                  What an online coach does
                </NavLink>
              </li>
            </ul>
          </FooterGroup>
          <FooterGroup title={<span>Popular guides</span>}>
            <ul className="mt-3.5 space-y-2.5">
              <li>
                <NavLink href="/blog/body-recomposition-for-men">
                  Body recomposition for men
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/body-recomposition-for-women">
                  Body recomposition for women
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/body-recomposition-before-and-after-men">
                  Body recomposition before and after
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/body-recomposition-coach-denver">
                  Body recomposition coaching in Denver
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/fitness-coach-for-software-engineers">
                  Fitness coach for software engineers
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/fitness-plan-for-founders">
                  Fitness plan for founders
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/strength-training-for-women-beginners">
                  Strength training for women
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/how-to-fix-skinny-fat">
                  How to fix skinny fat
                </NavLink>
              </li>
              <li>
                <NavLink href="/for/skinny-fat-men">
                  Coaching for skinny-fat men
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/how-to-lose-the-dad-bod">
                  How to lose the dad bod
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/why-you-cant-stay-consistent-with-the-gym">
                  Staying consistent with the gym
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/how-to-lose-belly-fat-men-30s">
                  How to lose belly fat in your 30s
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/are-you-training-hard-enough">
                  Are you training hard enough?
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/how-much-protein-to-lose-fat">
                  How much protein to lose fat
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/how-to-build-muscle-for-skinny-guys">
                  Build muscle for skinny guys
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/gym-anxiety-for-men">Gym anxiety</NavLink>
              </li>
              <li>
                <NavLink href="/blog/beginner-strength-training-for-men">
                  Beginner strength training
                </NavLink>
              </li>
              <li>
                <NavLink href="/guides/getting-back-in-shape-after-a-long-break">
                  Getting back in shape after a break
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/how-long-to-see-results-working-out">
                  How long to see results
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/is-online-fitness-coaching-worth-it">
                  Is online coaching worth it?
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/online-fitness-coach-for-men-over-30">
                  Online coach for men over 30
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/online-fitness-coach-vs-personal-trainer">
                  Online coach vs personal trainer
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/calorie-deficit-without-counting-everything">
                  Calorie deficit without counting
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/standing-desk-vs-walking-pad">
                  Standing desk vs walking pad
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/how-to-stay-fit-working-from-home">
                  Stay fit working from home
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/weight-loss-for-men-who-hate-dieting">
                  Weight loss if you hate dieting
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/how-to-get-in-shape-with-a-60-hour-work-week">
                  Fitness with a 60-hour work week
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/online-fitness-coach-denver">
                  Online fitness coach in Denver
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/best-gym-routine-for-software-engineers">
                  Gym routine for software engineers
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/best-online-fitness-coaches-for-busy-men">
                  Best online fitness coaches for busy men
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog/diet-soda-and-fat-loss">
                  Diet soda and fat loss
                </NavLink>
              </li>
            </ul>
          </FooterGroup>
        </nav>

        {/* Row 3: social icons — safe per refined model: IG/TT/YT only */}
        <div className="py-6 flex items-center justify-center gap-3">
          <a
            href="https://instagram.com/gainsfromgeebs"
            className="sociallink"
            aria-label="Instagram"
            rel="me"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle
                cx="17.5"
                cy="6.5"
                r="0.9"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </a>
          <a
            href="https://tiktok.com/@gainsfromgeebs"
            className="sociallink"
            aria-label="TikTok"
            rel="me"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14 4v9.5a3.5 3.5 0 1 1-3.5-3.5" />
              <path d="M14 4c.4 2.2 2.3 3.9 4.6 4" />
            </svg>
          </a>
          <a
            href="https://youtube.com/@gainsfromgeebs"
            className="sociallink"
            aria-label="YouTube"
            rel="me"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2.5" y="5.5" width="19" height="13" rx="3" />
              <path
                d="M10.5 9.5 15 12l-4.5 2.5z"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </a>
        </div>

        {/* Row 4: contact + copyright */}
        <div className="pt-6 pb-10 md:pb-14 text-center text-[12.5px] text-mute2 tracking-[0.02em]">
          <a
            href="mailto:kris@titanforgefit.com"
            className="inline-flex min-h-11 items-center hover:text-bone transition-colors"
          >
            kris@titanforgefit.com
          </a>{" "}
          ·{" "}
          {/* /contact and /privacy 404'd and were in no sitemap before 2026-09-23.
              A trust page nothing links to is only marginally better than no page,
              so the footer is where they become reachable from every route. */}
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center hover:text-bone transition-colors"
          >
            Contact
          </Link>{" "}
          ·{" "}
          <Link
            href="/privacy"
            className="inline-flex min-h-11 items-center hover:text-bone transition-colors"
          >
            Privacy
          </Link>{" "}
          · © 2026{" "}
          {/* Client credit: Esteban Moreno Media documents this site as a
              client case study (website + short-form video). Inline in the
              legal row so it adds no block height. Plain followed link, not
              nofollow: it is a real client credit. */}
          <a
            href="https://estebanmorenomedia.com/case-studies/gains-from-geebs"
            className="-my-3 inline-flex min-h-11 items-center hover:text-bone transition-colors"
          >
            Site and reels by Esteban Moreno Media
          </a>
        </div>
      </div>
      {/* Spacer so sticky bar doesn't cover footer content on mobile */}
      <div className="h-20 md:h-0" />
    </footer>
  );
}
