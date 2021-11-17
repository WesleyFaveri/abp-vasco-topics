"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasMany(models.Topic);
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      password: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: "E-mail inválido",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
