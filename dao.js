/* eslint-disable no-mixed-spaces-and-tabs */
const Promise = require('bluebird');
const { run } = require('sqlite3');

class AppDAO {
	// omitting constructor code

	run(sql, params = []) {
	  return new Promise((resolve, reject) => {
			this.db.run(sql, params, function(err) {
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
}

module.exports = AppDAO;