const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
	if (msg.content === 'ping') {
		msg.reply('pong');
	}
});


bot.login('NzIxMTkyMDE3ODExNjAzNDk3.XuRAuQ.XSGVmVNONgnpW7rCxIWQTrSPF-M');
