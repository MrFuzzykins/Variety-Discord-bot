module.exports = {
	name: 'prune',
	description: 'command for deleting messages',
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		const amount = parseInt(args[0] + 2);

		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		}
		else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input number between 1 and 99');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
		});
	},
};