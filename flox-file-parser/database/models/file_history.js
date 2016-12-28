'use strict';
module.exports = function(sequelize, DataTypes) {
  var file_history = sequelize.define('file_history', {
    src: DataTypes.TEXT,
    added: DataTypes.DATE,
    removed: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return file_history;
};
