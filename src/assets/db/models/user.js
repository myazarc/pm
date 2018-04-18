'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};