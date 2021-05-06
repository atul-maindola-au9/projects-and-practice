const express = require("express");
const userRouter = new express.Router();
const Usersdoc = require("../models/usermodel");

userRouter.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if (password === cpassword) {
            var registerUser = new Usersdoc({
                username: req.body.username,
                password: req.body.password,
                cpassword: req.body.cpassword,
            });
        }
        const token = await registerUser.genrateAuthToken();
        await registerUser.save();
        res.status(201).render("index");
    } catch (error) {
        res.status(400).send(error);
    }
});

userRouter.post("/login", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const user = await Usersdoc.findOne({ username: username });

        if (user.password === password) {
            res.status(201).render("dashboard");
        } else {
            res.send("invalid credentials");
        }

        const token = await user.genrateAuthToken();
    } catch (error) {
        res.status(400).send(error);
    }
});

userRouter.get("/register/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await Usersdoc.findById({ _id: _id });
        res.send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = userRouter;
