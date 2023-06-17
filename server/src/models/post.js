module.exports = (sequelize, Sequelize) => {
	const Post = sequelize.define("Posts", {
		deskripsi: Sequelize.STRING,
		image_url: Sequelize.STRING,
	});
	return Post;
};
