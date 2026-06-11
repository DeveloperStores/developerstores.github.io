import { Telegraf, Markup } from 'telegraf';

const BOT_TOKEN = '8245593482:AAHmwHg3lN-cWtl6BVFoGextCXzQ_PbVHLc';
const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply('Welcome! Continue karne ke liye button par click karein:', 
        Markup.inlineKeyboard([
            [Markup.button.url('Continue', 'https://mindiqtester.github.io')]
        ])
    );
});

bot.launch();
console.log('Bot is running...');
