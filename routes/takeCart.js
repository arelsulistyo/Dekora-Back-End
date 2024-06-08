const express = require("express");
const router = express.Router();
const takeCartController = require("../controllers/takeCartController");

router.get("/user/:userId", takeCartController.getUserCart);

module.exports = router;
