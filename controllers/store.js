const Store = require('../models/store');

module.exports.storeExists = (params) => {
  return Store.find({ email: params.email })
    .then(result => {
      return result.length > 0 ? true : false;
    });
};

module.exports.addStore = (params) => {
  const store = new Store({
    name: params.name,
    address: params.address,
    contactNo: params.contactNo,
    clientId: params.clientId,
    menu: params.menu
  });

  return store.save().then((user, err) => {
    return (err) ? false : true;
  });
};

module.exports.getStore = (params) => {
  return Store.findById(params.storeId)
    .then(store => {
      return store;
    });
};

module.exports.editStore = (params) => {
  return Store.updateById(params)
    .then(store => {
      return store;
    });
};

module.exports.deleteStore = (params) => {
  return Store.delete(params.storeId)
    .then(store => {
      return store;
    });
};
