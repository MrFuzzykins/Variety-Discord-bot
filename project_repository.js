// project_repository.js

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
}

module.exports = ProjectRepository;