const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    group: String,
    marks: [Number],
});

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;
