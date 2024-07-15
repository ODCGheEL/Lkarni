const express = require('express');
const router = express.Router();

const Auth = require("../middlewares/Auth")

const lkiridiControllers = require('../controllers/lkridiControllers');

router.post("/", Auth.authenticate,lkiridiControllers.createLkridi)
router.get("/", Auth.authenticate,lkiridiControllers.getLkridi)
router.get("/:id", Auth.authenticate,lkiridiControllers.getLkridiById)
router.put("/:id", Auth.authenticate,lkiridiControllers.updateLkridi)
router.delete("/:id", Auth.authenticate,lkiridiControllers.deleteLkridi)

module.exports = router;