const {
  fetchAllUsers,
  findUserByUsername,
  filterUsersByCity
} = require('../services/testWithSampleData');

async function getAllUsers(req, res) {
  try {
    const users = await fetchAllUsers();
    res.json(users);
  } catch {
    res.status(500).json({ message: 'Error fetching users' });
  }
}

async function getFirstUserByUsername(req, res) {
  try {
    const { username } = req.query;
    if (!username) return res.status(400).json({ message: 'Username is required' });

    const user = await findUserByUsername(username);
    if (user) res.json(user);
    else res.status(404).json({ message: 'User not found' });
  } catch {
    res.status(500).json({ message: 'Error finding user' });
  }
}

async function filterUsersByCityController(req, res) {
  try {
    const { city } = req.query;
    if (!city) return res.status(400).json({ message: 'City is required' });

    const users = await filterUsersByCity(city);
    res.json(users);
  } catch {
    res.status(500).json({ message: 'Error filtering users' });
  }
}

module.exports = {
  getAllUsers,
  getFirstUserByUsername,
  filterUsersByCityController
};