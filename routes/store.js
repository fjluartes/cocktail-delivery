const express = require('express');
const router = express.Router();
const StoreController = require('../controllers/store');
const auth = require('../auth');

router.post('/store-exists', (req, res) => {
  StoreController.storeExists(req.body)
    .then(result => res.send(result));
});

router.post('/add', (req, res) => {
  StoreController.addStore(req.body)
    .then(result => res.send(result));
});

router.get('/details', auth.verify, (req, res) => {
  StoreController.getStore({ storeId: req.body.storeId })
    .then(store => res.send(store));
});

router.put('/edit', auth.verify, (req, res) => {
  StoreController.editStore(req.body)
    .then(result => res.send(result));
});

router.delete('/delete', (req, res) => {
  StoreController.deleteStore(req.body)
    .then(result => res.send(result));
});

module.exports = router;
