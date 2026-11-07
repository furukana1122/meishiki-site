import { useEffect, useState } from "react";

// ── メニューの中身 ──────────────────────────────
// 項目を足したり、名前やリンク先を変えたいときは、ここだけ書き換えればOKです。
//   label: ボタンに出す文字
//   href:  リンク先
//   match: 今開いているページかどうかの判定(該当するとハイライトされます)
const ITEMS = [
  { label: "命式を出す", href: "/", match: (p) => p === "/" },
  { label: "タイプ診断", href: "/type-check", match: (p) => p.startsWith("/type-check") },
  { label: "セッション", href: "/session", match: (p) => p.startsWith("/session") },
];

// 何px スクロールしたらメニューが浮き上がるか
const SHOW_AFTER = 240;
// これ以下しかスクロールできない短いページでは、最初から表示します(px)
const SHORT_PAGE = 160;

export default function FloatingMenu() {
  const [visible, setVisible] = useState(false);
  const path = window.location.pathname;

  useEffect(() => {
    const update = () => {
      // どれだけスクロールできるページか(下の余白ぶんを含みます)
      const max = document.documentElement.scrollHeight - window.innerHeight;
      // ほとんどスクロールできない短いページでは、最初から表示します
      setVisible(max <= SHORT_PAGE || window.scrollY > SHOW_AFTER);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    // 命式の結果が出るなど、ページの高さが変わったときも判定し直す
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    if (ro) ro.observe(document.documentElement);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <nav className={`fm-wrap ${visible ? "fm-visible" : ""}`} aria-label="サイトメニュー">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500;700&display=swap');
        .fm-wrap {
          position: fixed; left: 0; right: 0; bottom: 0; z-index: 100;
          display: flex; justify-content: center; pointer-events: none;
          padding: 0 12px calc(env(safe-area-inset-bottom, 0px) + 14px);
          transform: translateY(140%); opacity: 0; visibility: hidden;
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease, visibility 0s linear 0.45s;
        }
        .fm-wrap.fm-visible {
          transform: translateY(0); opacity: 1; visibility: visible;
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease, visibility 0s;
        }
        .fm-bar {
          pointer-events: auto; display: flex; gap: 4px; padding: 6px; max-width: 100%;
          background: rgba(255, 255, 255, 0.94); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
          border: 1px solid rgba(160, 216, 230, 0.6); border-radius: 999px;
          box-shadow: 0 10px 30px rgba(45, 122, 152, 0.22);
        }
        .fm-link {
          display: block; text-decoration: none; text-align: center; white-space: nowrap;
          padding: 12px clamp(14px, 4.4vw, 26px); border-radius: 999px;
          font-family: 'Zen Maru Gothic', sans-serif; font-weight: 700;
          font-size: clamp(13px, 3.6vw, 15px); letter-spacing: 0.06em; color: #2d7a98;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .fm-link:hover { background: #e4f3f8; }
        .fm-link[aria-current="page"] { background: #2d7a98; color: #fff; }
        .fm-link:focus-visible { outline: 3px solid #01579b; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
          .fm-wrap, .fm-wrap.fm-visible { transition: none; }
        }
      `}</style>
      <div className="fm-bar">
        {ITEMS.map((it) => (
          <a
            key={it.label}
            className="fm-link"
            href={it.href}
            aria-current={it.match(path) ? "page" : undefined}
          >
            {it.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
