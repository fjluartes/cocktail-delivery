const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'userId is required']
  },
  userName: {
    type: String,
    required: [true, 'User name is required']
  },
  address: {
    type: String,
    required: [true, 'address is required']
  },
  contactNo: {
    type: String,
    required: [true, 'contact details is required']
  },
  storeId: {
    type: String,
    required: [true, 'storeId is required']
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
      price: {
        type: Number,
        required: [true, 'item price is required']
      },
      quantity: {
        type: Number,
        required: [true, 'item quantity is required']
      },
    }
  ],
  total: {
    type: Number,
    required: [true, 'order total is required']
  },
  createdOn: {
    type: Date,
    default: new Date()
  },
  updatedOn: {
    type: Date,
    default: new Date()
  },
  status: {
    type: String,
    default: 'active'
  },
  isActive: {
    type: Boolean,
    default: true
  },
});

module.exports = mongoose.model('Order', orderSchema);
