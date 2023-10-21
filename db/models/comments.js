const { Sequelize } = require('sequelize');
const setupDataBase = require('../libs/conexion');

module.exports = function setupCommentsModel (config) {
  const sequelize = setupDataBase(config);
  return sequelize.define('comments', {
    id: {
      field: 'id',
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false
    },
    idMovie: {
      field: 'idMovie',
      type: Sequelize.INTEGER,
      allowNull: false
    },
    qualification: {
      field: 'qualification',
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
    comment: {
      field: 'comment',
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
    tableName: 'comments',
    timestamps: false
  });
};
