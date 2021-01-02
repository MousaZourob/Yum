const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    user_id: { type: String, required: false},
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    restrictions: { type: String, require: true },
    location: { type: String, require: true },
    image: { type: String, required: false}
}, {
    timestamps: true,
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;