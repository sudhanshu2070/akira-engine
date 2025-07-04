const express = require('express');
const {
  getAllUsers,
  getFirstUserByUsername,
  filterUsersByCityController
} = require('../controllers/testWithSampleData.controller');

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/first', getFirstUserByUsername);
router.get('/users/filter', filterUsersByCityController);

module.exports = router;