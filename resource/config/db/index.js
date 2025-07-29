const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/EducationCourse_dev', {
            // useNewUrLParser: true,
            // useUnifiedTopology: true,
        })
        console.log('Connected to MongoDB successfully');
    }catch(e) {
        console.error('Connection failed:', e.message);
    }
}

module.exports = {connect};