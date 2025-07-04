const axios = require('axios');
const USERS_API = 'https://jsonplaceholder.typicode.com/users';

async function fetchAllUsers() {
  const { data } = await axios.get(USERS_API);
  return data;
}

async function findUserByUsername(username) {
  const users = await fetchAllUsers();
  return users.find(u => u.username.toLowerCase() === username.toLowerCase());
}

async function filterUsersByCity(city) {
  const users = await fetchAllUsers();
  return users.filter(u => u.address.city.toLowerCase() === city.toLowerCase());
}

module.exports = {
  fetchAllUsers,
  findUserByUsername,
  filterUsersByCity
};