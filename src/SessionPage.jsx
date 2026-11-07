import { useEffect, useState } from "react";
import d from "./sessionData.js";

// 猫の画像と吹き出し。画像がまだ無いときは、何も表示しません(ページは崩れません)
function Cat({ src, say, alt = "" }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <figure className="ss-cat">
      {say ? <div className="ss-say">{say}</div> : null}
      <img src={src} alt={alt} onError={() => setFailed(true)} />
    </figure>
  );
}

// プロフィールの丸い写真。画像がまだ無いときは、写真の部分だけ何も出しません
function ProfilePhoto({ src, alt }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return <img className="ss-profile-photo" src={src} alt={alt} onError={() => setFailed(true)} />;
}

// 「covers」の丸い札の色(五行の配色と同じ色)
const CHIP_COLORS = ["#9edc7c", "#fa9a98", "#f6d65e", "#a0d2e6"];

export default function SessionPage() {
  useEffect(() => {
    document.title = `${d.name}｜FURUKANA Garden`;
    document.body.style.background = "#fff";
    // index.css で #root の幅が制限されているため、このページだけ制限を外す(色付きの帯を画面幅いっぱいにするため)
    const rootEl = document.getElementById("root");
    if (rootEl) {
      rootEl.style.width = "100%";
      rootEl.style.maxWidth = "none";
    }
    window.scrollTo(0, 0);
  }, []);

  const applyButton = d.menu.applyUrl ? (
    <a className="ss-btn" href={d.menu.applyUrl}>お申し込みはこちら</a>
  ) : (
    <span className="ss-btn ss-btn-off">受付準備中</span>
  );

  return (
    <div className="ss-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600&family=Zen+Maru+Gothic:wght@500;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .ss-root {
          min-height: 100vh; background: #fff; color: #323232; text-align: left; line-height: 1.7;
          font-family: 'Noto Serif JP','Hiragino Mincho ProN','Yu Mincho',serif;
        }
        .ss-root h1, .ss-root h2 { margin: 0; color: inherit; font-family: 'Zen Maru Gothic', sans-serif; }
        .ss-wrap { max-width: 760px; margin: 0 auto; padding: 0 20px; }
        .ss-p { font-size: clamp(15px, 3.9vw, 17px); line-height: 2.1; letter-spacing: 0.04em; white-space: pre-line; }

        /* 猫と吹き出し */
        .ss-cat { text-align: center; }
        .ss-cat img { width: min(100%, 260px); height: auto; }
        .ss-say {
          position: relative; display: inline-block; max-width: 100%; margin-bottom: 18px;
          background: #fff; border: 3px solid #323232; border-radius: 22px; padding: 9px 20px;
          font-family: 'Zen Maru Gothic', sans-serif; font-weight: 700; font-size: clamp(14px, 3.8vw, 16px);
          letter-spacing: 0.06em; line-height: 1.5; transform: rotate(-2deg);
        }
        .ss-say::after {
          content: ""; position: absolute; left: 50%; bottom: -11px; width: 16px; height: 16px;
          background: #fff; border-right: 3px solid #323232; border-bottom: 3px solid #323232;
          transform: translateX(-50%) rotate(45deg);
        }

        /* ページ上部 */
        .ss-hero { padding-top: clamp(40px, 8vw, 80px); text-align: center; }
        .ss-label { font-family: 'Zen Maru Gothic', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 0.3em; color: #45b0d2; margin-bottom: 8px; }
        .ss-root .ss-title { font-weight: 900; font-size: clamp(30px, 8.4vw, 48px); letter-spacing: 0.06em; line-height: 1.3; margin-bottom: 36px; }
        .ss-intro { margin-top: clamp(32px, 7vw, 56px); }

        /* 占いではない、のエリア */
        .ss-nopredict {
          margin-top: clamp(48px, 10vw, 80px); background: #fffbe0; border: 3px dashed #e8d44d;
          border-radius: 28px; padding: clamp(28px, 6vw, 44px) clamp(20px, 5vw, 40px); text-align: center;
        }
        .ss-nopredict .ss-cat { margin-bottom: 22px; }
        .ss-root .ss-h2 { font-weight: 700; font-size: clamp(20px, 5.4vw, 28px); letter-spacing: 0.05em; line-height: 1.5; margin-bottom: 16px; }
        .ss-nopredict .ss-p { text-align: left; }

        /* こんな方におすすめです */
        .ss-forwho { margin-top: clamp(48px, 10vw, 80px); }
        .ss-forwho .ss-h2 { text-align: center; }
        .ss-checks { list-style: none; display: grid; gap: 12px; margin-top: 20px; }
        .ss-check {
          display: flex; gap: 14px; align-items: flex-start; padding: 16px 20px; background: #f3fafc;
          border: 2px solid #a1d8e6; border-radius: 20px; font-size: clamp(15px, 3.9vw, 17px); line-height: 1.8; letter-spacing: 0.03em;
        }
        .ss-check::before {
          content: ""; flex: none; width: 24px; height: 24px; margin-top: 3px; border-radius: 58% 42% 55% 45% / 52% 48% 52% 48%;
          background: #a0d2e6 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M6 12.5l4 4 8-9' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / 100% no-repeat;
        }

        /* セッションでお話しすること */
        .ss-covers { margin-top: clamp(48px, 10vw, 80px); text-align: center; }
        .ss-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 20px; }
        .ss-chip {
          padding: 12px 24px; border: 3px solid #323232; border-radius: 999px;
          font-family: 'Zen Maru Gothic', sans-serif; font-weight: 700; font-size: clamp(15px, 4vw, 18px); letter-spacing: 0.06em;
        }

        /* メニュー(水色の帯) */
        .ss-menu { margin-top: clamp(56px, 11vw, 96px); background: #d3ebf2; padding: clamp(44px, 9vw, 72px) 20px clamp(48px, 10vw, 80px); }
        .ss-root .ss-menu-title { text-align: center; font-weight: 700; font-size: clamp(22px, 5.6vw, 30px); letter-spacing: 0.1em; margin-bottom: 24px; }
        .ss-card {
          max-width: 560px; margin: 0 auto; background: #fff; border-radius: 32px;
          padding: clamp(28px, 6vw, 40px) clamp(20px, 5vw, 36px); text-align: center;
        }
        .ss-profile {
          max-width: 560px; margin: 0 auto clamp(40px, 8vw, 56px); background: #fff; border-radius: 32px;
          padding: clamp(26px, 6vw, 40px) clamp(22px, 5vw, 36px); display: flex; align-items: center; gap: 24px;
        }
        .ss-profile-body { flex: 1; min-width: 0; }
        .ss-profile-label { font-family: 'Zen Maru Gothic', sans-serif; font-weight: 700; font-size: 14px; letter-spacing: 0.2em; color: #45b0d2; }
        .ss-profile-name { font-family: 'Zen Maru Gothic', sans-serif; font-weight: 900; font-size: clamp(30px, 8vw, 40px); letter-spacing: 0.08em; line-height: 1.2; margin: 2px 0 12px; }
        .ss-profile-text { font-size: clamp(14px, 3.7vw, 15.5px); line-height: 2; letter-spacing: 0.03em; }
        .ss-profile-photo { flex: none; width: clamp(110px, 26vw, 150px); aspect-ratio: 1; border-radius: 50%; object-fit: cover; border: 5px solid #a1d8e6; background: #a1d8e6; }
        @media (max-width: 560px) { .ss-profile { flex-direction: column-reverse; } }
        .ss-card-name { font-family: 'Zen Maru Gothic', sans-serif; font-weight: 900; font-size: clamp(22px, 6vw, 30px); letter-spacing: 0.06em; margin-bottom: 20px; }
        .ss-dl { text-align: left; border-top: 2px dotted #a1d8e6; }
        .ss-row { display: flex; align-items: baseline; gap: 14px; padding: 14px 4px; border-bottom: 2px dotted #a1d8e6; }
        .ss-dt { flex: none; width: 4.6em; font-family: 'Zen Maru Gothic', sans-serif; font-weight: 700; font-size: 14px; color: #45b0d2; letter-spacing: 0.08em; }
        .ss-dd { font-size: clamp(16px, 4.2vw, 19px); font-weight: 600; letter-spacing: 0.04em; }
        .ss-contents { text-align: left; margin-top: 24px; padding: 18px 20px; background: #f3fafc; border-radius: 20px; }
        .ss-contents-title { font-family: 'Zen Maru Gothic', sans-serif; font-weight: 700; font-size: 15px; color: #45b0d2; letter-spacing: 0.08em; margin-bottom: 8px; }
        .ss-contents ul { list-style: none; }
        .ss-contents li { position: relative; padding-left: 1.3em; font-size: clamp(14px, 3.8vw, 16px); line-height: 1.8; margin-bottom: 4px; }
        .ss-contents li::before { content: ""; position: absolute; left: 0; top: 0.8em; width: 7px; height: 7px; border-radius: 50%; background: #a0d2e6; }
        .ss-sub { display: block; font-size: 13px; font-weight: 400; color: #6a6a6a; margin-top: 2px; }
        .ss-btn-wrap { text-align: center; margin-top: 28px; }
        .ss-btn {
          display: inline-block; width: min(100%, 360px); padding: 16px 24px; text-align: center; text-decoration: none;
          background: #ffe50f; color: #323232; border: 3px solid #323232; border-radius: 999px; box-shadow: 4px 4px 0 #323232;
          font-family: 'Zen Maru Gothic', sans-serif; font-weight: 900; font-size: clamp(16px, 4.4vw, 19px); letter-spacing: 0.1em;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        a.ss-btn:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0 #323232; }
        .ss-btn:focus-visible { outline: 3px solid #01579b; outline-offset: 4px; }
        .ss-btn-off { background: #eef3f5; color: #8a99a3; border: 3px dashed #b9c7cf; box-shadow: none; }

        /* 流れ */
        .ss-flow { margin-top: clamp(56px, 11vw, 96px); }
        .ss-root .ss-flow-title { text-align: center; font-weight: 700; font-size: clamp(22px, 5.6vw, 30px); letter-spacing: 0.1em; padding-bottom: 16px; border-bottom: 7px solid #01579b; margin-bottom: 28px; }
        .ss-steps { list-style: none; display: grid; gap: 16px; }
        .ss-step { display: flex; gap: 16px; align-items: flex-start; padding: 18px 20px; border: 2px solid #323232; border-radius: 22px; background: #fff; }
        .ss-num {
          flex: none; width: 46px; height: 46px; border-radius: 58% 42% 55% 45% / 52% 48% 52% 48%; background: #a0d2e6; color: #fff;
          display: flex; align-items: center; justify-content: center; font-family: 'Zen Maru Gothic', sans-serif; font-weight: 900; font-size: 22px;
        }
        .ss-step-title { font-family: 'Zen Maru Gothic', sans-serif; font-weight: 700; font-size: clamp(16px, 4.2vw, 18px); letter-spacing: 0.04em; margin-bottom: 2px; }
        .ss-step-text { font-size: clamp(14px, 3.7vw, 16px); line-height: 1.9; }

        /* 注意事項 */
        .ss-notes { margin-top: clamp(48px, 10vw, 80px); padding: clamp(22px, 5vw, 32px); border: 2px dashed #b9c7cf; border-radius: 24px; background: #fafcfd; }
        .ss-notes-title { font-family: 'Zen Maru Gothic', sans-serif; font-weight: 700; font-size: 17px; letter-spacing: 0.08em; margin-bottom: 10px; }
        .ss-notes ul { list-style: none; }
        .ss-notes li { position: relative; padding-left: 1.2em; font-size: clamp(13px, 3.5vw, 15px); line-height: 1.9; margin-bottom: 6px; color: #4a4a4a; }
        .ss-notes li::before { content: "※"; position: absolute; left: 0; }

        /* 最後 */
        .ss-closing { margin-top: clamp(56px, 11vw, 96px); text-align: center; padding-bottom: 24px; }
        .ss-closing .ss-btn-wrap { margin-top: 12px; }
        .ss-footer { text-align: center; padding: 28px 20px 40px; font-size: 11px; color: #b0a090; letter-spacing: 0.1em; }
      `}</style>

      {/* ページ上部 */}
      <header className="ss-wrap ss-hero">
        <div className="ss-label">{d.label}</div>
        <h1 className="ss-title">{d.name}</h1>
        <Cat src={d.heroImage} say={d.heroSay} alt="" />
        <p className="ss-p ss-intro">{d.intro}</p>
      </header>

      <main>
        {/* 占いではない、のエリア */}
        <div className="ss-wrap">
          <section className="ss-nopredict">
            <Cat src={d.noPredict.image} say={d.noPredict.say} alt="" />
            <h2 className="ss-h2">{d.noPredict.title}</h2>
            <p className="ss-p">{d.noPredict.text}</p>
          </section>
        </div>

        {/* こんな方におすすめです */}
        <section className="ss-wrap ss-forwho">
          <h2 className="ss-h2">{d.forWho.title}</h2>
          <ul className="ss-checks">
            {d.forWho.items.map((t) => <li className="ss-check" key={t}>{t}</li>)}
          </ul>
        </section>

        {/* セッションでお話しすること */}
        <section className="ss-wrap ss-covers">
          <h2 className="ss-h2">{d.covers.title}</h2>
          <div className="ss-chips">
            {d.covers.items.map((t, i) => (
              <span className="ss-chip" key={t} style={{ background: CHIP_COLORS[i % CHIP_COLORS.length] }}>{t}</span>
            ))}
          </div>
        </section>

        {/* メニュー */}
        <section className="ss-menu">
          <div className="ss-profile">
            <div className="ss-profile-body">
              <div className="ss-profile-label">{d.profile.label}</div>
              <div className="ss-profile-name">{d.profile.name}</div>
              {d.profile.lines.map((t) => <p className="ss-profile-text" key={t}>{t}</p>)}
            </div>
            <ProfilePhoto src={d.profile.image} alt={d.profile.name} />
          </div>
          <h2 className="ss-menu-title">{d.menu.title}</h2>
          <div className="ss-card">
            <div className="ss-card-name">{d.menu.name}</div>
            <dl className="ss-dl">
              <div className="ss-row"><dt className="ss-dt">時間</dt><dd className="ss-dd">{d.menu.time}</dd></div>
              <div className="ss-row"><dt className="ss-dt">料金</dt><dd className="ss-dd">{d.menu.price}</dd></div>
              <div className="ss-row"><dt className="ss-dt">実施</dt><dd className="ss-dd">{d.menu.place}</dd></div>
              <div className="ss-row">
                <dt className="ss-dt">受付</dt>
                <dd className="ss-dd">
                  {d.menu.schedule}
                  <span className="ss-sub">{d.menu.scheduleNote}</span>
                </dd>
              </div>
            </dl>
            <div className="ss-contents">
              <div className="ss-contents-title">{d.menu.contentsTitle}</div>
              <ul>{d.menu.contents.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
            <div className="ss-btn-wrap">{applyButton}</div>
          </div>
        </section>

        {/* お申し込みの流れ */}
        <section className="ss-wrap ss-flow">
          <h2 className="ss-flow-title">{d.flow.title}</h2>
          <ol className="ss-steps">
            {d.flow.steps.map((s, i) => (
              <li className="ss-step" key={i}>
                <span className="ss-num">{i + 1}</span>
                <div>
                  <div className="ss-step-title">{s.title}</div>
                  <p className="ss-step-text">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* 注意事項 */}
        <div className="ss-wrap">
          <section className="ss-notes">
            <div className="ss-notes-title">{d.notes.title}</div>
            <ul>{d.notes.items.map((t) => <li key={t}>{t}</li>)}</ul>
          </section>
        </div>

        {/* 最後の一言 */}
        <section className="ss-wrap ss-closing">
          <Cat src={d.closing.image} say={d.closing.say} alt="" />
          <div className="ss-btn-wrap">{applyButton}</div>
        </section>
      </main>

      <div className="ss-footer">© FURUKANA Garden</div>
    </div>
  );
}
