const config = require('./config');
const TelegramBot = require('node-telegram-bot-api');

const express = require('express');
const app = express();

const { port, token, wallet, howToPay, greeting } = config;

const strain1 = 'str1';
const strain2 = 'str2';
const strain3 = 'str3';

const button1g = '1g 220 UAH';
const button2g = '2g 400 UAH';
const button3g = '3g 550 UAH';

const bot = new TelegramBot(token, {
  polling: {
   interval: 300,
   autoStart: true,
   params: {
     timeout: 10
   }
  }
});

const startConversation = ['Посмотреть сорта!'];
const strains = [ strain1, strain2, strain3 ];
const quantity = [ button1g, button2g, button3g ];

const keyboard0 = [[]];

startConversation.forEach(starter => {
  keyboard0[0].push(starter)
});

const keyboard1 = [];

strains.forEach(strain => {
  keyboard1.push([strain])
});
// keyboard1.push(['Back'])

const keyboard2 = [];
quantity.forEach(number => {
  keyboard2.push([number])
});
keyboard2.push(['Назад к сортам'])

app.listen(port, () => {
  console.log(`Running at port:   ${port}`);
  // bot.on(/\/pay\*/, async msg => {
  //   await setTimeout(() => {
  //     bot.sendMessage(id, 'Пожалуйста проверьте правильность введенных данных.');
  //   }, (3000));
  //   // bot.sendMessage(id, 'Пожалуйста проверьте правильность введенных данных.');
  // });
  bot.on('message', async msg => {
    const payInfo = () => {
      bot.sendMessage(id, howToPay, {
        reply_markup: {
          remove_keyboard: true
        }
      });
    }
    // console.log(debug(msg));
    const { text, chat: { id }} = msg;

    console.log(text);
    console.log(/\/pay*/.test(text));
    if (/\/pay*/.test(text)) {
      console.log('regex test');
        await setTimeout(() => {
      bot.sendMessage(id, 'Пожалуйста проверьте правильность введенных данных.');
    }, (3000));
    }
    if (strains.indexOf(text) != -1) {
      bot.sendMessage(id, `Выберите фасовку:\n- ${button1g}\n- ${button2g}\n- ${button3g}`, {
        reply_markup: {
          keyboard: keyboard2
        }
      });
    } else if (text === 'Посмотреть сорта!' || text === 'Назад к сортам') {
      bot.sendMessage(id, `Вот список доступных сортов:\n- ${strain1}\n- ${strain2}\n- ${strain3}`, {
        reply_markup: {
          keyboard: keyboard1
        }
      });
    } else if (text === '/start') {
      bot.sendMessage(id, `${greeting}`, {
        reply_markup: {
          keyboard: keyboard0
        }
      });
    } else if (text === button1g) {
      await setTimeout(() => {
        bot.sendMessage(id, `Сумма - 220 грн.\nДанные для оплаты:\nEasyPay: ${wallet}\nПосле оплаты отправьте нам номер платежа и дату в формате "\/pay 12345678 12:20:35".`, {
          reply_markup: {
            remove_keyboard: true
          }
        });
      }, (1000));
      payInfo();
    } else if (text === button2g) {
      await setTimeout(() => {
        bot.sendMessage(id, `Сумма - 400 грн.\nДанные для оплаты:\nEasyPay: ${wallet}\nПосле оплаты отправьте нам номер платежа и дату в формате "\/pay 12345678 12:20:35".`, {
          reply_markup: {
            remove_keyboard: true
          }
        });
      }, (1000));
      payInfo();
    } else if (text === button3g) {
      await setTimeout(() => {
        bot.sendMessage(id, `Сумма - 550 грн.\nДанные для оплаты:\nEasyPay: ${wallet}\nПосле оплаты отправьте нам номер платежа и дату в формате "\/pay 12345678 12:20:35".`, {
          reply_markup: {
            remove_keyboard: true
          }
        });
      }, (1000));
      payInfo();
    } else {
      if (text[0] !== '\/'
      && text[1] !== 'p'
      && text[2] !== 'a'
      && text[3] !== 'y') bot.sendMessage(id, `Пожалуйста воспользуйтесь всплывающей клавиатурой или введите \/start`);
    }
  })
});

const debug = (obj = {}) => JSON.stringify(obj, null, 4);
