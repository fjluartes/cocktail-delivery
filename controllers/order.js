const Order = require('../models/order');
const User = require('../models/user');
const Store = require('../models/store');

module.exports.orderExists = (params) => {
  try {
    return Order.find({ email: params.email })
      .then(result => {
        return result.length > 0 ? true : false;
      });
  } catch (err) {
    return { error: err };
  }
};

module.exports.add = async (params) => {
  try {
    const order = new Order({
      userId: params.userId,
      userName: params.userName,
      address: params.address,
      contactNo: params.contactNo,
      storeId: params.storeId,
      items: params.items,
      total: params.total
    });

    return await order.save().then(async (order, err) => {
      const user = await User.findById(params.userId);
      user.orders.push({
        orderId: order._id,
        status: order.status
      });
      const store = await Store.findById(params.storeId);
      store.orders.push({
        orderId: order._id,
        status: order.status
      });
      
      return (err) ? false : true;
    });
  } catch (err) {
    return { error: err };
  }
};

module.exports.getAll = () => {
  try {
    return Order.find()
      .then(order => {
        return order;
      });
  } catch (err) {
    return { error: err };
  }
};

module.exports.get = (params) => {
  try {
    return Order.findById(params.orderId)
      .then(order => {
        return order;
      });
  } catch (err) {
    return { error: err };
  }
};

module.exports.edit = (params) => {
  return Order.findByIdAndUpdate(params.orderId, params)
    .then((doc, err) => {
      return (err) ? false : true;
    });
};

module.exports.archive = (params) => {
  try {
    const updates = { isActive: false };
    return Order.findByIdAndUpdate(params.orderId, updates)
      .then((doc, err) => {
        return (doc === null) ? false : true;
      });
  } catch (err) {
    return { error: err };
  }
};
