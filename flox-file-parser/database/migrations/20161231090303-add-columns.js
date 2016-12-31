'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("file_histories", "extension", Sequelize.STRING),
      queryInterface.addColumn("file_histories", "filename", Sequelize.TEXT),
      queryInterface.addColumn("file_histories", "name", Sequelize.TEXT),
      queryInterface.addColumn("file_histories", "year", Sequelize.INTEGER, { allowNull: true }),
      queryInterface.addColumn("file_histories", "tags", Sequelize.TEXT, { allowNull: true }),
      queryInterface.addColumn("file_histories", "episode_number", Sequelize.INTEGER, { allowNull: true }),
      queryInterface.addColumn("file_histories", "season_number", Sequelize.INTEGER, { allowNull: true }),
      queryInterface.addColumn("file_histories", "tv_title", Sequelize.TEXT, { allowNull: true }),
      queryInterface.addColumn("file_histories", "subtitles", Sequelize.TEXT, { allowNull: true })
    ])
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("file_histories", "extension"),
      queryInterface.removeColumn("file_histories", "filename"),
      queryInterface.removeColumn("file_histories", "name"),
      queryInterface.removeColumn("file_histories", "year"),
      queryInterface.removeColumn("file_histories", "tags"),
      queryInterface.removeColumn("file_histories", "episode_number"),
      queryInterface.removeColumn("file_histories", "season_number"),
      queryInterface.removeColumn("file_histories", "tv_title"),
      queryInterface.removeColumn("file_histories", "subtitles")
    ])

  }
};
