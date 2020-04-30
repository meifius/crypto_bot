// CRYPTO BOT
// API CRYPTO COMPARE
// name: CryptoBot ; username : crypto_2020_bot
// We will practice Keyboards in Telegram: 
//  1. Reply Keyboard
//  2. Inline Keyboard
// We will study interactive Menues

// IMPORT
const Telegraf = require('telegraf');
const axios = require('axios');
require('dotenv').config();

// CONSTANTs
const textHelp = 
`
CRYPTO BOT
Welcome, this bot gives you cryptocurrency information.

/start - 
/help - 

-----------
/test - 
`

// FUNCTIONS
const sendStartMessage = (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, textHelp, 
        {
            reply_markup : {
                inline_keyboard : [
                    [
                        {text : 'Crypto Prices', callback_data : 'price'}
                    ],
                    [
                        {text : 'Coin Market Cap', url : 'https://coinmarketcap.com/'}
                    ],
                ]
            }
        }
    );
}

// Create a new bot
const bot = new Telegraf(process.env.TOKEN);

// BOT's CODE
// start and help command
bot.command(['start', 'help'], ctx => {
    sendStartMessage(ctx);
});

// price action
bot.action('price', ctx => {
    ctx.deleteMessage();

    let priceMessage = `Get price information. Select one of the cryptocurrencies below`;
    bot.telegram.sendMessage(ctx.chat.id, priceMessage, 
        {
            reply_markup : {
                inline_keyboard : [
                    [
                        {text : 'BTC', callback_data : 'price-BTC'},
                        {text : 'ETH', callback_data : 'price-ETH'},
                    ],
                    [
                        {text : 'BCH', callback_data : 'price-BCH'},
                        {text : 'LTC', callback_data : 'price-LTC'},
                    ],
                    [
                        {text : 'Back to Menu', callback_data : 'start'},
                    ],
                ]
            }
        }
    );
});

// start action
bot.action('start', ctx => {
    ctx.deleteMessage();
    sendStartMessage(ctx);
});

//
let priceActionList = ['price-BTC', 'price-ETH', 'price-BCH', 'price-LTC'];
bot.action(priceActionList, async ctx => {
    let symbol = ctx.match.split("-")[1];

    //
    try{
        let res = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${process.env.API_KEY_CRYPTO}`)
        let data = res.data.DISPLAY[symbol].USD;

        let message = 
        `
        Symbol : ${symbol}
        Price : ${data.PRICE}
        Open: ${data.OPENDAY}
        High: ${data.HIGHDAY}
        Low: ${data.LOWDAY}
        Supply: ${data.SUPPLY}
        Market Cap: ${data.MKTCAP}
        `

        ctx.deleteMessage();
        bot.telegram.sendMessage(ctx.chat.id, message, {
            reply_markup : {
                inline_keyboard : [
                    {text : 'Back to prices', callback_data : 'price'}
                ]
            }
        });

    }catch(error){
        console.log(error);
        ctx.reply('Error has encountered');
    }
    
    // https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD
});


// --------------------------------------------------------
// test command
bot.command('test', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'Hi', 
    {
        reply_markup : {
            inline_keyboard : [
                [ // first row
                    {text : 'oooohhhh God1', callback_data : 'one'},
                    {text : 'oooohhhh God11', callback_data : 'one'},
                ],
                [ // second row
                    {text : 'Express Routing Doc', url : 'https://expressjs.com/es/guide/routing.html', callback_data : 'one'},
                ],
                [ // third row
                    {text : 'oooohhhh God3', callback_data : 'one'},
                    {text : 'oooohhhh God33', callback_data : 'one'},
                    {text : 'Second Menu', callback_data : 'two'},
                ],
            ]
        }
    });
});

// actions "functions"
// one test action
bot.action('one', ctx => {
    ctx.answerCbQuery('Pop-up Hello!');
    // bot.telegram.sendChatAction('upload_photo');
    ctx.reply('You have pressed the Button!');
    console.log('The user press the "one" button');
});

// two test action to Send another Menu, deleting the actual menu first
bot.action('two', ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, 'Second Menu', 
    {
        reply_markup : {
            inline_keyboard : [
                [ // second row
                    {text : 'Back to the Menu', callback_data : 'three'},
                ]
            ]
        }
    });
});

// action to Back to the Menu
bot.action('three', ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, 'Welcome Menu', 
    {
        reply_markup : {
            inline_keyboard : [
                [ // first row
                    {text : 'oooohhhh God1', callback_data : 'one'},
                    {text : 'oooohhhh God11', callback_data : 'one'},
                ],
                [ // second row
                    {text : 'Express Routing Doc', url : 'https://expressjs.com/es/guide/routing.html', callback_data : 'one'},
                ],
                [ // third row
                    {text : 'oooohhhh God3', callback_data : 'one'},
                    {text : 'oooohhhh God33', callback_data : 'one'},
                    {text : 'Second Menu', callback_data : 'two'},
                ],
            ]
        }
    });
});

// --------------------------------------------------------

// Listen
bot.launch();