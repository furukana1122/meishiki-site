// タイプ診断トップページ(/type-check)の文章と画像の指定
// 文章を直したいときは、このファイルだけを書き換えればOKです。
// 画像は public/type-top/ フォルダに置きます。
//
// 本文の改行は、文章の中に \n と書くと、その位置で改行されます。
//
// steps の blocks に並べたものが、上から順にページに表示されます。
//   { type: "text",    text: "..." }                本文
//   { type: "caption", text: "..." }                中央に寄せた小さめの文字(画像の補足など)
//   { type: "button",  label: "...", href: "..." }  水色のボタン
//   { type: "image",   src: "...", alt: "..." }     画像
//   { type: "arrow" }                               黄色の下向き矢印

export default {
  logo: "/type-top/logo.png",
  logoAlt: "四柱推命 タイプ診断 Ver2.1",

  intro: [
    "四柱推命では人が持っている星から「本質」「才能」「行動パターン」「運気」など、様々な情報を読み解くことができますが、この「タイプ診断」ではベースとなる【自分の本質】について解説していきます。",
    "ご自身のタイプを理解し、さらに自分の得意を伸ばしていっちゃいましょう☺",
  ],

  steps: [
    {
      label: "STEP 1",
      title: "命式を出す",
      blocks: [
        {
          type: "text",
          text: "下記ボタンから命式鑑定サイトへアクセスし、自分の星を調べるために「命式（めいしき)」を出します。\n命式を出したらスクショを取って控えを残しておきましょう♪",
        },
        { type: "button", label: "命式鑑定サイトへ移動", href: "/" },
        { type: "image", src: "/type-top/step1-1.png", alt: "生年月日と性別を入れて、命式を出すボタンを押す" },
        { type: "arrow" },
        { type: "image", src: "/type-top/step1-2.png", alt: "命式が表示された画面" },
        { type: "button", label: "命式鑑定サイトへ移動", href: "/" },
      ],
    },
    {
      label: "STEP 2",
      title: "自分の星を確認する",
      blocks: [
        {
          type: "text",
          text: "命式を出すことができたら、今度は自分の本質を表す星が何かをチェックします。\n必要なのは下記画像で丸している部分だけ。\nこの漢字の並びの【左側部分のみ】を使っていきます。",
        },
        { type: "image", src: "/type-top/step2-1.png", alt: "命式の日柱の左側の漢字に丸をつけた画像" },
        { type: "caption", text: "参考画像の場合は「丙戌」の「丙」が本質を表す星です。" },
        { type: "image", src: "/type-top/step2-2.png", alt: "" },
        {
          type: "text",
          text: "自分の星が何かチェックできましたか？\nそれでは自分の本質について詳しく紐解いていきましょう。",
        },
      ],
    },
    {
      label: "STEP 3",
      title: "自分の本質を読む",
      blocks: [
        {
          type: "text",
          text: "本質を教えてくれる星は全部で10種類存在します。あなたの星は何でしたか？\n鑑定サイトには簡単な解説が表示されますが、「さらに詳しく」をクリックすると、さらに解説がご覧になれます。\n自分の本質について詳しく読んでいきましょう。",
        },
        { type: "image", src: "/type-top/step3-1.png", alt: "「さらに詳しく」ボタンのある画面" },
      ],
    },
  ],

  // 一番下の水色のエリア(10干支を選ぶボタンが並びます)
  pickerTitle: "＜あなたのタイプをチェックする＞",
  pickerImage: "/type-top/check.png",
  pickerImageAlt: "自分のタイプをCheckしてみよう",
  pickerNote: "自分の星の名前をCLICKしてね♡",
};
