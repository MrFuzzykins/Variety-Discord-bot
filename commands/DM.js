const { prefix } = require('../config.json');
module.exports = {
	name: 'dm',
	description: 'moves user to specific channel',
	args: true,
	cooldown: 0.1,
	execute(message) {

		// eslint-disable-next-line no-unused-vars
		const authorID = message.author.id;

		const filter = (username) => {
			return username.content.includes(`${prefix}${authorID}`);
		};
		// wait 30 secs
		message.channel.awaitMessages(filter, { max: 1, time: 5 * 1000, errors: ['time'] })
			.then(collected =>
				message.channel.send(`After a amount of time, only ${collected.size} out of 1 recieved.`),
			)
			.catch(collected => {
				console.log(`After a amount of time, only ${collected.size} out of 1 recieved.`);
				message.channel.send(`After a amount of time, only ${collected.size} out of 1 recieved.`);
			});

		// // message.channel.send(rolesinfo);
		// // console.log(rolesinfo);
		// console.log(message);
		// const firstdeclaredID = message.author.id;
		// message.channel.send(firstdeclaredID);
		// }));
		// const guildMembers = message.guild.members.cache.map(id);
		// console.log(guildMembers);
		// if (member.roles.cache.has('728561286904021033')) {
		// 	message.channel.send('you\'ve got the role test');

	},
};