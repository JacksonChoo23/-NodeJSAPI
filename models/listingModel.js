const db = require('../config/db');

exports.findListingsByUser = async (userId, latitude, longitude) => {
  const [rows] = await db.execute(`
    SELECT id, name, 
    ROUND(
      6371 * acos(
        cos(radians(?)) * cos(radians(latitude)) * 
        cos(radians(longitude) - radians(?)) + 
        sin(radians(?)) * sin(radians(latitude))
      ), 2
    ) AS distance, created_at, updated_at
    FROM listings
    WHERE user_id = ?
    ORDER BY distance ASC
  `, [latitude, longitude, latitude, userId]);

  return rows;
};
