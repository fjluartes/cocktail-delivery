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
  StoreController.add(req.body)
    .then(result => res.send(result));
});

router.get('/', auth.verify, (req, res) => {
  const client = auth.decode(req.headers.authorization);
  const clientId = client.id;
  StoreController.getAllByClient({ clientId })
    .then(stores => {
      let activeStores = stores.filter(store => store.isActive === true);
      res.send(activeStores);
    });
});

router.get('/:storeId', auth.verify, (req, res) => {
  StoreController.get({ storeId: req.params.storeId })
    .then(store => res.send(store));
});

router.put('/edit', auth.verify, (req, res) => {
  StoreController.edit(req.body)
    .then(result => res.send(result));
});

router.put('/delete/:storeId', auth.verify, (req, res) => {
  StoreController.archive({ storeId: req.params.storeId })
    .then(result => res.send(result));
});

module.exports = router;
