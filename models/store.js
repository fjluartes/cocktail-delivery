const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  address: {
    type: String,
    required: [true, 'address is required']
  },
  contactNo: {
    type: String,
    required: [true, 'contact details is required']
  },
  clientId: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: new Date()
  },
  updatedOn: {
    type: Date,
    default: new Date()
  },
  menu: [
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
      }
    }
  ],
  orders: [
    {
      orderId: {
        type: String
      },
      createdOn: {
        type: Date,
        default: new Date()
      },
      status: {
        type: String,
        default: 'Active'
      }
    }
  ],
  isActive: {
    type: Boolean,
    default: true
  },
});

module.exports = mongoose.model('Store', storeSchema);
