const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const path = require('path');
require('dotenv').config();

// Hardcoded Token as requested
const BOT_TOKEN = '8245593482:AAHmwHg3lN-cWtl6BVFoGextCXzQ_PbVHLc';
const bot = new Telegraf(BOT_TOKEN);

// Server URL (Deploy hone ke baad Render ka URL automatically isme set ho jayega)
const WEB_APP_URL = process.env.RENDER_EXTERNAL_URL || 'http://localhost:3000';

// Express setup static dashboard/ads page serve karne ke liye
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// In-memory session database active users ka track rakhne ke liye
const userSessions = {};

// Full Professional IQ Questions Database
const questions = [
    {
        id: 0,
        text: "🧠 **LEVEL 1: LOGIC TEST**\n\nEk doctor ne aapko 3 tablets di aur kaha ki har aadhe ghante (30 mins) mein ek goli khani hai. \n\nBatao saari goliyan khatam hone mein kul kitna samay lagega?",
        options: [
            ["⏱️ 30 Mins", "ans_wrong"], 
            ["⏱️ 1 Ghanta", "ans_correct"], 
            ["⏱️ 1.5 Ghante", "ans_wrong"], 
            ["⏱️ 2 Ghante", "ans_wrong"]
        ]
    },
    {
        id: 1,
        text: "🔢 **LEVEL 2: PATTERN ANALYSIS**\n\nIs mathematical sequence ko dhyan se dekho:\n`2, 4, 8, 16, 32, __?`\n\nAgla number kya hona chahiye?",
        options: [
            ["💡 48", "ans_wrong"], 
            ["💡 50", "ans_wrong"], 
            ["💡 64", "ans_correct"], 
            ["💡 128", "ans_wrong"]
        ]
    },
    {
        id: 2,
        text: "⚡ **LEVEL 3: BRAIN SPEED TEST**\n\nBina kisi calculator ke fast solution socho:\n\n`5 + 5 × 5 - 5 = ?` \n\n_(Hint: BODMAS rule yaad rakhein)_",
        options: [
            ["🎯 25", "ans_correct"], 
            ["🎯 45", "ans_wrong"], 
            ["🎯 0", "ans_wrong"], 
            ["🎯 20", "ans_wrong"]
        ]
    },
    {
        id: 3,
        text: "👁️ **LEVEL 4: LATERAL THINKING (PAHELI)**\n\nAisi kaunsi cheez hai jo upar bhi jaati hai aur neeche bhi jaati hai, lekin apni jagah se ek inch bhi nahi hilti?",
        options: [
            ["⛅ Baarish / Badal", "ans_wrong"], 
            ["🪜 Seedi (Stairs)", "ans_correct"], 
            ["⏳ Umar (Age)", "ans_wrong"], 
            ["💨 Dhuaan", "ans_wrong"]
        ]
    }
];

// Start command framework
bot.start((ctx) => {
    const firstName = ctx.from.first_name;
    userSessions[ctx.from.id] = { currentQuestion: 0, score: 0 };

    ctx.replyWithMarkdown(
        `👋 *Welcome ${firstName}!* to the ultra-advance *Mind IQ Tester* 🧠\n\nKya aapko lagta hai aapka dimaag normal logon se zyada sharp chalta hai? Chaliye live check karte hain!\n\n🚀 *Game Structural Rules:* \n• Total 4 high-level interactive riddles hain.\n• Har sahi jawab par aapka intellectual level scale up hoga.\n• Test complete hote hi aapko professional web UI par report milegi.`,
        Markup.inlineKeyboard([
            [Markup.button.callback('🔥 Start IQ Challenge', 'start_game')]
        ])
    );
});

// Game initiator switch
bot.action('start_game', (ctx) => {
    const userId = ctx.from.id;
    userSessions[userId] = { currentQuestion: 0, score: 0 };
    sendQuestion(ctx, userId);
});

// Dynamic Question Render Algorithm
function sendQuestion(ctx, userId) {
    const session = userSessions[userId];
    const q = questions[session.currentQuestion];

    const keyboard = q.options.map(opt => {
        return [Markup.button.callback(opt[0], opt[1])];
    });

    ctx.editMessageText(q.text, {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard(keyboard)
    });
}

// Global Answer Assessment Controller
bot.action(['ans_correct', 'ans_wrong'], (ctx) => {
    const userId = ctx.from.id;
    if (!userSessions[userId]) return ctx.reply('Kripya session ko refresh karne ke liye /start type karein.');

    if (ctx.callbackQuery.data === 'ans_correct') {
        userSessions[userId].score += 1;
    }

    userSessions[userId].currentQuestion += 1;

    // Check mapping parameter for final loop
    if (userSessions[userId].currentQuestion >= questions.length) {
        const finalScore = userSessions[userId].score;
        
        ctx.editMessageText(
            `🎉 *All Levels Cleared Successfully!*\n\nAapka intellectual data securely process ho chuka hai.\n\n📊 *Apna detailed score vector, global ranking, aur Monetag verification profile dekhne ke liye niche open karein:*`,
            {
                parse_mode: 'Markdown',
                ...Markup.inlineKeyboard([
                    [Markup.button.webApp('⚡ View Professional IQ Report', `${WEB_APP_URL}/index.html?score=${finalScore}`)]
                ])
            }
        );
    } else {
        sendQuestion(ctx, userId);
    }
});

// Web App trigger event validation
bot.on('web_app_data', (ctx) => {
    if(ctx.webAppData.data === "reward_unlocked") {
        ctx.reply('🎁 *Premium Reward Unlocked!* Aapko ad successfully dekhne ke liye verify kar liya gaya hai. Congratulations, you possess an exceptional Einstein-level mindset!');
    }
});

bot.launch();
console.log("⚡ Bot Core is running on Telegram Polling...");

// Port specification dynamic injection for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`📡 Express Monetag Ad Server routing active on port ${PORT}`);
});
          
