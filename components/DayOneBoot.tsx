/**
 * Decides the Day One moment before the browser paints anything.
 *
 * Ported from the FLAS tag drop (see the reading-path playbook). It is a raw
 * inline script rather than a React effect for one reason: React runs after
 * hydration, by which time the page has already painted — which is what makes a
 * loader flash the site into view and only then cover it.
 *
 * The script owns the decision (reduced motion, once per session, not on the
 * application form) and marks <html data-dayone="on">. Global CSS turns that
 * into a full-bleed veil in the first frame. The failsafe timer is what makes it
 * safe to cover the page at all: if the bundle never loads or hydration throws,
 * the attribute comes off anyway and the reader gets the page.
 */
/* WHERE IT MAY RUN — an allowlist, not a blocklist.
   It used to exclude /apply and run everywhere else, which meant it ran on the
   articles. Those are the biggest pages on the site by impressions: 47,066 on
   one study page, 34,381 on the cost guide, 28,078 on the skinny-fat post. A
   reader arriving from Google to read about skinny-fat gets no brand equity
   from a black card with a logo on it and pays the full delay for it.

   The brand moment belongs where somebody is choosing, not where they are
   reading: the homepage, the two entry points, and the money pages. Everything
   else is a read, and a read should start immediately.

   An allowlist because the failure mode of a blocklist is silent: every new
   route added to the site opts IN by default, and nobody notices until a
   splash screen is sitting on top of a page it was never meant to cover. */
/* NOT /start: it is a 308 to /apply?utm_source=instagram, a route.ts and not a
   page, so the moment would fire on a redirect and then be gone. Verified with
   curl rather than assumed from the nav. */
const ALLOWED_PATHS = ["/", "/packages", "/geebs-method", "/results"];

const BOOT = `(function(){try{
var ALLOWED=function(p){
  var list=${JSON.stringify(ALLOWED_PATHS)};
  for(var i=0;i<list.length;i++){ if(p===list[i]||p===list[i]+"/") return true; }
  return false;
};
var r=document.documentElement;
var p=window.location.pathname;
if(!ALLOWED(p))return;
if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
var f=new URLSearchParams(window.location.search).get("intro")==="1";
try{if(!f&&sessionStorage.getItem("geebs_day_one_seen"))return;sessionStorage.setItem("geebs_day_one_seen","1")}catch(e){return}
r.setAttribute("data-dayone","on");
setTimeout(function(){r.removeAttribute("data-dayone")},3000);
}catch(e){}})();`;

export default function DayOneBoot() {
  return <script dangerouslySetInnerHTML={{ __html: BOOT }} />;
}
