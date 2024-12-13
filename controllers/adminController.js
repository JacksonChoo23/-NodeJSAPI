const db = require('../config/db');

exports.getListings = async (req, res) => {
  const [listings] = await db.execute('SELECT * FROM listings');
  res.send(listings);
};

exports.createListing = async (req, res) => {
  const { name, latitude, longitude } = req.body;
  await db.execute('INSERT INTO listings (name, latitude, longitude, user_id) VALUES (?, ?, ?, ?)', [
    name,
    latitude,
    longitude,
    req.session.user.id,
  ]);
  res.send({ message: 'Listing created' });
};

exports.updateListing = async (req, res) => {
  const { name, latitude, longitude } = req.body;
  const { id } = req.params;
  await db.execute('UPDATE listings SET name = ?, latitude = ?, longitude = ? WHERE id = ?', [
    name,
    latitude,
    longitude,
    id,
  ]);
  res.send({ message: 'Listing updated' });
};

exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await db.execute('DELETE FROM listings WHERE id = ?', [id]);
  res.send({ message: 'Listing deleted' });
};
