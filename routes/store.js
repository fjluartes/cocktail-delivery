const express = require('express');
const router = express.Router();
const StoreController = require('../controllers/store');
const auth = require('../auth');

router.post('/store-exists', (req, res) => {
  StoreController.storeExists(req.body)
    .then(result => res.send(result));
});

router.post('/add', auth.verify, (req, res) => {
  const client = auth.decode(req.headers.authorization);
  req.body.clientId = client.id;
  StoreController.addStore(req.body)
    .then(result => res.send(result));
});

router.get('/', auth.verify, (req, res) => {
  StoreController.getStore({ storeId: req.body.storeId })
    .then(store => res.send(store));
});

router.put('/edit', auth.verify, (req, res) => {
  StoreController.editStore(req.body)
    .then(result => res.send(result));
});

router.delete('/delete', auth.verify, (req, res) => {
  StoreController.deleteStore(req.body)
    .then(result => res.send(result));
});

module.exports = router;
