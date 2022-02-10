const errorHandler = (err, req, res, next) => {
  console.log(err);
  statusCode = 500;
  message = "Internal Server Error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    statusCode = 400;
    message = err.errors[0].message;
  }

  res.status(statusCode).json({ message });
};

module.exports = errorHandler;
