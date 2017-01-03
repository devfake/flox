'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("file_histories", "added")
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("file_histories", "added", Sequelize.DATE)
  }
};
