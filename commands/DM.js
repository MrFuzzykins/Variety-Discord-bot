/* eslint-disable no-unused-vars */
const { prefix } = require('../config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
	name: 'dm',
	description: 'moves user to specific channel',
	args: true,
	cooldown: 0.1,
	execute(message) {

		const testChanneldict = {
			test1: '746290870977822763',
			test2: '746290917404573757',
			test3: '746290967031840838',
			test4: '746291034971045979',
		};

		const testRolesDict = {
			testR1: '728561286904021033',
			testR2: '731089163398676492',
			testR3: '746310179338977310',
			testR4: '746310135521083454',
		};


		const authorID = message.author.id;
		const n = 1;

		console.log(message.channel.guild.channels);

		console.log(message.guild.roles);

		const filter = (username) => {
			return username.content.includes(`${prefix}${authorID}`);
		};

		message.channel.awaitMessages(filter, { max: 1, time: 5 * 1000, errors: ['time'] })
			.then(collected =>
				message.channel.send(`After a amount of time, only ${collected.size} out of 1 recieved.`),
			)
			.catch(collected => {
				console.log(`After a amount of time, only ${collected.size} out of 1 recieved.`);
				message.channel.send(`After a amount of time, only ${collected.size} out of 1 recieved.`);
			});

	},
};