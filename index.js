const { Telegraf, Markup } = require('telegraf');

// Aapka Bot Token
const BOT_TOKEN = '8245593482:AAHmwHg3lN-cWtl6BVFoGextCXzQ_PbVHLc';

const bot = new Telegraf(BOT_TOKEN);

// Jab user /start command bhejega
bot.start((ctx) => {
    ctx.reply(
        'Welcome! MindIQ Tester mein aapka swagat hai. Continue karne ke liye niche diye gaye button par click karein:',
        Markup.inlineKeyboard([
            [
                Markup.button.url('Continue', 'https://mindiqtester.github.io')
            ]
        ])
    );
});

// Bot start karein
bot.launch()
    .then(() => console.log('✅ Bot bina kisi crash ke chal gaya hai!'))
    .catch((err) => console.error('❌ Bot launch karne mein error aaya:', err));

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
