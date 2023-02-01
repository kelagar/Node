const express = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'First Name is required'
    },
    lastName: {
        type: String,
        required: 'Last Name is required'
    },
    email: {
        type: String,
        required: 'Email is required'
    },
    phone: {
        type: Number
    },
    city: {
        type: String,
    }
});

mongoose.model("User", userSchema);