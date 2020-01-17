require('http').createServer().listen(process.env.PORT || 5000).on('request', function(req, res){
    res.end('')
})
var TelegramBot = require('node-telegram-bot-api');

var token = '1053267350:AAFy2tk1ypr-BuczcwWQE_mVXPO2EELBFcc';
var bot = new TelegramBot(token, {polling: true});
var CronJob = require('cron').CronJob;

var notes = [];

bot.onText(/\/remind (.+) at (.+)/, (msg, match) => {
    var userId = msg.from.id;
    var text = match[1];
    var time = match[2];
    var note = notes.push({'uid':userId, 'time':match[2], 'text':match[1]});
    bot.sendMessage(userId, 'Хорошо,я напомню');
    new CronJob('* * * * * *', function() {
        for (var i = 0; i < notes.length; i++){
            var curDate = new Date().getHours() + ':' + new Date().getMinutes();
            if ( notes[i]['time'] === curDate ) {
                bot.sendMessage(notes[i]['uid'], 'Напоминаю: '+ notes[i]['text']);
                notes.pop(i,1);
            }
        }
    }, null, true, 'Europe/Minsk');
})