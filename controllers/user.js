const User = require('../models/user');
const auth = require('../auth');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.emailExists = (params) => {
  return User.find({ email: params.email })
    .then(result => {
      return result.length > 0 ? true : false;
    });
};

module.exports.register = (params) => {
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
};

module.exports.login = (params) => {
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
};

module.exports.get = (params) => {
  return User.findById(params.userId)
    .then(user => {
      user.password = undefined; // block password on display
      return user;
    });
};
