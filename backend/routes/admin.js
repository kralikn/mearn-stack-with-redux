const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const validateTopicInput = require('../validation/topic');
const validateTaskInput = require('../validation/task');

// Load Admin model
const Admin = require('../models/Admin');

// Load Topic model
const Topic = require('../models/Topic');

// Load Task model
const Task = require('../models/Task');

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

  const { errors, isValid } = validateTopicInput(req.body);

  // Check Validation
  if (!isValid) {
    errors.placeholder = req.body.title;
    return res.status(400).json(errors);
  }

  if(req.body.id){
    Topic.findOne({ _id: req.body.id })
    .then(topic => {
      if(topic){
        // console.log(topic)

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
          .catch(err => res.json(err));
      }
    });
  }

});

// @route   POST /task
// @desc    Create new task
// @access  Private
router.post('/task', passport.authenticate('jwt', { session: false }), (req, res) => {
  
  // console.log(req.user)
  console.log(req.body)

  if(req.body.taskid){
    console.log("update")
    //update
    Topic.findOne({ _id: req.body.topicid })
    .then(topic => {
      // console.log(topic)
      if(topic){

        Topic.findOneAndUpdate(

          { _id: req.body.topicid, "tasks._id": req.body.taskid },
          { $set: { "tasks.$.title": req.body.title } },
          { new: true }
        )
        .then(topic => {
          console.log(topic)
          let newTask;
          topic.tasks.map(task => {
            if(String(task._id) === req.body.taskid){
              newTask = task
            }
          })
          // let newTask = topic.tasks.find(task => String(task._id === req.body.taskid))
          res.send({
            task: newTask,
            topic: topic})
        })
        .catch(error => console.log(error))
      }
    })
      .catch(error => console.log(error))
    

  }else{
    console.log("create")
    //create
    Topic.findOne({ _id: req.body.id })
    .then(topic => {

      const newTask = {
        title: req.body.title
      }

      // Add to exp array
      topic.tasks.push(newTask);

      topic
        .save()
        .then(topic => res.json(topic))
        .catch(error => res.send(error))
    })
    .catch(err => res.send(err));
  }

  // const { errors, isValid } = validateTaskInput(req.body);

  // // Check Validation
  // if (!isValid) {
  //   // Return any errors with 400 status
  //   return res.status(400).json(errors);
  // }

  // Topic.findOne({ _id: req.body.id })
  //   .then(topic => {

  //     const newTask = {
  //       title: req.body.title
  //     }

  //     // Add to exp array
  //     topic.tasks.push(newTask);

  //     topic
  //       .save()
  //       .then(topic => res.json(topic))
  //       .catch(error => res.send(error))
  //   })
  //   .catch(err => res.send(err));


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
        res.json({ success: true, id: req.body.id })
    })
    .catch(error => {
      res.send(error)
    })

});

// @route   UPDATE /task
// @desc    Update task
// @access  Private
// router.post('/task', passport.authenticate('jwt', { session: false }), (req, res) => {
  
  // Topic.findOne({ _id: req.body.topicid})
  //   .then(topic => {
  //     if (topic) {

  //       Topic.findOneAndUpdate(
  //         {_id: req.body.topicid},
  //         { $pull: { tasks: { _id: req.body.taskid }}},
  //         { new: true }
  //       )
  //       .then(topic => res.send(topic))
  //       .catch(err => res.send(err))

  //     }
  //   })
  //   .catch(err => res.send(err))

// });

// @route   DELETE /task
// @desc    Delete task
// @access  Private
router.delete('/task', passport.authenticate('jwt', { session: false }), (req, res) => {
  
  Topic.findOne({ _id: req.body.topicid})
    .then(topic => {
      if (topic) {

        Topic.findOneAndUpdate(
          {_id: req.body.topicid},
          { $pull: { tasks: { _id: req.body.taskid }}},
          { new: true }
        )
        .then(topic => res.send(topic))
        .catch(err => res.send(err))

      }
    })
    .catch(err => res.send(err))

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