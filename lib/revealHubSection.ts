/** Bring a chosen hub section below the measured sticky navigation. */
export function revealHubSection(target: HTMLElement, focusTarget: HTMLElement = target) {
  const header = document.querySelector<HTMLElement>("body > header");
  const ribbon = document.querySelector<HTMLElement>(".recomp-ribbon");
  const headerHeight = header?.getBoundingClientRect().height ?? 0;
  let inset = headerHeight;

  // The recomp ribbon steps aside on the way down (past 120px) and comes back
  // on the way up, so what matters is where it will be when the scroll ENDS,
  // not whether it is showing at the click. Measured at the click, a ribbon
  // that was about to collapse added 44px of margin the page then did not need,
  // and the first link of a long list could land partly below the fold.
  if (ribbon && getComputedStyle(ribbon).position === "sticky") {
    const destination =
      target.getBoundingClientRect().top + window.scrollY - (headerHeight + 16);
    const goingDown = destination > window.scrollY;
    const expandedNow = ribbon.dataset.collapsed !== "true";
    const showsAtRest = goingDown ? expandedNow && destination <= 120 : true;
    if (showsAtRest) inset += ribbon.getBoundingClientRect().height;
  }

  target.style.scrollMarginTop = `${inset + 16}px`;
  focusTarget.focus({ preventScroll: true });
  target.scrollIntoView({
    block: "start",
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
  });
}
