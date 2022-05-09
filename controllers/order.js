const Order = require('../models/order');

module.exports.orderExists = (params) => {
  return Order.find({ email: params.email })
    .then(result => {
      return result.length > 0 ? true : false;
    });
};

module.exports.addOrder = (params) => {
  return Order.findById(params.orderId)
    .then(order => {
      return order;
    });
};

module.exports.getOrder = (params) => {
  return Order.findById(params.orderId)
    .then(order => {
      return order;
    });
};

module.exports.editOrder = (params) => {
  return Order.updateById(params)
    .then(order => {
      return order;
    });
};

module.exports.deleteOrder = (params) => {
  return Order.delete(params.orderId)
    .then(order => {
      return order;
    });
};
