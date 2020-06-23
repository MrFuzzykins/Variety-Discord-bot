module.exports = {
	name: 'user-info',
	description: 'Send user info',
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {

		if(!message.mentions.users.size) {
			return message.channel.send(`\`\`\`username: ${message.author.username}\nID: ${message.author.id}\`\`\``);
		}

		const userInfo = message.mentions.users.map(user => {
			return `\`\`\`username: ${user.username}\nID: ${user.id}\`\`\``;
		});

		message.channel.send(userInfo);
	},
};