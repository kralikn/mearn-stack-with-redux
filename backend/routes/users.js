const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');


// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

// Load User model
const User = require('../models/User');

// @route   POST /register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    // console.log(errors)
    return res.status(404).json(errors);
  }

  User.findOne({ name: req.body.name }).then(user => {
    if (user) {
      errors.name = 'Ez a felhasználónév már regisztrálva van';
      return res.status(400).json(errors);
    } else {

      const newUser = new User({
        name: req.body.name,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });

});


// @route   POST /login
// @desc    Login user
// @access  Public
router.post('/login', (req, res) => {

   const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const name = req.body.name;
  const password = req.body.password;

  // Find user by name
  User.findOne({ name }).then(user => {
    // Check for user
    if (!user) {
      errors.name = 'Ilyen felhasználónév még nincs regisztrálva';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {

        // res.json({msg: 'Sikeres belépés'})

        // User Matched
        const payload = { id: user.id, name: user.name, isAdmin: user.isAdmin }; // Create JWT Payload
        const secretOrKey = process.env.secretOrKey;

        // console.log(payload)
        // console.log(user)

        // Sign Token
        jwt.sign(
          payload,
          secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
              // user
            });
          }
        );
      } else {
        errors.password = 'Helytelen jelszó';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET /current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
    });
  }
);

module.exports = router;