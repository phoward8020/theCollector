"use strict";

var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {

  var user = sequelize.define("user", {
    name_first: {
        type: DataTypes.STRING,
        validate: {
            notNull: {
              args: true, 
              msg: "First Name, Please?"
            }
        }
    },
    name_last: {
        type: DataTypes.STRING,
        validate: {
            notNull: {
              args: true, 
              msg: "Last Name, Please?"
            }
        }
     },
    name_alias: {
        type: DataTypes.STRING
     },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: {
              args: true, 
              msg: "Please Enter a Valid Email Address"
            }
        }
    },
    password: {
        type: DataTypes.TEXT,
        validate: {
            len: {
              args: [5, 200],
              msg: "Password must be between 5 and 200 characters long."
            }
        }
    },
    location: {
        type: DataTypes.STRING
    },
    bio: {
        type: DataTypes.TEXT
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    hooks: {
      beforeCreate: function(data, garbage, callback) {
        var passwordToEncrypt = data.password;
        bcrypt.hash(passwordToEncrypt, 10, function(err, hash) {
          data.password = hash;
          callback(null, data);
        })
      }
    }
  });

  return user;
};
