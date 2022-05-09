const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order');
const auth = require('../auth');

router.post('/order-exists', (req, res) => {
  OrderController.orderExists(req.body)
    .then(result => res.send(result));
});

router.post('/add', (req, res) => {
  OrderController.addOrder(req.body)
    .then(result => res.send(result));
});

router.get('/details', auth.verify, (req, res) => {
  OrderController.getOrder({ orderId: req.body.orderId })
    .then(order => res.send(order));
});

router.put('/edit', auth.verify, (req, res) => {
  OrderController.editOrder(req.body)
    .then(result => res.send(result));
});

router.delete('/delete', (req, res) => {
  OrderController.deleteOrder(req.body)
    .then(result => res.send(result));
});

module.exports = router;
