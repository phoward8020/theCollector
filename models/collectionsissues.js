"use strict";

module.exports = function(sequelize, DataTypes) {
  var collectionsissues = sequelize.define("collectionsissues", {
    collectionId: DataTypes.INTEGER,
    issueId: DataTypes.INTEGER,
    issueRating: DataTypes.INTEGER,
    issueCondition: DataTypes.STRING,
    issueComment: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return collectionsissues;
};
