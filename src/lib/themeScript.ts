// Runs synchronously in <head>, before React hydrates, so the correct
// theme class is on <html> before the first paint (no flash of the
// wrong theme). Kept as a plain string since it must run as a raw
// inline <script>, not as part of the React component tree.
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  } catch (e) {}
})();
`;
