exports.jwt = {
	secret: process.env.JWT_SECRET,
	algorithm: process.env.JWT_ALGORITHM
};

exports.jawsdb = {
	username: process.env.JAWSDB_USERNAME,
	password: process.env.JAWSDB_PASSWORD,
	database: process.env.JAWSDB_DATABASE,
	host: process.env.JAWSDB_HOST
}