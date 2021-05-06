const express = require("express");
const mongoose = require("mongoose");

const couponschema = new mongoose.Schema({
    website: {
        type: String,
        trim: true,
    },
    validtill: {
        type: String,
        trim: true,
    },
    discount: {
        type: String,
        trim: true,
    },
    couponcode: {
        type: String,
        trim: true,
    },
    redeem: {
        type: Boolean,
        default: false,
    },
});

const Couponsdoc = new mongoose.model("Coupondoc", couponschema);

module.exports = Couponsdoc;
