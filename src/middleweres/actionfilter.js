module.exports = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (ex) {
      if (ex.code && ex.message) res.error(ex.code, ex.message);

      res.badRequest();
    }
  };
};
