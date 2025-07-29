const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Course schema
const Course = new Schema({
    name: {type: String, maxlength: 255, required: true },
    description: {type: String, maxlength: 600 },
    image: {type: String, maxlength: 255 },
    videoId: {type: String, maxlength: 255 },
    level: {type: String, maxlength: 255 },
    slug: {type: String, maxlength: 255, unique: true },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

module.exports = mongoose.model('Course', Course);