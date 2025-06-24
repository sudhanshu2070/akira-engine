const users = [
    { id: 1, name: 'Naruto Uzumaki', salary: 50000 },
    { id: 2, name: 'Sasuke Uchiha', salary: 52000 },
    { id: 3, name: 'Sakura Haruno', salary: 48000 },
    { id: 4, name: 'Kakashi Hatake', salary: 70000 },
    { id: 5, name: 'Shikamaru Nara', salary: 55000 },
    { id: 6, name: 'Hinata Hyuga', salary: 47000 },
    { id: 7, name: 'Rock Lee', salary: 46000 },
    { id: 8, name: 'Neji Hyuga', salary: 49000 },
    { id: 9, name: 'Tenten', salary: 45000 },
    { id: 10, name: 'Ino Yamanaka', salary: 47000 },
    { id: 11, name: 'Choji Akimichi', salary: 46000 },
    { id: 12, name: 'Kiba Inuzuka', salary: 45500 },
    { id: 13, name: 'Shino Aburame', salary: 46500 },
    { id: 14, name: 'Gaara', salary: 68000 },
    { id: 15, name: 'Temari', salary: 50000 },
    { id: 16, name: 'Kankuro', salary: 49500 },
    { id: 17, name: 'Tsunade', salary: 90000 }
];

exports.getAllUsers = (req, res) => {
    // const data = users.filter(map => map.id < 10); // This will return all users with id < 10
    const data = users.find(map => map.id < 10); // This will return the first user with id < 10
    res.json({ data});
};

exports.getUserById = (req, res) => {
  const userId = parseInt(req.params.id);   
    const user = users.find(map => map.id === userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({ data: user });
}

exports.createUser = (req, res) => {
  const userData = req.body;
  res.status(201).json({ message: 'User created', data: userData });
};