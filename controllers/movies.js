const { sendRequest } = require('./../libs/response.lib');
const db = require('../db');

exports.findAllMovies = async (req, res, next) => {
    const services = await db();
    const movies = services.Movies;
    // const logs = services.Logs;
    try {
      const { limit, page, id, name, description } = req.query
      const searchValue = req.query.searchValue || '';
      const response = await movies.findAll({
        page: parseInt(page),
        limit: parseInt(limit),
        where: {
            id,name, description, searchValue,
        } 
      });
      return res.send(sendRequest({ data: response }));
    } catch (error) {
      // const model = {
      //   description: `exports.findAllMovies - ${String(error)} - request: ${String(req.query)}`,
      //   type: 'BACKEND'
      // };
      // await logs.create(model);
      // return res.send(sendRequest({ error: true, message: `exports.findAllMovies - ${String(error)}` }));
    }
};
exports.createMovie = async (req, res, next) => {
  const services = await db();
  const Movies = services.Movies;
  try {
    const model = req.body;
    const response = await Movies.create(model).catch(e => {
      return res.send(sendRequest({ error: true, message: `${String(e.error)}` }))
    });
    return res.send(sendRequest({ data: response }));
  } catch (error) {
    // const model = {
    //   description: `exports.registerContOrder - ${String(error)} - request: ${String(req.body)}`,
    //   type: 'BACKEND'
    // };
    // await logs.create(model);
    // return res.send(sendRequest({ error: true, message: `exports.registerContOrder - ${String(error)}` }));
  }
};
exports.updateMovie = async (req, res, next) => {
  const services = await db();
  const Movies = services.Movies;
  // const logs = services.Logs;
  try {
    const id = req.params.id;
    const model = req.body;
    const response = await Movies.update(model,id).catch(e => {
      return res.send(sendRequest({ error: true, message: `${String(e.error)}` }))
    });
    return res.send(sendRequest({ data: response }));
  } catch (error) {
    const model = {
      description: `exports.updateContOrder - ${String(error)} - request: ${JSON.stringify(req.params.id)} - ${JSON.stringify(req.body)}`,
      type: 'BACKEND'
    };
    await logs.create(model);
    return res.send(sendRequest({ error: true, message: `exports.updateContOrder - ${String(error)}` }));
  }
};
exports.deleteMovie = async (req, res, next) => {
  const services = await db();
  const Movies = services.Movies;
  // const logs = services.Logs;
  try {
    const id = req.params.id;
    const response = await Movies.deleteById(id);
    return res.send(sendRequest({ data: response }));
  } catch (error) {
    const model = {
      description: `exports.deleteContOrder - ${String(error)} - request: ${JSON.stringify(req.params.id)}`,
      type: 'BACKEND'
    };
    await logs.create(model);
    return res.send(sendRequest({ error: true, message: `exports.deleteContOrder - ${String(error)}` }));
  }
};