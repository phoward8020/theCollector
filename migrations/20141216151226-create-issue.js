"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("issues", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      api_id: {
        type: DataTypes.INTEGER
      },
      api_id_volume: {
        type: DataTypes.INTEGER
      },
      api_detail_url: {
        type: DataTypes.STRING
      },
      issue_number: {
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      aliases: {
        type: DataTypes.TEXT
      },
      date_cover: {
        type: DataTypes.DATE
      },
      date_store: {
        type: DataTypes.DATE
      },
      deck: {
        type: DataTypes.TEXT
      },
      description: {
        type: DataTypes.TEXT
      },
      image_url_tiny: {
        type: DataTypes.STRING
      },
      image_url_icon: {
        type: DataTypes.STRING
      },
      image_url_thumb: {
        type: DataTypes.STRING
      },
      image_url_small: {
        type: DataTypes.STRING
      },
      image_url_medium: {
        type: DataTypes.STRING
      },
      image_url_super: {
        type: DataTypes.STRING
      },
      image_url_screen: {
        type: DataTypes.STRING
      },
      date_added: {
        type: DataTypes.DATE
      },
      date_updated: {
        type: DataTypes.DATE
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
    migration.dropTable("issues").done(done);
  }
};