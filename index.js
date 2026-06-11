const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

// Apne Telegram Bot ka Token yahan dalein ya .env file use karein
const BOT_TOKEN = process.env.BOT_TOKEN || '8245593482:AAHmwHg3lN-cWtl6BVFoGextCXzQ_PbVHLc';

if (!BOT_TOKEN || BOT_TOKEN === '8245593482:AAHmwHg3lN-cWtl6BVFoGextCXzQ_PbVHLc') {
    console.error("Error: Please provide a valid Telegram Bot Token!");
    process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

// Jab user /start command bhejega
bot.start((ctx) => {
    const firstName = ctx.from.first_name || 'User';
    
    ctx.reply(
        `Hello ${firstName}! 👋\nMindIQ Tester Web Bot mein aapka swagat hai. Niche diye gaye button par click karke bot start karein.`,
        Markup.inlineKeyboard([
            [
                // Web App button jo aapke link ko open karega
                Markup.button.webApp('🚀 Open MindIQ Tester', 'https://t.me/MindIQTester_bot/MindIQTaster')
            ]
        ])
    );
});

// Bot ko start karne ke liye
bot.launch()
    .then(() => console.log('✅ MindIQ Telegram Bot successfully chal raha hai!'))
    .catch((err) => console.error('❌ Bot launch karne mein error aaya:', err));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
