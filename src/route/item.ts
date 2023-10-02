import express from "express";

const router = express.Router();
const controller = require("../controller/item");
const auth = require("../middelware/auth");

router.get("/", auth, controller.getItems);
router.post("/", controller.createItem);

module.exports = router;
