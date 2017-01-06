'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("file_histories", "tv_title")
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("file_histories", "tv_title", Sequelize.STRING, { allowNull: true })
  }
};
