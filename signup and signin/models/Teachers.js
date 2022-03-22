const Joi = require("joi");
const mongoose = require("mongoose");
var schema = mongoose.Schema({
    name: String,
    email: { type: String, lowercase: true },
    password: String,
    role: { type: String, default: "normal" }, //admin,normal
});

schema.statics.validateTeachers = (data) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(3).max(50),
        password: Joi.string().min(3).max(50),
        email: Joi.string().email(),
        role: Joi.string(),
    });
    return joiSchema.validate(data, { abortEarly: false });
};

const Teachers = mongoose.model("Teachers", schema);

module.exports = Teachers;