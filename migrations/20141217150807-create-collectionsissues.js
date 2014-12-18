"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("collectionsissues", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      collectionId: {
        type: DataTypes.INTEGER
      },
      issueId: {
        type: DataTypes.INTEGER
      },
      issueRating: {
        type: DataTypes.INTEGER
      },
      issueCondition: {
        type: DataTypes.STRING
      },
      issueComment: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("collectionsissues").done(done);
  }
};