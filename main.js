/* eslint-disable no-shadow */
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
					resolve({ id: this.lastID });
				}
			});
		});
	}

	get(sql, params = []) {
		return new Promise((resolve, reject) => {
			this.dbpath.get(sql, params, (err, result) => {
				if (err) {
					console.log('error running sql: ' + sql);
					console.log(err);
					reject(err);
				}
				else {
					resolve(result);
				}
			});
		});
	}

	all(sql, params = []) {
		return new Promise((resolve, reject) => {
			this.dbpath.all(sql, params, (err, rows) => {
				if (err) {
					console.log('error running sql: ' + sql);
					console.log(err);
				}
				else {
					resolve(rows);
				}
			});
		});
	}
}

module.exports = AppDAO;

// startConnection.dbpath;

class greetingRepository {
	constructor(dao) {
		// this.userID = userID;
		this.dao = dao;
	}
	// create the table named greetings
	createTable() {
		const tablesql =
		`CREATE TABLE IF NOT EXISTS greetings(
			id INTEGER PRIMARY KEY AUTOINCREMENT, 
			message TEXT,
			projectId INTEGER, 
			CONSTRAINT greetings_fk_projectId FOREIGN KEY (projectId)
				REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE)`;
		return this.dao.run(tablesql);
	}

	// create string into greetings
	create(message, projectId) {
		return this.dao.run(
			'INSERT INTO greetings(message, projectId) VALUES (?, ?)',
			[message, projectId],
		);
	}

	update(greetings) {
		const { id, message, projectId } = greetings;
		return this.dao.run(
			`UPDATE greetings
					SET message = ?,
						projectId = ?
					WHERE id = ?,`,
			[message, projectId, id],
		);
	}

	getById(id) {
		return this.dao.get(
			'SELECT * FROM greetings WHERE id = ?',
			[id]);
	}

}

module.exports = greetingRepository;

class ProjectRepository {
	constructor(dao) {
		this.dao = dao;
	}

	createTable() {
		const sql = `
		CREATE TABLE IF NOT EXISTS projects (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT)`;
		return this.dao.run(sql);
	}

	create(name) {
		return this.dao.run(
			'INSERT INTO projects (name) VALUES(?)',
			[name]);
	}

	update(project) {
		const { id, name } = project;
		return this.dao.run(
			'UPDATE projects SET name = ? WHERE id = ?',
			[name, id],
		);
	}

	delete(id) {
		return this.dao.run(
			'DELETE FROM greetings WHERE id= ?',
			[id],
		);
	}

	getById(id) {
		return this.dao.get(
			'SELECT * FROM greetings WHERE projectId = ?',
			[id]);
	}

	getTasks(projectId) {
		return this.dao.all(
			'SELECT * FROM greetings WHERE projectId = ?',
			[projectId]);
	}

	getAll() {
		return this.dao.all('SELECT * FROM projects');
	}
}

module.exports = ProjectRepository;

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
	const greetingsRepo = new greetingRepository(dao);
	const projectRepo = new ProjectRepository(dao);
	const blogProjectData = { name: 'Testing name data' };
	let projectId;

	projectRepo.createTable()
		.then(() => greetingsRepo.createTable())
		.then(() => projectRepo.create(blogProjectData.name))
		.then((data) => {
			projectId = data.id;
			const greetings = [
				{
					message:  'Hello blah blah',
					projectId,
				},
				{
					message: 'Hi 1',
					projectId,
				},
			];
			return Promise.all(greetings.map((greeting) => {
				const { message, projectId } = greeting;
				return greetingsRepo.create(message, projectId);
			}));
		})
		.then(() => projectRepo.getById(projectId))
		.then((project) => {
			console.log('\nRetrieved project from database');
			console.log(`project id = ${project.id}`);
			console.log(`project name = ${project.name}`);
			return projectRepo.getTasks(project.id);
		})
		.then((greetings) => {
			console.log('\nRetrieved greetings from database');
			return new Promise((resolve, reject) => {
				greetings.forEach((greeting) => {
					console.log(`greeting id = ${greeting.id}`);
					console.log(`greeting message = ${greeting.message}`);
					console.log(`greeting projectid = ${greeting.projectId}`);
				});
			});
		})
		.then((greetings) => {
			console.log('\n updating values in greetings database');
			return new Promise((resolve, reject) => {
				greetings.forEach((greeting) => {
					greeting.update((greeting) => {
						[ message: 'hello!' ]
					})
			});
		})
		.catch((err) => {
			console.log('Error: ');
			console.log(JSON.stringify(err));
		});

	// dao.dbpath.close((err) => {
	// 	if (err) {
	// 		return console.error(err.message);
	// 	}
	// 	else {
	// 		console.log('database closed');
	// 	}
	// });
}

main();

