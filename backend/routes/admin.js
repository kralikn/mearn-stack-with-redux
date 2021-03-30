const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const validateTopicInput = require('../validation/topic');

// Load Admin model
const Admin = require('../models/Admin');

// Load Topic model
const Topic = require('../models/Topic');

// @route   POST /login
// @desc    Login admin
// @access  Public
router.post('/', (req, res) => {

   const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const name = req.body.name;
  const password = req.body.password;

  // Find user by name
  Admin.findOne({ name }).then(admin => {
    // Check for admin
    if (!admin) {
      errors.name = 'Ilyen admin még nincs regisztrálva';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, admin.password).then(isMatch => {
      if (isMatch) {

        // res.json({msg: 'Sikeres belépés'})

        // User Matched
        const payload = { id: admin.id, name: admin.name, isAdmin: admin.isAdmin}; // Create JWT Payload
        const secretOrKey = process.env.secretOrKey;

        // Sign Token
        jwt.sign(
          payload,
          secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
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

// @route   POST /register
// @desc    Register admin
// @access  Public
router.post('/register', (req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Admin.findOne({ name: req.body.name }).then(admin => {
    if (admin) {
      errors.name = 'Ez az admin már regisztrálva van';
      return res.status(400).json(errors);
    } else {

      const newAdmin = new Admin({
        name: req.body.name,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) throw err;
          newAdmin.password = hash;
          newAdmin
            .save()
            .then(admin => res.json(admin))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST /topic
// @desc    Create new topic
// @access  Private
router.post('/topic', passport.authenticate('jwt', { session: false }), (req, res) => {

  console.log(req.body)

  // let errors = {};

  const { errors, isValid } = validateTopicInput(req.body);

  // // Check Validation
  if (!isValid) {
    errors.placeholder = req.body.title;
    return res.status(400).json(errors);
  }

  if(req.body.id){
    Topic.findOne({ _id: req.body.id })
    .then(topic => {
      if(topic){
        console.log(topic)
        Topic.findOneAndUpdate(
          {_id: req.body.id },
          {title: req.body.title },
          { new: true }
        )
        .then(topic => {
          console.log(topic)
          res.json(topic)
        })
        .catch(err => res.json(err))
      }
    })
  }else {
    Topic.findOne({ title: req.body.title }).then(topic => {
      if (topic) {
        errors.msg = 'Ez már egy létező témakör';
        errors.placeholder = req.body.title;
        console.log(errors)
        return res.status(400).json(errors);
      } else {
  
        const newTopic = new Topic({
          title: req.body.title,
        });
  
        newTopic
          .save()
          .then(topic => res.json(topic))
          .catch(err => console.log(err));
      }
    });
  }

});


// @route   GET /all topic
// @desc    get all topic
// @access  Private
router.get('/topics', passport.authenticate('jwt', { session: false }), (req, res) => {

  Topic.find({})
    .then(topics => {
      res.send(topics)
    })
    .catch(error => {
      res.send(error)
    })
});

// @route   DELETE /topic
// @desc    Delete topic
// @access  Private
router.delete('/topic', passport.authenticate('jwt', { session: false }), (req, res) => {

  console.log(req.body)

  Topic.findOneAndRemove({ _id: req.body.id })
    .then(() => {
      // User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
    })
    .catch(error => {
      res.send(error)
    })
  
        // res.json({ success: true })


    // });

  // let errors = {};

  // Topic.findOne({ title: req.body.title }).then(topic => {
  //   if (topic) {
  //     errors.name = 'Ez a topic már létre van hozva';
  //     console.log(errors)
  //     // return res.status(400).json(errors);
  //     return res.json(errors);
  //   } else {

  //     const newTopic = new Topic({
  //       title: req.body.title,
  //     });

  //     newTopic
  //       .save()
  //       .then(topic => res.json(topic))
  //       .catch(err => console.log(err));
  //   }
  // });
});

// @route   GET /admin/current
// @desc    Return current admin
// @access  Private
// router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
//     res.json({
//       id: req.user.id,
//       name: req.user.name,
//     });
//   }
// );

module.exports = router;