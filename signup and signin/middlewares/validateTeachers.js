// const { validateTeachers } = require("../models/Teachers");
const Product = require("../models/Teachers");
module.exports = function(req, res, next) {
    let { error } = Teachers.validateTeachers(req.body);
    if (error) {
        console.log(error);
        res.status(401).send(error.message);
    }
    next();
};