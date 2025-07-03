const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = []; // In-memory storage
const SECRET_KEY = 'supersecretkey';

async function registerUser(req, res) {
  const { username, password } = req.body;
  const existingUser = users.find(u => u.username === username);
  if (existingUser) return res.status(409).send('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).send('User registered');
}

async function loginUser(req, res) {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).send('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).send('Invalid credentials');

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function getProfile(req, res) {
  res.json({ message: 'Welcome to your profile', user: req.user });
}

module.exports = {
  registerUser,
  loginUser,
  authenticateToken,
  getProfile
};