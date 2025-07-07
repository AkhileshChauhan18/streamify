const express = require('express');
const router = express.Router();
const { signin, login, signout } = require('../controllers/auth_controllers');
router.post("/signin",signin);
router.post("/login",login);
router.post("/signout",signout);

module.exports = router;