var TelegramBot = require('node-telegram-bot-api');

var token = '1053267350:AAFy2tk1ypr-BuczcwWQE_mVXPO2EELBFcc';
var bot = new TelegramBot(token, {polling: true});

var notes = [];

bot.onText(/\/start/, function (msg, match) {
    var userId = msg.from.id;
    bot.sendMessage(userId, 'Привет, я могу напомнить о любом событии в течении одного дня! Используй /напомни.');

})

bot.onText(/\/напомни (.+) в (.+)/, function (msg, match) {
    var userId = msg.from.id;
    var text = match[1];
    var time = match[2];

    notes.push( { 'uid':userId, 'time':time, 'text':text } );

    bot.sendMessage(userId, 'Отлично! Я обязательно напомню, если Создатель меня не отправит на доработку:)');
});

setInterval(function(){
    for (var i = 0; i < notes.length; i++){
        var curDate = new Date().getUTCHours() + ':' + new Date().getUTCMinutes();
        if ( notes[i]['time'] == curDate ) {
            bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: '+ notes[i]['text'] + ' сейчас.');
            notes.splice(i,1);
        }
    }
},1000);