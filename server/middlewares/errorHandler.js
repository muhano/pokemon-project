const errorHandler = (err, req, res, next) => {
    statusCode = 500
    message = "Internal Server Error"

    res.status(statusCode).json({ message });
}

module.exports = errorHandler