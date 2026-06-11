const { Telegraf, Markup } = require('telegraf');

// Aapka confirmed token
const BOT_TOKEN = '8245593482:AAHmwHg3lN-cWtl6BVFoGextCXzQ_PbVHLc';
const bot = new Telegraf(BOT_TOKEN);

// Jab user /start dabaye ya normal message bheje, dono par handle karega
bot.start((ctx) => {
    ctx.reply('Welcome! MindIQ Tester mein aapka swagat hai. Continue karne ke liye niche button par click karein:', 
        Markup.inlineKeyboard([
            [Markup.button.url('Continue', 'https://mindiqtester.github.io')]
        ])
    );
});

// Backup ke liye: Agar user kuch likhe toh bhi button de
bot.on('text', (ctx) => {
    ctx.reply('Continue karne ke liye niche click karein:', 
        Markup.inlineKeyboard([
            [Markup.button.url('Continue', 'https://mindiqtester.github.io')]
        ])
    );
});

bot.launch()
    .then(() => console.log('✅ Bot successfully running!'))
    .catch((err) => console.error('❌ Bot launch error:', err));

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
