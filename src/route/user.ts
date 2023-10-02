import express from "express";

const router = express.Router();
const controller = require("../controller/user");
const auth = require("../middelware/auth");

router.get("/", auth, controller.getUsers);
router.post("/", controller.register);
router.post("/login", controller.login);
router.post("/deposit", auth, controller.deposit);

module.exports = router;
