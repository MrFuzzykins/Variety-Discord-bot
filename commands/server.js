module.exports = {
	name: 'server',
	description: 'Send Server info',
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	},
};