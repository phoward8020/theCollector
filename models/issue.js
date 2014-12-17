"use strict";

module.exports = function(sequelize, DataTypes) {
  var issue = sequelize.define("issue", {
    api_id: DataTypes.INTEGER,
    api_id_volume: DataTypes.INTEGER,
    api_detail_url: DataTypes.STRING,
    issue_number: DataTypes.INTEGER,
    name: DataTypes.STRING,
    aliases: DataTypes.TEXT,
    date_cover: DataTypes.DATE,
    date_store: DataTypes.DATE,
    deck: DataTypes.TEXT,
    description: DataTypes.TEXT,
    image_url_tiny: DataTypes.STRING,
    image_url_icon: DataTypes.STRING,
    image_url_thumb: DataTypes.STRING,
    image_url_small: DataTypes.STRING,
    image_url_medium: DataTypes.STRING,
    image_url_super: DataTypes.STRING,
    image_url_screen: DataTypes.STRING,
    date_added: DataTypes.DATE,
    date_updated: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return issue;
};
