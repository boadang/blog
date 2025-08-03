const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Lesson = new Schema({
    title: { type: String, required: true, maxLength: 255 },
    videoUrl: { type: String, maxLength: 255 },
    duration: { type: Number },
    index: { type: Number, default: 0 },
    description: { type: String, maxLength: 1000 },
    courseId: {type: Schema.Types.ObjectId, ref: 'Course', required: true},
}, {
    timestamps: true,
});

module.exports = mongoose.model('Lesson', Lesson);