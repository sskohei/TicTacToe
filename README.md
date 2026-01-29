## アプリの概要

三目並べ（○×ゲーム）と消える三目並べを遊ぶことのできるアプリです。CPUと対戦する一人用モードと二人で1つの端末を使って対戦することのできる二人用モードを実装しています。

## 使用技術

・javascript

・React

・Next.js

・zustand

・ChatGPT（コード生成やデザインの相談）

## 機能一覧
・2種類のゲーム（通常の三目並べと消える三目並べ）

・一人用モード（CPU対戦）

・難易度選択（easy,normal,hardの3種類から選択できる）

・二人用モード（1つの端末で二人で対戦）

## 画面イメージ
・ゲーム選択画面
![game](./images/sample01.png)

・モード選択画面（1人で遊ぶか2人で遊ぶか選択する）
![mode](./images/sample02.png)

・難易度選択画面（3種類あり1つ選択）
![difficulty](./images/sample03.png)

・ゲーム画面
![play](./images/sample04.png)

## 一人用モードのCPU
・easy

空いているマスにランダムで配置。

・normal

勝てるマスががあればそこに配置し、置かれると負けるマスがあれば防ぐ。どちらの状況でもなければランダムなマスに配置する。

・hard

minimaxという関数を再起させて盤面を考え、Oが勝つ → +10、Xが勝つ → -10、引き分け → 0というように点数をつけて次の一手を評価し、一番評価が高いマスに配置する。

## 工夫点
・zustandを使用して難易度の状態管理を行った（levelStores.ts）

・CPUを難易度ごとに3種類作成した

## 苦労した点
・消える三目並べのhardモードのCPUでは通常の三目並べとは違いマスがすべて埋まることはなく、再起関数による実装だと無限に処理をしてしまった。

### 解決
・MAX_DEPTH=6とif (depth === 0) return 0によって無限ループしないようにした。再起するたびにdepth-1となるためdepth===0の時の処理があればdepthが0になったときにループを止めることができる。

## 改善点
・hardといっても今の処理では勝ち負けが付く盤面のみに点数をつけているため最強のCPUとしては不十分。他の評価方法なども導入してもっと強くできるようにしたい。

・スマホでの表示は確認できていないのでスマホでも見やすいページにしたい。


## 使い方

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
