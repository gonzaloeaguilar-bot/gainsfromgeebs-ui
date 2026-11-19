/**
 * The 30-day intensive bridge.
 *
 * It lived inside the discovery cartel, and taking that cartel off the
 * homepage took this with it — a conversion path out of the page, removed as a
 * side effect of a layout change. homepage-density.spec asserts it is visible,
 * and that is what caught it.
 *
 * Its own component now, so the next thing that moves a section cannot remove
 * it by accident.
 */
export default function IntensiveInvite() {
  return (
    <aside className="explore-intensive-invite">
      <a
        href="https://titanforgefit.com/coaching-intensive?utm_source=gainsfromgeebs&utm_medium=referral&utm_campaign=geebs_titanforge_intensive_bridge&utm_content=homepage_discovery"
        data-analytics-event="titanforge_intensive_referral_click"
        data-analytics-link-kind="titanforge_intensive_referral"
        className="explore-intensive-invite__link"
      >
        <span className="explore-intensive-invite__message">
          <small>Prefer a shorter commitment?</small>
          <strong>Take the 30-day coaching intensive</strong>
          <span>
            A focused month of training, nutrition, and accountability built
            around your real schedule.
          </span>
        </span>
        <span className="explore-intensive-invite__action">
          See what is included
          <span aria-hidden="true">→</span>
        </span>
      </a>
    </aside>
  );
}
