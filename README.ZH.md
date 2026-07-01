# Telegram TMA Bot 后端服务 (Node.js)

[English](README.md) | [简体中文](README.ZH.md) | [日本語](README.JA.md)

- **作者**: Vincent
- **版本**: V2 (环境变量支持与网络代理自适应版)

这是一个使用现代 **grammY** 框架编写的 Node.js Telegram 机器人（Bot）后端。主要作为 Telegram 小程序（Mini App / TMA）的入口分发器，在 Telegram 中响应用户指令并向其下发打开小程序的行内键盘按钮。

---

## 🚀 V2 版本核心特性

1. **配置与代码分离 (环境变量支持)**：
   - 引入了 `dotenv` 库。所有敏感密钥（Bot Token、WebApp 跳转链接）全部从根目录下的 `.env` 文件读取，避免机密信息被意外提交至公共仓库。
2. **中国大陆网络代理自适应支持 (核心提升)**：
   - 自适应集成了 `https-proxy-agent`。若检测到 `.env` 文件中配置了 `TELEGRAM_PROXY`，系统会自动将网络请求通过您本地的代理软件进行转发（如 Clash、v2ray 等），解决大陆开发者因防火墙拦截导致的连接超时或挂死问题。
3. **健壮的启动检测与报错捕获**：
   - 增加了启动时对 `BOT_TOKEN` 的强制检查，防止在缺少配置时发生无法预知的底层报错；内置了 `bot.catch()` 全局错误侦听。

---

## 🛠 安装与配置

### 1. 安装项目依赖
在项目根目录下打开终端，执行以下命令安装依赖：
```bash
npm install
```

### 2. 配置本地环境变量
将项目根目录下的 `.env.example` 模版复制一份并重命名为 `.env`：
```bash
cp .env.example .env
```
打开 `.env` 文件，填写对应的配置项：
```env
BOT_TOKEN=您的Telegram机器人密钥(通过@BotFather获取)
WEB_APP_URL=您的小程序H5前端网关链接(例如 https://yourdomain.com/index.html)

# ⚠️ 针对中国大陆开发者（至关重要）：
TELEGRAM_PROXY=http://127.0.0.1:7890
```
* **注意**：如果您使用的是海外 VPS 服务器部署，请将 `TELEGRAM_PROXY` 行**注释掉**或**保持为空**。如果在大陆本地开发，请必须将其指定为您的代理软件实际监听的本地局域网端口（例如 Clash 默认通常为 `http://127.0.0.1:7890`）。

---

## 🚀 启动运行

### 运行命令
在根目录下执行：
```bash
node index.js
```
当控制台输出 `Telegram Bot started successfully. Listening for incoming messages...` 时，说明机器人已成功与 Telegram 官方服务器建立连接并开启长轮询。

---

## 💡 交互测试
1. 在 Telegram 客户端内搜索并关注您的机器人。
2. 向机器人发送 **`/start`** 指令，机器人会回复一条消息，并附带名为 **Open mini App** 的行内按钮。
3. 点击该按钮，即可在 Telegram 内直接唤起您所配置的 TMA 前端展示页面。
4. 发送 **`/3rd`** 可以测试唤起指定的第三方入口。
