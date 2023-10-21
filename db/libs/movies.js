const { Op } = require('sequelize');
module.exports = function setupMovies (MoviesModel, CommentsModel) {

  function create(model) {
    return new Promise(async (resolve, reject) => {
      try {
        await MoviesModel.max('id').then(async (result) => {
          const sequence = result || 0;
          model.id = sequence + 1;
          await MoviesModel.create(model).then(async (data) => {
            delete data.dataValues.id
            delete data.dataValues.image
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

    const whereQuery = {};

    if (Object.keys(where).length > 0 && where.searchValue) {
      const searchValue = where.searchValue;
      const searchCondition = { [Op.like]: `%${searchValue}%` };
      whereQuery[Op.or] = [
        { id: searchCondition },
        { name: searchCondition },
        { description: searchCondition },
      ];
    }

    for (const key of Object.keys(where)) {
      const value = where[key];
      if (Array.isArray(value) && ['id', 'name', 'description'].includes(key)) {
        whereQuery[key] = { [Op.and]: value };
      } else if (value && key !== 'searchValue') {
        whereQuery[key] = { [Op.like]: `%${value}%` };
      }
    }

    try {
      whereQuery.status = 'A';
      let listMovies = await MoviesModel.findAndCountAll({
        where: {...whereQuery},
        order: [['id', 'DESC']],
        raw: true,
        offset,
        limit
      })
      const updatedRows = await Promise.all(
          listMovies.rows.map(async (row) => {
            console.log('jjj', row);
            if (!row.id) {
              return {
                ...row,
                average: 0,
              };
            }

            const listComments = await CommentsModel.findAll({
              where: { idMovie: row.id }, // Corregir esta parte
            });

            const sumQualification = listComments.reduce(
                (accumulated, object) => accumulated + parseInt(object.qualification, 10),
                0
            );

            const total = sumQualification / listComments.length;
            return {
              ...row,
              average: total ? total : 0,
            };
          })
      );
      listMovies.rows = updatedRows;
      return listMovies
    } catch (e) {
      throw e;
    }
  }

  function update (model, id) {
    return new Promise(async (resolve, reject) => {
      try {
        await MoviesModel.update(model, {
          where: { id }
        });
        resolve(true)
      } catch (e) {
        reject(e);
      }
    });
  }

  function deleteById (id) {
    return new Promise(async (resolve, reject) => {
      try {
        await MoviesModel.update({
          status: 'I'
        }, {
          where: { id }
        });
        resolve(true)
      } catch (e) {
        reject(e);
      }
    });
  }

  return {
    create,
    findAll,
    update,
    deleteById
  }
}