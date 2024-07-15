const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersControllers');

router.post('/register',usersController.register )
router.post('/login',usersController.login )
router.get('/:id',usersController.getUser )

module.exports = router;