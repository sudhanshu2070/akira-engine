exports.getAllUsers = (req, res) => {
  res.json({ message: 'Get all users' });
};

exports.createUser = (req, res) => {
  const userData = req.body;
  res.status(201).json({ message: 'User created', data: userData });
};