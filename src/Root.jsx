import App from "./App.jsx";
import TypePage from "./TypePage.jsx";

// URLが /type-check/○○ のときは解説ページ、それ以外は今までの命式サイトを表示します
export default function Root() {
  const m = window.location.pathname.match(/^\/type-check\/([a-z]+)\/?$/);
  if (m) return <TypePage slug={m[1]} />;
  return <App />;
}
