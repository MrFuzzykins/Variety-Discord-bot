/* eslint-disable no-unused-vars */
module.exports = {
	name: 'trivia',
	description: 'random trivia',
	alias: 'quiz',
	execute(message) {
		const quiz = require('../quiz_answers.json');
		const item = quiz[Math.floor(Math.random() * quiz.length)];
		const filter = response => {
			return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
		};

		message.channel.send(item.question).then(() => {
			message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
				.then(collected => {
					message.channel.send(`${collected.first().author} got the correct answer!`);
				})
				.catch(collected => {
					message.channel.send('Looks like nobody got the answer this time.');
				});
		});
	},
};