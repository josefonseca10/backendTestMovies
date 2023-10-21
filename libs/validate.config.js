const { validate } = require('express-validation');
const { validateSchema } = require('../config');

module.exports = {
  apiValidate: (schema) => {
    return validate(schema, { ...validateSchema })
  }
};
