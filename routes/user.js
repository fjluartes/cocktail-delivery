const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const auth = require('../auth');

router.post('/register', (req, res) => {
  UserController.register(req.body)
    .then(result => res.send(result));
});

router.post('/email-exists', (req, res) => {
  UserController.emailExists(req.body)
    .then(result => res.send(result));
});

router.post('/login', (req, res) => {
  UserController.login(req.body)
    .then(result => res.send(result));
});

router.get('/details', auth.verify, (req, res) => {
  const user = auth.decode(req.headers.authorization);
  UserController.get({ userId: user.id })
    .then(user => res.send(user));
});

module.exports = router;
