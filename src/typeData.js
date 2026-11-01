// 日干タイプ解説のデータ
// ここには、全干支で共通の設定だけを置きます。
// 各干支の文章は src/types/ フォルダの中に、1人1ファイル(kinoe.js など)で置きます。
// 画像は public/type/ フォルダに置きます。

// 漢字 ⇔ URLの末尾(slug)の対応。命式サイトの「さらに詳しく」リンクと同じ並びです。
export const KAN_SLUG = {
  "甲": "kinoe",
  "乙": "kinoto",
  "丙": "hinoe",
  "丁": "hinoto",
  "戊": "tsuchinoe",
  "己": "tsuchinoto",
  "庚": "kanoe",
  "辛": "kanoto",
  "壬": "mizunoe",
  "癸": "mizunoto",
};

// 五行(木・火・土・金・水)。同じ五行の2つの干支は、配色が同じです
export const KAN_ELEMENT = {
  "甲": "木", "乙": "木",
  "丙": "火", "丁": "火",
  "戊": "土", "己": "土",
  "庚": "金", "辛": "金",
  "壬": "水", "癸": "水",
};

// 五行ごとの配色(元のページのスクリーンショットから読み取った色)
//   bg      ページの背景
//   mark    上部の丸いマーク
//   shadow  バッジの右下の影
//   catch   キャッチコピーの文字
//   heading 小見出しの文字
//   border  バッジの枠線
export const PALETTE = {
  "木": { bg: "#f7ffec", mark: "#9edc7c", shadow: "#d6f0c2", catch: "#e86a96", heading: "#4a9c10", border: "rgba(0,0,0,0.45)" },
  "火": { bg: "#ffeced", mark: "#fa9a98", shadow: "#f0c2c6", catch: "#72c836", heading: "#9c1032", border: "rgba(0,0,0,0.45)" },
  "土": { bg: "#fff3ec", mark: "#d49c6a", shadow: "#f0d8c2", catch: "#4ebad6", heading: "#945808", border: "rgba(0,0,0,0.45)" },
  "金": { bg: "#ffffec", mark: "#f6d65e", shadow: "#f8f2c2", catch: "#4ebad6", heading: "#945808", border: "rgba(0,0,0,0.45)" },
  "水": { bg: "#ecfdff", mark: "#a0d2e6", shadow: "#c2f0f8", catch: "#aeea00", heading: "#00569a", border: "rgba(0,0,0,0.45)" },
};

// 相性リンクの代わりチップの色(画像が無いときに使います)
export const KAN_COLOR = Object.fromEntries(
  Object.entries(KAN_ELEMENT).map(([kan, el]) => [kan, PALETTE[el].mark])
);

// src/types/ にあるファイルを自動で全部読み込みます。
// ファイル名(kinoe.js など。.jsx でもOK)がそのままURLの末尾(/type-check/kinoe)になります。
// 新しい干支を足すときは、ファイルを置くだけでOKです。
const modules = import.meta.glob("./types/*.{js,jsx}", { eager: true });

export const TYPE_DATA = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [
    path.split("/").pop().replace(/\.jsx?$/, ""),
    mod.default,
  ])
);
