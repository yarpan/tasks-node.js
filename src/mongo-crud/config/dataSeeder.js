const mongoose = require('mongoose');
const Student = require('../models/Student');
const connectDB = require('../config/db');

const seedData = async () => {
    await connectDB();
    //await Student.deleteMany();

    const students = [
        { name: 'Ivan', age: 21, group: 'A-31', marks: [75, 90, 82] },
        { name: 'Anna', age: 22, group: 'B-12', marks: [88, 92, 79] },
        { name: 'Alex', age: 23, group: 'A-31', marks: [95, 90, 85] },
        { name: 'Sophia', age: 20, group: 'C-44', marks: [77, 82, 89] },
        { name: 'Mark', age: 25, group: 'B-12', marks: [81, 85, 87] },
    ];

    await Student.insertMany(students);
    console.log('Data seeded');
    
    mongoose.connection.close();
};

seedData();
