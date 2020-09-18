/* eslint-disable no-unused-vars */
const Promise = require('bluebird');
const test = require('./commands/test');
const { resolve, reject } = require('bluebird');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = ':memory:';

// class Connection {
// 	constructor(dbpath) {
// 		this.dbpath = new sqlite3.Database(dbpath, (err) => {
// 			if (err) {
// 				console.log('conenction error');
// 				console.log(err);
// 			}
// 			else {
// 				console.log('connected to ' + dbpath + ' database.');
// 			}
// 		});
// 	}
// }

class AppDAO {
	constructor(dbpath) {
		this.dbpath = new sqlite3.Database(dbpath, (err) => {
			if (err) {
				console.log('conenction error');
				console.log(err);
			}
			else {
				console.log('connected to ' + dbpath + ' database.');
			}
		});
	}
	run(sql, params = []) {
		return new Promise((resolve, reject) => {
			this.dbpath.run(sql, params, function(err) {
				if (err) {
					console.log('Error running sql ' + sql);
					console.log(err);
					reject(err);
				}
				else {
					resolve();
				}
			});
		});
	}
}

module.exports = AppDAO;

// startConnection.dbpath;

class ID_DB {
	constructor(dao) {
		// this.userID = userID;
		this.dao = dao;
	}

	CreateTable() {
		const tablesql = 'CREATE TABLE greetings(message text)';
		const insertsql = `INSERT INTO greetings(message)
		VALUES('Hi'),
			('Hello'),
			('Welcome')`;
		const selectsql = 'SELECT message FROM greetings';

		return this.dao.run(tablesql).run(insertsql).each(selectsql, (err, row) => {
			if (err) {
				throw err;
			}
			console.log(row.message);
		});
	}
}

module.exports = ID_DB;

// startConnection.dbpath.serialize(() => {
// 	startConnection.dbpath.run('CREATE TABLE greetings(message text)')
// 		.run(`INSERT INTO greetings(message)
// 		VALUES('Hi'),
// 			('Hello'),
// 			('Welcome')`)
// 		.each('SELECT message FROM greetings', (err, row) => {
// 			if (err) {
// 				throw err;
// 			}
// 			console.log(row.message);
// 		});
// });

function main() {

	const dao = new AppDAO(DB_PATH);
	const create_table = ID_DB(dao);


	dao.dbpath.close((err) => {
		if (err) {
			return console.error(err.message);
		}
		else {
			console.log('database closed');
		}
	});
}

main();

