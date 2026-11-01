import { useEffect, useState } from "react";
import { TYPE_DATA, KAN_SLUG, KAN_COLOR, PALETTE } from "./typeData.js";

// 画像ファイルがまだ無い場合は、何も表示しない(ページは崩れません)
function SafeImg({ src, alt, style }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
}

// 相性リンクのアイコン。画像(public/type/icon-○○.png)が無ければ、漢字の丸チップを出します
function CompatIcon({ kan }) {
  const slug = KAN_SLUG[kan];
  const [failed, setFailed] = useState(false);
  if (!failed) {
    return (
      <img
        src={`/type/icon-${slug}.png`}
        alt={`${kan}タイプ`}
        className="compat-img"
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <span className="compat-chip" style={{ background: KAN_COLOR[kan] }} aria-label={`${kan}タイプ`}>
      {kan}
    </span>
  );
}

export default function TypePage({ slug }) {
  const d = TYPE_DATA[slug];
  const pal = PALETTE[d ? d.element : "土"];

  useEffect(() => {
    document.title = d
      ? `${d.kan}（${d.yomi}）${d.typeName}｜${d.catchcopy}`
      : "準備中";
    document.body.style.background = pal.bg; // スクロールの端でも背景色がそろうように
    window.scrollTo(0, 0);
  }, [d, pal]);

  return (
    <div
      className="tp-root"
      style={{
        "--bg": pal.bg, "--mark": pal.mark, "--shadow": pal.shadow,
        "--catch": pal.catch, "--heading": pal.heading, "--border": pal.border,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600&family=Zen+Maru+Gothic:wght@500;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .tp-root {
          min-height: 100vh; background: var(--bg); color: #333;
          font-family: 'Noto Serif JP','Hiragino Mincho ProN','Yu Mincho',serif;
          padding: clamp(32px, 8vw, 72px) 20px 64px;
        }
        .tp-wrap { max-width: 640px; margin: 0 auto; }

        /* 上部のバッジ */
        .tp-badge {
          display: flex; align-items: center; justify-content: center;
          gap: clamp(16px, 5vw, 36px);
          background: #fff; border: 1px solid var(--border); border-radius: 999px;
          padding: clamp(20px, 5vw, 34px) clamp(24px, 6vw, 52px);
          box-shadow: clamp(8px, 2vw, 14px) clamp(8px, 2vw, 14px) 0 var(--shadow);
          margin: 0 clamp(8px, 2vw, 14px) clamp(8px, 2vw, 14px) 0;
        }
        .tp-mark {
          position: relative; flex: none;
          width: clamp(84px, 22vw, 128px); height: clamp(72px, 19vw, 108px);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          color: #fff; border-radius: 58% 42% 55% 45% / 52% 48% 52% 48%;
          font-family: 'Zen Maru Gothic', sans-serif;
        }
        .tp-mark::after {
          content: ""; position: absolute; inset: -7px -6px -5px -8px;
          border: 3px solid #1d1d1d; border-radius: 50% 50% 46% 54% / 60% 45% 55% 40%;
          transform: rotate(-5deg); pointer-events: none;
        }
        .tp-yomi { font-size: clamp(10px, 2.6vw, 13px); font-weight: 700; letter-spacing: 0.1em; }
        .tp-kan { font-size: clamp(38px, 10vw, 58px); font-weight: 700; line-height: 1.1; }
        .tp-titles { font-family: 'Zen Maru Gothic', sans-serif; min-width: 0; }
        .tp-catch { color: var(--catch); font-weight: 700; font-size: clamp(14px, 3.6vw, 20px); margin-bottom: 4px; }
        .tp-type { font-weight: 900; font-size: clamp(26px, 7.4vw, 46px); line-height: 1.2; letter-spacing: 0.04em; }

        /* 本文 */
        .tp-h2 {
          font-family: 'Zen Maru Gothic', sans-serif; font-weight: 700; text-align: center;
          font-size: clamp(22px, 5.6vw, 30px); margin: clamp(48px, 10vw, 80px) 0 28px;
        }
        .tp-h3 {
          font-family: 'Zen Maru Gothic', sans-serif; font-weight: 700;
          font-size: clamp(20px, 5vw, 26px); margin: 56px 0 14px;
        }
        .tp-p { font-size: clamp(15px, 3.9vw, 17px); line-height: 2.05; letter-spacing: 0.04em; margin-bottom: 1.4em; text-align: left; }
        .tp-img-block { text-align: center; margin: 8px 0 32px; }
        .tp-img-block img { max-width: min(100%, 360px); height: auto; }

        /* ワンポイントアドバイス */
        .tp-advice {
          margin-top: 56px; background: #fff; border-radius: 20px; padding: 26px 28px;
          border: 1px solid var(--shadow);
        }
        .tp-advice-title { font-family: 'Zen Maru Gothic', sans-serif; font-weight: 700; font-size: 20px; margin-bottom: 14px; }
        .tp-advice ul { list-style: none; }
        .tp-advice li { position: relative; padding-left: 1.3em; line-height: 1.9; font-size: clamp(15px, 3.9vw, 17px); margin-bottom: 6px; }
        .tp-advice li::before { content: ""; position: absolute; left: 0; top: 0.8em; width: 7px; height: 7px; border-radius: 50%; background: var(--mark); }

        /* 相性 */
        .tp-compat { margin-top: 48px; }
        .tp-compat-title { font-family: 'Zen Maru Gothic', sans-serif; font-weight: 700; font-size: 20px; margin-bottom: 16px; }
        .tp-compat-row { display: flex; flex-wrap: wrap; gap: 14px; }
        .tp-compat-row a { display: block; text-decoration: none; border-radius: 50%; }
        .tp-compat-row a:focus-visible { outline: 3px solid #45b0d2; outline-offset: 3px; }
        .compat-img { display: block; width: clamp(64px, 18vw, 88px); height: auto; }
        .compat-chip {
          display: flex; align-items: center; justify-content: center;
          width: clamp(64px, 18vw, 88px); height: clamp(64px, 18vw, 88px); border-radius: 50%;
          color: #fff; font-family: 'Zen Maru Gothic', sans-serif; font-weight: 700; font-size: clamp(26px, 7vw, 36px);
        }

        /* 戻るリンク */
        .tp-back { margin-top: 64px; text-align: center; }
        .tp-back a {
          display: inline-block; text-decoration: none; color: #2d7a98;
          border: 1.5px solid #a8c8d8; border-radius: 40px; padding: 12px 28px;
          font-family: 'Zen Maru Gothic', sans-serif; font-weight: 700; font-size: 14px; letter-spacing: 0.1em;
        }
        .tp-back a:focus-visible { outline: 3px solid #45b0d2; outline-offset: 3px; }
        .tp-footer { text-align: center; margin-top: 40px; font-size: 11px; color: #b0a090; letter-spacing: 0.1em; }
      `}</style>

      <div className="tp-wrap">
        {!d ? (
          <>
            <h1 className="tp-h2">このページは準備中です</h1>
            <div className="tp-back"><a href="/">命式鑑定にもどる</a></div>
          </>
        ) : (
          <div>
            {/* 上部バッジ */}
            <div className="tp-badge">
              <div className="tp-mark" style={{ background: "var(--mark)" }}>
                <span className="tp-yomi">{d.yomi}</span>
                <span className="tp-kan">{d.kan}</span>
              </div>
              <div className="tp-titles">
                <div className="tp-catch">{d.catchcopy}</div>
                <h1 className="tp-type">{d.typeName}</h1>
              </div>
            </div>

            {/* 導入 */}
            <h2 className="tp-h2">{d.title}</h2>
            <div className="tp-img-block">
              <SafeImg src={d.topImage} alt={`${d.kan}タイプのイラスト`} />
            </div>
            {d.intro.map((t, i) => <p className="tp-p" key={i}>{t}</p>)}

            {/* 各セクション */}
            {d.sections.map((s, i) => (
              <section key={i}>
                <h3 className="tp-h3" style={{ color: "var(--heading)" }}>{s.heading}</h3>
                {s.paragraphs.map((t, j) => <p className="tp-p" key={j}>{t}</p>)}
                {s.image && (
                  <div className="tp-img-block">
                    <SafeImg src={s.image} alt="" />
                  </div>
                )}
              </section>
            ))}

            {/* ワンポイントアドバイス */}
            <div className="tp-advice">
              <div className="tp-advice-title">{d.adviceTitle}</div>
              <ul>{d.advice.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </div>

            {/* 相性GOODなタイプ */}
            <div className="tp-compat">
              <div className="tp-compat-title">{d.compatTitle}</div>
              <div className="tp-compat-row">
                {d.compat.map((k) => (
                  <a key={k} href={`/type-check/${KAN_SLUG[k]}`}>
                    <CompatIcon kan={k} />
                  </a>
                ))}
              </div>
            </div>

            <div className="tp-back"><a href="/">命式鑑定にもどる</a></div>
          </div>
        )}
        <div className="tp-footer">© FURUKANA Garden</div>
      </div>
    </div>
  );
}
