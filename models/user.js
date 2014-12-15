"use strict";

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    name_first: DataTypes.STRING,
    name_last: DataTypes.STRING,
    name_alias: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    location: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return user;
};
