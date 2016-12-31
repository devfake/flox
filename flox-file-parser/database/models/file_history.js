'use strict';
module.exports = function(sequelize, DataTypes) {
  var file_history = sequelize.define('file_history', {
    src: DataTypes.TEXT,
    added: DataTypes.DATE,
    removed: DataTypes.DATE,
    extension: DataTypes.STRING,
    filename: DataTypes.TEXT,
    name: DataTypes.TEXT,
    year: DataTypes.INTEGER,
    tags: DataTypes.TEXT,
    episode_number: DataTypes.INTEGER,
    season_number: DataTypes.INTEGER,
    tv_title: DataTypes.TEXT,
    subtitles: DataTypes.TEXT,
    category: DataTypes.STRING
  });
  return file_history;
};
