function authen(req, res, next) {
    console.log('Authentification .....');
    next();
}

module.exports = authen;