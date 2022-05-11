const User = require('../models/user');
const auth = require('../auth');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.emailExists = (params) => {
  try {
    return User.find({ email: params.email })
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
    const user = new User({
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      password: hash,
      isAdmin: false,
    });
    return user.save()
      .then((user, err) => {
        return (err) ? false : true;
      });
  } catch (err) {
    return { error: err };
  }
};

module.exports.login = (params) => {
  try {
    return User.findOne({ email: params.email })
      .then(user => {
        if (user === null) return false;
        const isPasswordMatched = bcrypt.compareSync(params.password, user.password);
        if (isPasswordMatched) {
          return { access: auth.createAccessToken(user.toObject()) };
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
    return User.findById(params.userId)
      .then(user => {
        user.password = undefined; // block password on display
        return user;
      });
  } catch (err) {
    return { error: err };
  }
};
