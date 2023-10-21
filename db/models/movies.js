const { Sequelize } = require('sequelize');
const setupDataBase = require('../libs/conexion');
const {now} = require("moment");

module.exports = function setupMoviesModel (config) {
  const sequelize = setupDataBase(config);
  return sequelize.define('movies', {
    id: {
      field: 'id',
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false
    },
    name: {
      field: 'name',
      type: Sequelize.STRING,
      allowNull: true
    },
    image: {
      field: 'image',
      type: Sequelize.TEXT,
      allowNull: true
    },
    description: {
      field: 'description',
      type: Sequelize.STRING,
      allowNull: true
    },
    createdAt: {
      field: 'createdAt',
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: true
    },
    updateAt: {
      field: 'updateAt',
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: true
    },
    status: {
      field: 'status',
      type: Sequelize.STRING,
      defaultValue: 'A',
      allowNull: false
    }
  }, 
  {
    tableName: 'movies',
    timestamps: false
  });
};
