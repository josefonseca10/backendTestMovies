const { db } = require('./../config/index');
const setupDataBase = require('./libs/conexion');

/* MODELS */
const setupUsersModel = require('./models/users');
const setupMoviesModel = require('./models/movies');
const setupCommentsModel = require('./models/comments');

/* LIBS */
const setupUsers = require('./libs/users');
const setupMovies = require('./libs/movies');
const setupComments = require('./libs/comments');

module.exports = async function () {
  const config = {
    ...db.main,
    logging: console.log,
    query: {
      raw: true,
    },
  };

  const sequelize = setupDataBase(config);
  await sequelize.authenticate();

  /* CREATE MODELS */
  const UsersModel = setupUsersModel(config);
  const MoviesModel = setupMoviesModel(config);
  const CommentsModel = setupCommentsModel(config);


  /* CREATE RELATIONSHIP */
  CommentsModel.belongsTo(MoviesModel, { foreignKey: 'idMovie' })

  /* CREATE LIBS */
  const Users = setupUsers(UsersModel);
  const Movies = setupMovies(MoviesModel, CommentsModel);
  const Comments = setupComments(CommentsModel);

  return {
    Users,
    Movies,
    Comments
  };
};
