const Store = require('../models/store');
const Client = require('../models/client');

module.exports.storeExists = (params) => {
  try {
    return Store.find({ email: params.email })
      .then(result => {
        return result.length > 0 ? true : false;
      });
  } catch (err) {
    return { error: err };
  }
};

module.exports.add = async (params) => {
  try {
    const store = new Store({
      name: params.name,
      address: params.address,
      contactNo: params.contactNo,
      clientId: params.clientId,
      menu: params.menu
    });
    return await store.save()
      .then(async (store, err) => {
        const client = await Client.findById(params.clientId);
        client.stores.push({
          storeId: store._id,
        });
        
        return (err) ? false : true;
      });
  } catch (err) {
    return { error: err };
  }
};

module.exports.getAllByClient = (params) => {
  try {
    return Store.find({ clientId: params.clientId })
      .then(stores => {
        return stores;
      });
  } catch (err) {
    return { error: err };
  }
};

module.exports.get = (params) => {
  try {
    return Store.findById(params.storeId)
      .then(store => {
        return store;
      });
  } catch (err) {
    return { error: err };
  }
};

module.exports.edit = (params) => {
  try {
    return Store.findByIdAndUpdate(params.storeId, params)
      .then((doc, err) => {
        return (err) ? false : true;
      });
  } catch (err) {
    return { error: err };
  }
};

module.exports.archive = (params) => {
  try {
    const updates = { isActive: false };
    return Store.findByIdAndUpdate(params.storeId, updates)
      .then((doc, err) => {
        return (doc === null) ? false : true;
      });
  } catch (err) {
    return { error: err };
  }
};
