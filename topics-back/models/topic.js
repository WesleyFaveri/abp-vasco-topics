"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    static associate(models) {
      models.Topic.belongsTo(models.User);
    }
  }
  Topic.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      tags: DataTypes.STRING,
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Topic",
    }
  );
  return Topic;
};
