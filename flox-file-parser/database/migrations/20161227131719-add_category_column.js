'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("file_histories", "category", Sequelize.STRING)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("file_histories", "category")
  }
};
