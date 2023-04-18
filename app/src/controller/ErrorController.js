function errorController({res, error}) {
    res.status(error.statusCode).send({ error: error.errorMessage });
}

module.exports = errorController;
