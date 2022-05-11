const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  email: {
    type: String,
    required: [true, 'email is required']
  },
  contactNo: {
    type: String,
    required: [true, 'contact details is required']
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  createdOn: {
    type: Date,
    default: new Date()
  },
  stores: [
    {
      storeId: {
        type: String
      }
    }
  ]
});

module.exports = mongoose.model('Client', clientSchema);
