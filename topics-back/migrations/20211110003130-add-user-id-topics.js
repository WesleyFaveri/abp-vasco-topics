"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          "Topics",
          "UserId",
          {
            type: Sequelize.DataTypes.INTEGER,
          },
          { transaction: t }
        ),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([queryInterface.removeColumn("Topics", "UserId", { transaction: t })]);
    });
  },
};
