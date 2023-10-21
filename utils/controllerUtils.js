const addErrorHandler = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (reason) {
    return next(reason);
  }
};

module.exports = {
  addErrorHandler
};
