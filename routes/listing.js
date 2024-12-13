const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const auth = require('../middleware/auth');

router.post('/get', auth, listingController.getListings);

module.exports = router;
