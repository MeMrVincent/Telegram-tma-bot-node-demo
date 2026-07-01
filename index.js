require("dotenv").config();
const { Bot } = require("grammy");
const { HttpsProxyAgent } = require("https-proxy-agent");

const token = process.env.BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL || 'https://hostname';
const proxyUrl = process.env.TELEGRAM_PROXY;

// Safe assertion for mandatory Bot Token
if (!token) {
  console.error("=====================================================================");
  console.error("CRITICAL ERROR: BOT_TOKEN is missing in environment configuration.");
  console.error("Please create a '.env' file in the root directory matching '.env.example'.");
  console.error("And set: BOT_TOKEN=your_telegram_bot_token");
  console.error("=====================================================================");
  process.exit(1);
}

// Adaptive network agent injection
const botConfig = {};
if (proxyUrl) {
  console.log(`[Network Proxy] Initializing bot client using proxy agent: ${proxyUrl}`);
  // IMPORTANT: For developers in Mainland China, a local HTTP proxy (like Clash listening at http://127.0.0.1:7890) 
  // is required to bypass firewalls and establish connection with Telegram's WebApp Bot API.
  const agent = new HttpsProxyAgent(proxyUrl);
  botConfig.client = {
    baseFetchConfig: {
      agent: agent,
      compress: true
    }
  };
} else {
  console.log("[Network Direct] Connecting directly to Telegram Bot API server (No proxy agent specified).");
}

const bot = new Bot(token, botConfig);

// Command /start handler: returns an Inline Button to load the Mini App
bot.command('start', async (ctx) => {
    console.log('[Bot Server] received /start command');
    try {
        const author = await ctx.getAuthor();
        console.log('[User details]: ', author);
        ctx.reply('Click the button below to open the Web App:', {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Open mini App',
                            web_app: { url: webAppUrl }
                        }
                    ]
                ]
            }
        });
    } catch (error) {
        console.error('Error fetching message author:', error);
    }
});

// Command /3rd handler: returns an Inline Button to load the 3rd Web App
bot.command('3rd', async (ctx) => {
    console.log('[Bot Server] received /3rd command');
    try {
        const author = await ctx.getAuthor();
        console.log('[User details]: ', author);
        ctx.reply('Click the button below to open the 3rd Web App:', {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Open thirdParty App',
                            web_app: { url: webAppUrl }
                        }
                    ]
                ]
            }
        });
    } catch (error) {
        console.error('Error fetching message author:', error);
    }
});

// Catch errors gracefully to prevent server crashes
bot.catch((err) => {
    console.error('Bot runtime error captured: ', err);
});

// Run bot server in long polling mode
bot.start().then(() => {
    console.log('Telegram Bot started successfully. Listening for incoming messages...');
}).catch((err) => {
    console.error('Failed to start Telegram Bot server: ', err);
});
