/* eslint-disable no-unused-vars */
const Discord = require("discord.io");

module.exports = {
	name: 'test',
	description: 'test random pieces of code',
	execute(message) {

		const client = new Discord.Client();
		// const servers = new Discord.Server();
		// const members = new Discord.Member();

		// Object.values(message.servers[event.d.guild_id].members)
		// 	.filter(m => m.roles.includes('728561286904021033'))
		// 	.map(m => m.username + '#' + m.discriminator);
		console.log(message.client);
	},
};