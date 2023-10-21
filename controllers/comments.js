const { sendRequest } = require('./../libs/response.lib');
const db = require('../db');

exports.findAllComments = async (req, res, next) => {
    const services = await db();
    const Comments = services.Comments;
    // const logs = services.Logs;
    try {
      const idMovie = req.params.id;
      const { limit, page } = req.query
      const response = await Comments.findAll({
        page: parseInt(page),
        limit: parseInt(limit),
        where: {
            idMovie
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
exports.createComments = async (req, res, next) => {
  const services = await db();
  const Comments = services.Comments;
  try {
    const model = req.body;
    const response = await Comments.create(model).catch(e => {
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