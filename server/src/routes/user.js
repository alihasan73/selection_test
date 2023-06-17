const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;

router.get("/", userController.getAllUser);
router.post("/", userController.Register);
router.get("/login", userController.Login);
// login with barer
router.get(
	"/token",
	userController.getTokenLogin,
	userController.getUserByTokenLogin
);
router.get("/one", userController.getOne);

// forget password
router.get("/forgetPass", userController.generateTokenByEmail);
// validate token
router.get(
	"/auth",
	userController.validateToken,
	userController.getUserFromValidatedToken
);

router.patch(
	"/changepass",
	userController.validateToken,
	userController.changePassword
);

module.exports = router;
