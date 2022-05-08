const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/client');
const auth = require('../auth');

router.post('/register', (req, res) => {
  ClientController.register(req.body)
    .then(result => res.send(result));
});

router.post('/email-exists', (req, res) => {
  ClientController.emailExists(req.body)
    .then(result => res.send(result));
});

router.post('/login', (req, res) => {
  ClientController.login(req.body)
    .then(result => res.send(result));
});

router.get('/details', auth.verify, (req, res) => {
  const client = auth.decode(req.headers.authorization);
  ClientController.get({ clientId: client.id })
    .then(client => res.send(client));
});

// stores


module.exports = router;
