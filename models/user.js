const mongoose = require('mongoose');

const scheme = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unquie: true },
    password: { type: String, required: true },
    id: { type: String, required: true, unquie: true }
});

const user = mongoose.model('users', scheme);

module.exports = user;