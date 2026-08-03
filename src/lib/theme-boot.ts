/**
 * No-flash theme boot. Inline this in <head> before first paint:
 *
 *   Next.js:  <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
 *   Vite:     <script>...paste themeBootScript output...</script>
 *
 * Reads the persisted theme + mode (system fallback) and stamps the
 * classes on <html> synchronously. Keys match src/lib/theme.ts.
 */
export const themeBootScript = `(function () {
  try {
    var d = document.documentElement;
    var theme = localStorage.getItem("pb-ui.theme");
    if (theme && theme !== "ocean") d.classList.add("theme-" + theme);
    var mode = localStorage.getItem("pb-ui.mode") || "system";
    var dark = mode === "dark" || (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (dark) d.classList.add("dark");
  } catch (e) {}
})();`
