const db = require("../models");
const bcrypt = require("bcrypt");
const moment = require("moment");
const { Op } = require("sequelize");
const { nanoid } = require("nanoid");
// const user = require("../models/user");

const userController = {
	getAllUser: async (req, res) => {
		try {
			const user = await db.User.findAll();
			return res.send(user);
		} catch (error) {
			res.status(500).send({
				message: error.message,
			});
		}
	},
	Register: async (req, res) => {
		try {
			const { fullname, email, password, username } = req.body;
			const halfPassword = await bcrypt.hash(password, 10);
			const newUser = await db.User.create({
				fullname,
				email,
				username,
				password: halfPassword,
			});
			res.send({
				message: "register berhasil",
				data: newUser,
			});
		} catch (error) {
			res.status(500).send({
				message: error.message,
			});
		}
	},
	Login: async (req, res) => {
		try {
			const { emna, password } = req.query;
			const user = await db.User.findOne({
				where: {
					[Op.or]: [{ username: emna }, { email: emna }],
				},
			});
			if (user) {
				const match = await bcrypt.compare(password, user.dataValues.password);
				if (match) {
					const payload = {
						id: user.dataValues.id,
					};
					const generateToken = nanoid();
					const token = await db.Token.create({
						expired: moment().add(1, "days").format(),
						token: generateToken,
						payload: JSON.stringify(payload),
						valid: true,
						status: "LOGIN",
					});
					console.log(token);
					return res.send({
						message: "login berhasil",
						value: user,
						token: token.dataValues.token,
					});
				} else {
					throw new Error("login gagal");
				}
			} else {
				return res.send({
					message: "login gagal",
				});
			}
		} catch (error) {
			res.status(500).send({
				message: error.message,
			});
		}
	},
	getTokenLogin: async (req, res, next) => {
		try {
			let token = req.headers.authorization;
			// let token = req.headers.authorization;
			token = token.split(" ")[1];
			console.log(token);
			let p = await db.Token.findOne({
				where: {
					[Op.and]: [
						{
							token,
						},
						{
							expired: {
								// [Op.gt]: moment("00:00:00", "hh:mm:ss").format(),
								// [Op.lte]: moment().add(1, "d").format(),
								[Op.gt]: moment("00:00:00", "HH:mm:ss").utc().format(),
								[Op.lte]: moment().utc().add(1, "d").format(),
							},
						},
						{
							valid: true,
						},
					],
				},
			});
			console.log(p.dataValues);
			if (!p) {
				throw new Error("Token has expired");
			}
			// console.log(p.dataValues.payload);
			let user = await db.User.findOne({
				where: {
					id: JSON.parse(p.dataValues.payload).id,
				},
			});
			delete user.dataValues.password;
			req.user = user;
			next();
		} catch (error) {
			return res.status(500).send({ message: error.message });
		}
	},
	getUserByTokenLogin: async (req, res) => {
		res.send(req.user);
	},
	getOne: async (req, res) => {
		try {
			const { username, email } = req.query;
			const user = await db.User.findOne({
				where: {
					[Op.and]: [{ username: username }, { email: email }],
				},
			});
			return res.send(user);
		} catch (error) {
			res.status(500).send({
				message: error.message,
			});
		}
	},
	validateToken: async (req, res, next) => {
		try {
			// let token = req.headers.authorization;
			const { token } = req.query;
			// token = token.split(" ")[1];
			console.log(token);
			let p = await db.Token.findOne({
				where: {
					token,
					expired: {
						[db.Sequelize.Op.gte]: moment().utc().format(),
					},
					valid: true,
				},
			});
			console.log(p);
			if (!p) {
				throw new Error("Token has expired");
			}

			let user = await db.User.findOne({
				where: {
					id: JSON.parse(p.dataValues.payload).id,
				},
			});

			// delete user.dataValues.password;

			req.user = user;
			next();
		} catch (error) {
			console.log(error);
			return res.status(500).send({ message: error.message });
		}
	},
	getUserFromValidatedToken: async (req, res) => {
		// res.send(req.user);
		res.send(req.user);
	},
	generateTokenByEmail: async (req, res) => {
		try {
			const { email } = req.query;
			const user = await db.User.findOne({
				where: {
					email,
				},
			});
			if (user.dataValues) {
				await db.Token.update(
					{
						valid: false,
					},
					{
						where: {
							payload: JSON.stringify({ id: user.dataValues.id }),
							status: "FORGOT-PASSWORD",
						},
					}
				);

				const generateToken = nanoid();
				const token = await db.Token.create({
					expired: moment().add(5, "minute").format(),
					token: generateToken,
					payload: JSON.stringify({ id: user.dataValues.id }),
					status: "FORGOT-PASSWORD",
				});

				return res.send({
					nav: "/forgot-password/" + token.dataValues.token,
				});
			} else {
				throw new Error("user not found");
			}
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},
	changePassword: async (req, res) => {
		try {
			// console.log(token);
			// let token = req.headers.authorization;
			// token = token.split(" ")[1];
			const { token } = req.query;

			const { password } = req.body.user;
			const { id } = req.user;

			console.log(password);
			console.log(id);

			const hashPassword = await bcrypt.hash(password, 10);

			await db.User.update(
				{
					password: hashPassword,
				},
				{
					where: {
						id,
					},
				}
			);

			await db.Token.update(
				{
					valid: false,
				},
				{
					where: {
						token,
					},
				}
			);

			res.send({
				message: "password berhasil diupdate",
			});
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},
};

module.exports = userController;
