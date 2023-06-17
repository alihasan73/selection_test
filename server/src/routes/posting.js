const express = require("express");
const { fileUploader } = require("../middlewares/multer");
const router = express.Router();
const postController = require("../controllers").postController;

router.get("/", postController.getAllUser);
router.post(
	"/newPost",
	fileUploader({
		destinationFolder: "posting",
	}).single("posting"),
	postController.createNewPost
);
router.patch(
	"/:id",
	fileUploader({
		destinationFolder: "posting",
	}).single("posting"),
	postController.editPosting
);
router.delete("/:id", postController.deletePosting);

module.exports = router;
