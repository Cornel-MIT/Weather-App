const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const User = require('../models/User');
const router = express.Router();

// app.use(cors());
// app.use(bodyParser.json());

// app.use('/api/users', userRoutes);

// sequelize.sync()
//   .then(() => {
//     console.log('Database connected!');
//     app.listen(4000, () => console.log('Server running on port 4000'));
//   })
//   .catch(err => console.log(err));

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log('Registering user:', username);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ error: 'User registration failed' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log('Logging in user:', username);
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;