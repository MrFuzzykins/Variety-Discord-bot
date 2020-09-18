const { keyv } = require('../index');

module.exports = {
	name: 'test',
	description: 'test random pieces of code',
	execute(message) {
		const results = (async () => {
			await keyv.set('foo', 'bar');

			await keyv.get('foo');
		})();

		message.channel.send(results);
	},
};