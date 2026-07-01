# Telegram TMA Bot バックエンド (Node.js)

[English](README.md) | [简体中文](README.ZH.md) | [日本語](README.JA.md)

- **著者**: Vincent
- **バージョン**: V2 (環境変数サポート & ネットワークプロキシ自動連動版)

モダンな **grammY** フレームワークを使用して構築された、Telegram ミニアプリ（Mini App / TMA）用の Node.js バックエンドボットサーバーです。Telegram ユーザーにミニアプリ起動用インラインキーボードボタンを配布するためのゲートウェイとして機能します。

---

## 🚀 V2 の主な特徴

1. **環境変数のサポート**:
   - `dotenv` を導入し、秘密情報（Bot Token、WebAppの遷移先URL）をすべてローカルの `.env` ファイルからロードするように設計。ソースコードへのトークン誤コミットを防ぎます。
2. **中国大陸向けプロキシの自動解決**:
   - `https-proxy-agent` を統合。`.env` 内に `TELEGRAM_PROXY` が設定されている場合、Bot API へのリクエストを自動的にローカルのプロキシ（Clash、v2ray等）経由にルーティングし、ネットワークブロックやタイムアウトによる動作不良を解決します。
3. **堅牢なエラーハンドリング**:
   - 起動時の `BOT_TOKEN` 存在チェックおよび、プロセスダウンを防ぐための `bot.catch()` グローバルエラーインターセプターを完備。

---

## 🛠 事前準備とインストール

### 1. 依存関係のインストール
プロジェクトのルートディレクトリで以下のコマンドを実行します:
```bash
npm install
```

### 2. 環境変数の設定
`.env.example` をコピーして、新しく `.env` ファイルを作成します:
```bash
cp .env.example .env
```
`.env` ファイルを開き、必要な値を入力します:
```env
BOT_TOKEN=BotFatherから取得したBotのトークン
WEB_APP_URL=ミニアプリH5の公開URL (例: https://your-tma-host/index.html)

# ⚠️ 中国国内からデバッグする場合に必要なローカルプロキシ設定:
TELEGRAM_PROXY=http://127.0.0.1:7890
```
*(海外のVPSサーバー上で実行する場合は、`TELEGRAM_PROXY` の行をコメントアウトするか、空欄にしてください)。*

---

## 🚀 起動方法

### コマンド
以下のコマンドを実行してサーバーを起動します:
```bash
node index.js
```
接続に成功すると、`Telegram Bot started successfully. Listening for incoming messages...` とコンソールに表示されます。

---

## 💡 動作テストの手順
1. Telegram 検索から作成した Bot を検索し、チャットを開始します。
2. **`/start`** コマンドを送信します。Botが応答し、**Open mini App** というインラインボタン付きのメッセージが返されます。
3. そのボタンをクリックすると、Telegram クライアント内で設定したミニアプリのH5ページが起動します。
4. **`/3rd`** コマンドを送信すると、サードパーティ製アプリの起動テストが行えます。
