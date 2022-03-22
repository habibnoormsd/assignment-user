// const { validateStudents } = require("../models/Students");
const Students = require("../models/Students");
module.exports = function(req, res, next) {
    let { error } = Students.validateStudents(req.body);
    if (error) {
        console.log(error);
        res.status(401).send(error.message);
    }
    next();
};