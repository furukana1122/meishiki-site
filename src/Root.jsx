import App from "./App.jsx";
import TypePage from "./TypePage.jsx";
import TypeTopPage from "./TypeTopPage.jsx";

// URLに応じて表示するページを切り替えます
//   /type-check/○○ → 各干支の解説ページ
//   /type-check    → タイプ診断のトップページ
//   それ以外        → 命式鑑定サイト
export default function Root() {
  const path = window.location.pathname;

  const m = path.match(/^\/type-check\/([a-z]+)\/?$/);
  if (m) return <TypePage slug={m[1]} />;

  if (/^\/type-check\/?$/.test(path)) return <TypeTopPage />;

  return <App />;
}
