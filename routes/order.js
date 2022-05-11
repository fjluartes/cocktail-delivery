const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order');
const auth = require('../auth');

router.post('/order-exists', (req, res) => {
  OrderController.orderExists(req.body)
    .then(result => res.send(result));
});

router.post('/add', auth.verify, (req, res) => {
  const user = auth.decode(req.headers.authorization);
  req.body.userId = user.id;
  OrderController.add(req.body)
    .then(result => res.send(result));
});

router.get('/', auth.verify, (req, res) => {
  OrderController.getAll()
    .then(orders => res.send(orders));
});

router.get('/:orderId', auth.verify, (req, res) => {
  OrderController.get({ orderId: req.params.orderId })
    .then(order => res.send(order));
});

router.put('/edit', auth.verify, (req, res) => {
  OrderController.edit(req.body)
    .then(result => res.send(result));
});

router.put('/delete', (req, res) => {
  OrderController.archive(req.body)
    .then(result => res.send(result));
});

module.exports = router;
