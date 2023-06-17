const db = require("../models");
const bcrypt = require("bcrypt");
const moment = require("moment");
const { Op } = require("sequelize");
const { nanoid } = require("nanoid");
const postImage = process.env.IMAGE_POST_URL;

const postController = {
	getAllUser: async (req, res) => {
		try {
			const user = await db.Post.findAll();
			return res.send(user);
		} catch (error) {
			res.status(500).send({
				message: error.message,
			});
		}
	},
	createNewPost: async (req, res) => {
		try {
			const { deskripsi } = req.body;
			const { filename } = req.file;
			const pr = await db.Post.create({
				deskripsi,
				image_url: postImage + filename,
			});
			return res.send({ message: "success added new product" });
		} catch (error) {
			console.log(err.message);
			return res.status(500).send(err.message);
		}
	},
	editPosting: async (req, res) => {
		try {
			const { deskripsi } = req.body;
			const { filename } = req.file;
			await db.Post.update(
				{
					deskripsi,
					image_url: postImage + filename,
				},
				{
					where: {
						id: req.params.id,
					},
				}
			).then((result) => res.send(result));
		} catch (error) {
			console.log(err.message);
			return res.status(500).send({ message: err.message });
		}
	},
	deletePosting: async (req, res) => {
		await db.Post.destroy({
			where: {
				id: req.params.id,
			},
		});
		return res.send({ message: "success deleted" });
	},
};

module.exports = postController;
