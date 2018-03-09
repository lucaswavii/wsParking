var mysql = require('mysql');

var connMysql = function() {

	return mysql.createConnection({
		host : 'localhost',
		user: 'root',
		password: '123456',
		database: 'wsparking'
	});
	
}

module.exports = function(){
	return connMysql;
}
