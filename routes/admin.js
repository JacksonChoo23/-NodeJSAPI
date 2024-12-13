const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

// CRUD Operations for Listings
router.get('/listings', auth, adminController.getListings);
router.post('/listings', auth, adminController.createListing);
router.put('/listings/:id', auth, adminController.updateListing);
router.delete('/listings/:id', auth, adminController.deleteListing);

module.exports = router;
