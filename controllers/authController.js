const userModel = require('../models/userModel');

exports.login = async (req, res) => {
  const { email, password } = req.query;

  try {
    // Fetch user from the database
    const user = await userModel.findByEmail(email);

    if (!user) {
      return res.status(401).send({ message: 'Invalid credentials.' });
    }

    // Check password (plain comparison since bcrypt is not used here)
    if (user.password !== password) {
      return res.status(401).send({ message: 'Invalid credentials.' });
    }

    // Check user role
    if (user.role_type !== 'a') {
      return res.status(403).send({ message: 'Access denied. Admins only.' });
    }

    // Set session data for authenticated user
    req.session.user = {
      id: user.id,
      role: user.role_type,
    };

    // Respond with success
    res.send({
      status: 200,
      message: 'Logged in',
      result: {
        user_id: user.id,
        role_type: user.role_type,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ message: 'Server error', error });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ message: 'Unable to log out.' });
    }
    res.send({ status: 200, message: 'Logged out.' });
  });
};
