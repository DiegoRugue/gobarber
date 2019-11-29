export default (req, res, next) => {
  res.ok = (content) => {
    res.status(200).send(content);
  };

  res.badRequest = (message) => {
    res.status(400).send(message);
  };

  res.error = (code = 500, message) => {
    res.status(code).send({ error: message });
  };

  next();
};
