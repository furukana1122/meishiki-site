import App from "./App.jsx";
import TypePage from "./TypePage.jsx";
import TypeTopPage from "./TypeTopPage.jsx";
import SessionPage from "./SessionPage.jsx";
import FloatingMenu from "./FloatingMenu.jsx";

// URLに応じて表示するページを切り替えます
//   /type-check/○○ → 各干支の解説ページ
//   /type-check    → タイプ診断のトップページ
//   /session       → セッション受付ページ
//   それ以外        → 命式鑑定サイト
export default function Root() {
  const path = window.location.pathname;

  let page;
  const m = path.match(/^\/type-check\/([a-z]+)\/?$/);
  if (m) page = <TypePage slug={m[1]} />;
  else if (/^\/type-check\/?$/.test(path)) page = <TypeTopPage />;
  else if (/^\/session\/?$/.test(path)) page = <SessionPage />;
  else page = <App />;

  return (
    <>
      {page}
      {/* メニューの下に、ページ最下部の文字が隠れないよう余白を足す */}
      <div style={{ height: 88 }} aria-hidden="true" />
      <FloatingMenu />
    </>
  );
}
