const express = require("express");
const Students = require("../../models/Students");
const router = express.Router();
const bcrypt = require("bcryptjs");
const _ = require("lodash");
router.get("/signup", async(req, res) => {
    try {
        let result = new Students();
        result.email = req.body.email;
        result.name = req.body.name;
        let salt = await bcrypt.genSalt(10);
        result.password = await bcrypt.hash(req.body.password, salt);
        result = await result.save();
        result = _.pick(result, ["name", "email", "role", "_id"]);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(401).send(err.message);
    }
});
router.get("/signin", async(req, res) => {
    try {
        // let result = new User();
        let { email, password } = req.body;

        let result = await Students.findOne({ email: email });
        if (!result) {
            res.status(404).send("User with given email was not found");
        }

        let isValid = await bcrypt.compare(password, result.password);
        if (!isValid) {
            res.status(404).send("Invalid Password");
        }

        result = _.pick(result, ["name", "email", "role", "_id"]);
        // console.log(await _.omit(result, ["password"]));

        res.send(result);
    } catch (err) {
        res.status(401).send(err.message);
    }
});


router.get("/", async function(req, res) {
    try {
        // console.log(req.query);
        let page = Number(req.query.page);
        let perPage = Number(req.query.perPage);

        page = (page - 1) * perPage;
        // console.log(page, perPage);

        let result = await Students.find(req.body).skip(page).limit(perPage);

        return res.send(result);
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
});
router.get("/:id", async function(req, res) {
    try {
        let result = await Students.findById(req.params.id);
        if (!result) {
            res.status(400).send("Student with given ID not found");
        }
        return res.send(result);
    } catch (err) {
        console.log(err);
        // res.status(400).send(err.message);
        res.status(400).send("The format of id is not correct");
    }
});
router.put("/:id", async function(req, res) {
    try {
        let result = await Students.findById(req.params.id);
        if (!result) {
            return res.status(400).send("The record with given id was not found");
        }

        result = await Students.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        return res.send(result);
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
});
router.delete("/:id", async function(req, res) {
    try {
        let result = await Students.findById(req.params.id);
        if (!result) {
            res.status(400).send("record with given ID not found");
        }
        result = await Students.findByIdAndDelete(req.params.id);
        return res.send(result);
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
        // res.status(400).send("The format of id is not correct");
    }
});



module.exports = router;