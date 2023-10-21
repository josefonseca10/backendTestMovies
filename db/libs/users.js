const argon = require('argon2')
const { Op } = require('sequelize');

module.exports = function setupUsers (UsersModel) {
  function create(model) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('model', model)
        let instance = await UsersModel.findOne({
          where: { [Op.or]: [{ email: model.email }, { username: model.username }] }
        })
        console.log('alala', instance)
        if (instance) {
          return resolve({errors: `El usuario ya existe`})
        }
        console.log('alala333')
        await UsersModel.max('id').then(async (result) => {
          const sequence = result || 0;
          model.id = sequence + 1;
          model.hash = await argon.hash(model.password);
          await UsersModel.create(model).then(async (data) => {
            delete data.dataValues.id
            delete data.dataValues.hash
            resolve(data);
          }).catch(error => {
            reject(error);
          });
        });
      } catch (e) {
        reject(e)
      }
    });
  }
  function findUser(where) {
    try {
      return UsersModel.findOne({
        where
      })
    } catch (e) {
      throw e;
    }
  }

  return {
    create,
    findUser
  }
}