const { Sequelize } = require('sequelize');
const setupDataBase = require('../libs/conexion');
const {now} = require("moment");

module.exports = function setupUsersModel (config) {
  const sequelize = setupDataBase(config);
  return sequelize.define('users', {
    id: {
      field: 'id',
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false
    },
    username: {
      field: 'username',
      type: Sequelize.STRING,
      allowNull: true
    },
    firstName: {
      field: 'firstName',
      type: Sequelize.STRING,
      allowNull: true
    },
    lastName: {
      field: 'lastName',
      type: Sequelize.STRING,
      allowNull: true
    },
    hash: {
      field: 'hash',
      type: Sequelize.STRING,
      allowNull: true
    },
    email: {
      field: 'email',
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
    tableName: 'users',
    timestamps: false
  });
};
