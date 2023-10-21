module.exports = function setupComments (CommentsModel) {

  function create(model) {
    return new Promise(async (resolve, reject) => {
      try {
        await CommentsModel.max('id').then(async (result) => {
          const sequence = result || 0;
          model.id = sequence + 1;
          await CommentsModel.create(model).then(async (data) => {
            delete data.dataValues.id
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

  async function findAll({ where, limit, page }) {
    page = page ? page - 1 : 0;
    page = page < 0 ? 0 : page;
    limit = parseInt(limit || 10);
    limit = limit < 0 ? 10 : limit;
    const offset = page * limit;

    try {
      where.status = 'A';
      return await CommentsModel.findAndCountAll({
        where: {...where},
        order: [['id', 'DESC']],
        raw: true,
        offset,
        limit
      });
    } catch (e) {
      throw e;
    }
  }


  return {
    create,
    findAll,
  }
}