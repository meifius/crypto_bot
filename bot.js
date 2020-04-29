// CRYPTO BOT
// name: CryptoBot ; username : crypto_2020_bot

// IMPORT
const Telegraf = require('telegraf');
require('dotenv').config();

// Create a new bot
const bot = new Telegraf(process.env.TOKEN);

// BOT's CODE
bot.command(['start', 'help'], ctx => {
    ctx.reply('Hello World!');
});

// Listen
bot.launch();