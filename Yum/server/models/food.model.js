const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false}
}, {
    timestamps: true,
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;