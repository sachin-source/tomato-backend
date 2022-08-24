const express = require('express');
const { authenticate } = require('../services/comman');
const router = express.Router();

const userRoutes = require("./user.router");

/** GET /health-check - Check service health */


// mount user routes at /users
router.use('/user', userRoutes);

module.exports = router;