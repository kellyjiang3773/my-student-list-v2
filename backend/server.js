// dependencies
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import { getSecret } from './secrets';
import Student from './models/student';

const app = express();
const router = express.Router();

// set port
const API_PORT = process.env.API_PORT || 3001;

// // database config
mongoose.connect(getSecret('dbUri'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// configure API to use bodyParser and look for JSON data in req body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// set route path and initialize API
router.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

router.get('/students', (req, res) => {
    Student.find((err, students) => {
        if (err) {
            return res.json({ success: false, error: err });
        } else {
            return res.json({ success: true, data: students });
        }
    });
});

router.post('/students', (req, res) => {
    const student = new Student();
    const { name, aMark, mMark, fMark } = req.body;
    if (name == '') {
        // error, need a name
        return res.json({ success: false, error: "You must provide a name" });
    }
    // setting fields of new Student
    student.name = name;
    student.aMark = aMark;
    student.mMark = mMark;
    student.fMark = fMark;
    // save Student to database
    student.save(err => {
        if (err) {
            return res.json({ success: false, error: err });
        } else {
            return res.json({ success: true });
        }
    });
});

router.get('/students/:studentId', (req, res) => {
    // const student = new Student();
    const { studentId } = req.params;
    if (!studentId) {
        return res.json({ success: false, error: "No student found" });
    }
    Student.findById(studentId, (error, student) => {
        if (error) return res.json({ success: false, error });
        return res.json({ success: true, student: student});
    });
});

// router.put('/students/:studentId', (req, res) => {
//     const {studentId} = req.params;
//     if (!studentId) {
//         return res.json({success: false, error: "No student id provided"});
//     }
//     Student.findById(studentId, (error, student) => {
//         if (error) return res.json({success: false, error});
//         const {name, aMark, mMark, fMark} = req.body;
//         if (name) student.name = name;
//         if (aMark) student.aMark = aMark;
//         if (mMark) student.mMark = mMark;
//         if (fMark) student.fMark = fMark;
//         student.save(error => {
//             if (error) return res.json({success: false, error});
//             return res.json({success: true});
//         });
//     });
// });

router.delete('/students/:studentId', (req, res) => {
    const {studentId} = req.params;
    if (!studentId) {
        return res.json({success: true, error: "No student id provided"});
    }
    Student.remove({_id: studentId}, (error, student) => {
        if (error) return res.json({success: false, error});
        return res.json({success: true});
    });
});

// use router when we call /api
app.use('/api', router);

app.listen(API_PORT, () => console.log('Listening on port ' + API_PORT));