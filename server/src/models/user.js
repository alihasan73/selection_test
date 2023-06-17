module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("users", {
		fullname: Sequelize.STRING,
		username: Sequelize.STRING,
		email: Sequelize.STRING,
		avatar_url: {
			type: Sequelize.STRING,
			defaultValue: null,
		},
		status: {
			type: Sequelize.ENUM("Verify", "Unverify"),
			defaultValue: "Unverify",
		},
		password: Sequelize.STRING,
	});
	return User;
};
