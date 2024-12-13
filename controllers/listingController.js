const listingModel = require('../models/listingModel');

exports.getListings = async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    const listings = await listingModel.findListingsByUser(req.session.user.id, latitude, longitude);
    res.send({
      status: 200,
      message: 'Success',
      result: {
        current_page: 1,
        data: listings,
      },
    });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
};
