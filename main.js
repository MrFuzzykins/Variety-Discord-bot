const Discord = require('discord.js');
// eslint-disable-next-line no-unused-vars
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	const args = msg.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	if (command === 'args-info') {
		if (!args.length) {
			return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
		}
		else if (args[0] === 'foo') {
			return msg.channel.send('bar');
		}

		msg.channel.send(`First argument: ${args[0]}`);
	}

	// switch (msg.content) {
	// case `${prefix}ping`:
	// 	msg.reply(`${prefix}pong`);
	// 	break;
	// case `${prefix}lol`:
	// 	msg.reply(`${prefix}lmao`);
	// 	break;
	// case `${prefix}server`:
	// 	// eslint-disable-next-line quotes
	// 	msg.reply(`\`\`\`\nThis server's name is: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}\`\`\``);
	// 	break;
	// default:
	// 	break;
	// }
});

client.login(token);
