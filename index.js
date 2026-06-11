import telebot

# Aapka provide kiya gaya Bot Token
BOT_TOKEN = '8245593482:AAHmwHg3lN-cWtl6BVFoGextCXzQ_PbVHLc'

bot = telebot.TeleBot(BOT_TOKEN)

# Jab user /start command par click karega
@bot.message_handler(commands=['start'])
def send_welcome(message):
    bot.reply_to(message, "Click Start Button To Start IQ Tast")

# Bot ko active rakhne ke liye
print("Aapka Bot successfully start ho gaya hai...")
bot.infinity_polling()
