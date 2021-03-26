const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
// const cors = require('cors')
 
const app = express();
// app.use(cors())

require('dotenv').config();

const admin = require('./routes/admin');
const users = require('./routes/users');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Connect to MongoDB
const URI = process.env.mongoURI
mongoose
  .connect(URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passportUser')(passport);
require('./config/passportAdmin')(passport);

// Use Routes
app.use('/admin', admin);
app.use('/', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
