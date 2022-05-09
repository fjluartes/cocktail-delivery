const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'userId is required']
  },
  orderDate: {
    type: Date,
    default: new Date()
  },
  items: [
    {
      itemId: {
        type: String,
        required: [true, 'itemId is required']
      },
      name: {
        type: String,
        required: [true, 'item name is required']
      },
      quantity: {
        type: Number,
        required: [true, 'item quantity is required']
      },
    }
  ],
  status: {
    type: String,
    default: 'Ordered'
  }
});

module.exports = mongoose.model('Order', orderSchema);
