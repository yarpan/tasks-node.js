const Student = require('../models/Student');

exports.getStudents = async (req, res) => {
    const students = await Student.find();
    res.json(students);
};

exports.addStudent = async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
};

exports.updateStudentAge = async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, { age: req.body.age }, { new: true });
    res.json(student);
};

exports.deleteStudent = async (req, res) => {
    await Student.findOneAndDelete({ group: req.params.group });
    res.json({ message: 'Student deleted' });
};

exports.filterStudents = async (req, res) => {
    const { age, minMark, namePrefix } = req.query;
    let query = {};

    if (age) query.age = { $gt: age };
    if (minMark) query.marks = { $elemMatch: { $gt: minMark } };
    if (namePrefix) query.name = new RegExp(`^${namePrefix}`, 'i');

    const students = await Student.find(query).sort({ age: -1 });
    res.json(students);
};
