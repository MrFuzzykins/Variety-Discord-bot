const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

exports.databaseID = sequelize.define('userDMpairs', {
	authorID: {
		type: Sequelize.INTEGER,
		unique: true,
	},
	replyID: {
		type: Sequelize.INTEGER,
		unique: true,
	},
});

try {
	const iddb = await databaseID.create({
        authorID: message.author.id
        replyID: 
	});
	return message.reply(`ID ${iddb.name} added.`);
}
catch (e) {
	if (e.name === 'SequelizeUniqueConstraintError') {
		return message.reply('That ID already exists.');
	}
	return message.reply('Something went wrong with adding the ID.');
}
