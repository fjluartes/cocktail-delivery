const Client = require('../models/client');
const auth = require('../auth');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.emailExists = (params) => {
  try {
    return Client.find({ email: params.email })
      .then(result => {
        return result.length > 0 ? true : false;
      });
  } catch (err) {
    return { error: err };
  }
};

module.exports.register = (params) => {
  try {
    const hash = bcrypt.hashSync(params.password, saltRounds);
    const client = new Client({
      name: params.name,
      email: params.email,
      contactNo: params.contactNo,
      password: hash,
    });
    return client.save()
      .then((client, err) => {
        return (err) ? false : true;
      });
  } catch (err) {
    return { error: err };
  }
};

module.exports.login = (params) => {
  try {
    return Client.findOne({ email: params.email })
      .then(client => {
        if (client === null) return false;
        const isPasswordMatched = bcrypt.compareSync(params.password, client.password);
        if (isPasswordMatched) {
          return { access: auth.createAccessToken(client.toObject()) };
        }
        else {
          return false;
        }
      });
  } catch (err) {
    return { error: err };
  }
};

module.exports.get = (params) => {
  try {
    return Client.findById(params.clientId)
      .then(client => {
        client.password = undefined; // block password on display
        return client;
      });
  } catch (err) {
    return { error: err };
  }
};
