const {Sequelize} = require('sequelize')
let sequelize = null

module.exports = function setupDataBase (config) {

  if (!sequelize || sequelize.config.host !== config.host || sequelize.config.database !== config.database) {
    const { database, username, password, host, port, dialect, logging, query } = config
    sequelize = new Sequelize(database, username, password, {
      dialect, host, port, logging, query
    })
  }

  return sequelize
}
