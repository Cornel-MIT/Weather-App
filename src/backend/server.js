const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors()); 
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database connected!');
    app.listen(4000, () => console.log('Server running on port 4000'));
  })
  .catch(err => console.log(err));