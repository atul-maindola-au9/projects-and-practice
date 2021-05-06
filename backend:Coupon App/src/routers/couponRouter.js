const express = require("express");
const router = new express.Router();
const Couponsdoc = require("../models/couponmodel");

router.post("/createcoupon", async (req, res) => {
    try {
        var CreateCoupon = new Couponsdoc({
            website: req.body.website,
            couponcode: req.body.couponcode,
            validtill: req.body.validtill,
            discount: req.body.discount,
        });

        const couponDetails = await CreateCoupon.save();
        var result = await Couponsdoc.find({});
        console.log(couponDetails);
        res.status(201).render("dashboard", {
            CouponData: result,
            couponDetail: couponDetails,
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/createcoupon", async (req, res) => {
    try {
        const result = await Couponsdoc.find({});
        res.send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/createcoupon/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await Couponsdoc.findById({ _id: _id });
        res.send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.patch("/createcoupon/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await Couponsdoc.findByIdAndUpdate(
            { _id: _id },
            req.body,
            { new: true }
        );
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/createcoupon/:id", async (req, res) => {
    try {
        const result = await Couponsdoc.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
