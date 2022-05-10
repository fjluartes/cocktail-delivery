const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/item');
const auth = require('../auth');

router.get('/query', auth.verify, (req, res) => {
  ItemController.getByQuery(req.query)
    .then(item => res.send(item));
});

router.get('/filter', auth.verify, (req, res) => {
  ItemController.getByFilter(req.query)
    .then(result => res.send(result));
});

router.get('/lookup', auth.verify, (req, res) => {
  ItemController.getById(req.query)
    .then(result => res.send(result));
});

module.exports = router;
