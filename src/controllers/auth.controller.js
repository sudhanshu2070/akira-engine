const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = []; // in-memory storage
const SECRET_KEY = 'supersecretkey';

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const existing = users.find(u => u.username === username);
  if (existing) return res.status(409).send('User already exists');

  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  res.status(201).send('User registered');
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).send('Invalid credentials');

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).send('Invalid credentials');

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
};

exports.getProfile = (req, res) => {
  res.json({ user: req.user });
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};