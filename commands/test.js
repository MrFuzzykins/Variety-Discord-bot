/* eslint-disable no-undef */

module.exports = {
	name: 'test',
	description: 'test random pieces of code',
	execute(message) {

		// Object.values(message.servers[event.d.guild_id].members)
		// 	.filter(m => m.roles.includes('728561286904021033'))
		// 	.map(m => m.username + '#' + m.discriminator);

		console.log(Object.values(message.servers));

	},
};