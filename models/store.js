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
  menu: {
    type: Array,
    required: true
  },
  createdOn: {
    type: Date,
    default: new Date()
  },
  orders: {
    type: Array
  },
});

module.exports = mongoose.model('Store', storeSchema);
