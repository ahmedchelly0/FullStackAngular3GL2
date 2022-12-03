const express = require("express");

const router = express.Router();
const Student = require("../models/student");





router.get('/', (req, res, next) => {
    // res.send('OK')
    //console.log(req)
    Student
        .find()
        .sort({ date: 1 })
        .then(Students => res.json(Students))
        .catch(err => res.json({ succes: false, msg: err }))


});

router.post('/stud/', (req, res) => {
    /* console.log(req.body.name)
    res.send('OK') */
    console.log(req)
    const newStudent = new Student({
        id: req.body.id,
        name: req.body.name,
        class: req.body.class,
        dateOfBirth: req.body.dateOfBirth,
        

    })
    console.log(req)
    console.log(res)
    newStudent
        .save()
        .then(Students => res.json({ succes: true, Students }))
        .catch(err => res.json({ succes: false, msg: err }))
})

module.exports = router;