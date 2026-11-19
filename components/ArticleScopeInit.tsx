/**
 * Applies the stored text size to .article-scope before first paint.
 *
 * The control itself reads localStorage through useSyncExternalStore, but that
 * runs after hydration. Without this, a reader who chose Larger would get a
 * flash of normal-size text on every article. Same pattern a theme switcher
 * uses, and it is inert when nothing is stored.
 */
export default function ArticleScopeInit() {
  const script = `(function(){try{var v=localStorage.getItem("geebs_text_size");if(v!=="large"&&v!=="larger")return;var n=document.querySelectorAll(".article-scope");for(var i=0;i<n.length;i++)n[i].setAttribute("data-text-size",v);}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
