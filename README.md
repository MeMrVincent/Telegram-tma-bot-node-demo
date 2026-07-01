# Telegram TMA Bot Server (Node.js)

[English](README.md) | [简体中文](README.ZH.md) | [日本語](README.JA.md)

- **Author**: Vincent
- **Version**: V2 (Environment-ready & Self-adaptive Proxy Version)

A Node.js backend Bot server for Telegram Mini Apps (TMA) built with the modern **grammY** framework. It acts as the gateway to distribute your H5 WebApp buttons to Telegram users.

---

## 🚀 Key Features in V2

1. **Environmental Configuration**:
   - Integrated `dotenv` to load secrets from a local `.env` file, keeping sensitive tokens out of codebase commits.
2. **Mainland China Proxy Adaption**:
   - Integrates `https-proxy-agent` adaptively. If `TELEGRAM_PROXY` is configured, it automatically routes Bot API calls through your local proxy (e.g. Clash, v2ray), solving connection timeouts and blocks for developers in Mainland China.
3. **Comprehensive Logging**:
   - Added friendly configuration check logs and runtime error interceptors to prevent crashes.

---

## 🛠 Prerequisites & Installation

### 1. Install Dependencies
Run the command below in the project root directory:
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to a new file named `.env`:
```bash
cp .env.example .env
```
Open `.env` and fill in the values:
```env
BOT_TOKEN=your_bot_token_from_botfather
WEB_APP_URL=https://your-tma-host/index.html

# Crucial for Mainland China developers:
TELEGRAM_PROXY=http://127.0.0.1:7890
```
*(Comment out `TELEGRAM_PROXY` or keep it blank if running on a VPS outside China).*

---

## 🚀 How to Run

### Command to Start
Run the following command:
```bash
node index.js
```
Upon a successful connection, you will see `Telegram Bot started successfully. Listening for incoming messages...`.

---

## 💡 Usage Details
1. Open Telegram and search for your Bot.
2. Send the **`/start`** command. The Bot will respond with a chat bubble containing an inline button named **Open mini App**.
3. Clicking that button will launch your configured WebApp H5 page inside the Telegram client.
4. Send the **`/3rd`** command to test launching third-party portal entry.
