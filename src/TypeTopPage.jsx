import { useEffect, useState } from "react";
import top from "./typeTop.js";
import { KAN_SLUG, KAN_ELEMENT, PALETTE } from "./typeData.js";

// 画像ファイルがまだ無い場合は、何も表示しない(ページは崩れません)
function SafeImg({ src, alt, className }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
}

// 10干支の、丸いボタンの並び順と読み
const KAN_LIST = [
  ["甲", "きのえ"], ["乙", "きのと"],
  ["丙", "ひのえ"], ["丁", "ひのと"],
  ["戊", "つちのえ"], ["己", "つちのと"],
  ["庚", "かのえ"], ["辛", "かのと"],
  ["壬", "みずのえ"], ["癸", "みずのと"],
];

function Arrow() {
  return (
    <div className="tt-arrow" aria-hidden="true">
      <svg viewBox="0 0 100 100" width="96" height="96">
        <path d="M50 12 V82 M20 56 L50 86 L80 56" fill="none" stroke="#ffe50f"
          strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Block({ b }) {
  switch (b.type) {
    case "text":
      return <p className="tt-p">{b.text}</p>;
    case "caption":
      return <p className="tt-caption">{b.text}</p>;
    case "button":
      return (
        <div className="tt-btn-wrap">
          <a className="tt-btn" href={b.href}>{b.label}</a>
        </div>
      );
    case "image":
      return (
        <div className="tt-img">
          <SafeImg src={b.src} alt={b.alt || ""} />
        </div>
      );
    case "arrow":
      return <Arrow />;
    default:
      return null;
  }
}

export default function TypeTopPage() {
  useEffect(() => {
    document.title = "四柱推命タイプ診断｜FURUKANA Garden";
    document.body.style.background = "#fff";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="tt-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600&family=Zen+Maru+Gothic:wght@500;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .tt-root {
          min-height: 100vh; background: #fff; color: #323232; text-align: left;
          overflow-x: hidden; overflow-x: clip; /* 画面幅いっぱいの水色が、横スクロールを出さないように */
          font-family: 'Noto Serif JP','Hiragino Mincho ProN','Yu Mincho',serif;
        }
        .tt-wrap { max-width: 880px; margin: 0 auto; padding: clamp(32px, 7vw, 72px) 20px 0; }
        .tt-inner { padding: 0 clamp(0px, 4vw, 40px); }

        .tt-logo { text-align: center; margin-bottom: clamp(32px, 6vw, 56px); }
        .tt-logo img { width: min(100%, 520px); height: auto; }

        .tt-p {
          font-size: clamp(15px, 3.9vw, 17px); line-height: 2.1; letter-spacing: 0.04em;
          white-space: pre-line; margin-bottom: 1.6em; text-align: left;
        }
        .tt-caption {
          font-size: clamp(14px, 3.6vw, 16px); line-height: 1.9; letter-spacing: 0.04em;
          text-align: center; margin: 4px 0 28px;
        }

        .tt-step { margin-top: clamp(56px, 11vw, 104px); }
        .tt-h2 {
          font-family: 'Zen Maru Gothic', sans-serif; font-weight: 700; text-align: center;
          font-size: clamp(24px, 6.4vw, 36px); letter-spacing: 0.06em;
          padding-bottom: 18px; border-bottom: 7px solid #01579b; margin-bottom: clamp(28px, 6vw, 44px);
        }

        .tt-btn-wrap { text-align: center; margin: 8px 0 36px; }
        .tt-btn {
          display: inline-block; width: min(100%, 520px); padding: 18px 24px;
          background: #a1d8e6; color: #fff; text-decoration: none; border-radius: 999px;
          font-family: 'Zen Maru Gothic', sans-serif; font-weight: 700; font-size: clamp(16px, 4.2vw, 20px);
          letter-spacing: 0.08em; text-align: center; transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .tt-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(80,150,170,0.35); }
        .tt-btn:focus-visible { outline: 3px solid #01579b; outline-offset: 3px; }

        .tt-img { text-align: center; margin: 8px 0 32px; }
        .tt-img img { max-width: 100%; height: auto; }
        .tt-arrow { text-align: center; margin: 4px 0 28px; }

        /* 一番下の水色のエリア */
        .tt-picker {
          margin-top: clamp(64px, 12vw, 112px); background: #d3ebf2;
          width: 100vw; margin-left: calc(50% - 50vw); /* 親の幅に関係なく、画面の横幅いっぱいに広げる */
          padding: clamp(48px, 9vw, 80px) 20px clamp(56px, 10vw, 96px); text-align: center;
        }
        .tt-picker-title {
          font-family: 'Zen Maru Gothic', sans-serif; font-weight: 700;
          font-size: clamp(22px, 5.6vw, 32px); letter-spacing: 0.06em; margin-bottom: 20px;
        }
        .tt-picker-img img { width: min(100%, 420px); height: auto; }
        .tt-picker-note {
          font-family: 'Zen Maru Gothic', sans-serif; font-weight: 700; color: #fff;
          text-shadow: 0 1px 3px rgba(0, 70, 100, 0.35);
          font-size: clamp(14px, 3.6vw, 17px); letter-spacing: 0.06em; margin: 20px 0 24px;
        }
        .tt-card {
          max-width: 520px; margin: 0 auto; background: #fff; border-radius: clamp(32px, 8vw, 52px);
          padding: clamp(32px, 7vw, 56px) 20px;
          display: grid; grid-template-columns: 1fr 1fr; gap: clamp(22px, 5vw, 34px) 12px; justify-items: center;
        }
        .tt-oval-link { display: block; text-decoration: none; border-radius: 50%; padding: 8px; }
        .tt-oval-link:focus-visible { outline: 3px solid #01579b; outline-offset: 2px; }
        .tt-oval-link:hover .tt-oval { transform: scale(1.06); }
        .tt-oval {
          position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center;
          width: clamp(104px, 28vw, 150px); height: clamp(60px, 16vw, 84px);
          border-radius: 58% 42% 55% 45% / 52% 48% 52% 48%; color: #fff;
          font-family: 'Zen Maru Gothic', sans-serif; transition: transform 0.2s ease;
        }
        .tt-oval::after {
          content: ""; position: absolute; inset: -6px -5px -4px -7px; border: 3px solid #1d1d1d;
          border-radius: 50% 50% 46% 54% / 60% 45% 55% 40%; transform: rotate(-4deg); pointer-events: none;
        }
        .tt-oval-yomi { font-size: clamp(9px, 2.3vw, 11px); font-weight: 700; letter-spacing: 0.08em; line-height: 1; }
        .tt-oval-kan { font-size: clamp(28px, 7.6vw, 42px); font-weight: 700; line-height: 1.1; }

        .tt-footer { text-align: center; padding: 28px 20px 40px; font-size: 11px; color: #b0a090; letter-spacing: 0.1em; }
      `}</style>

      <div className="tt-wrap">
        <div className="tt-logo">
          <SafeImg src={top.logo} alt={top.logoAlt} />
        </div>

        <div className="tt-inner">
          {top.intro.map((t, i) => <p className="tt-p" key={i}>{t}</p>)}

          {top.steps.map((s, i) => (
            <section className="tt-step" key={i}>
              <h2 className="tt-h2">{s.label}：{s.title}</h2>
              {s.blocks.map((b, j) => <Block b={b} key={j} />)}
            </section>
          ))}
        </div>
      </div>

      {/* 10干支を選ぶエリア */}
      <section className="tt-picker">
        <h2 className="tt-picker-title">{top.pickerTitle}</h2>
        <div className="tt-picker-img">
          <SafeImg src={top.pickerImage} alt={top.pickerImageAlt} />
        </div>
        <p className="tt-picker-note">{top.pickerNote}</p>

        <div className="tt-card">
          {KAN_LIST.map(([kan, yomi]) => (
            <a className="tt-oval-link" key={kan} href={`/type-check/${KAN_SLUG[kan]}`} aria-label={`${kan}（${yomi}）の解説を読む`}>
              <span className="tt-oval" style={{ background: PALETTE[KAN_ELEMENT[kan]].mark }}>
                <span className="tt-oval-yomi">{yomi}</span>
                <span className="tt-oval-kan">{kan}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <div className="tt-footer">© FURUKANA Garden</div>
    </div>
  );
}
