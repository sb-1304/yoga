const nodemailer = require('nodemailer');

const connection = require("../setupFiles/database");
const { BAD_REQUEST, INITIAL_DATA, UNAUTHORISED } = require('../setupFiles/config.json');
const { fullDate, StudentDetails } = require("../setupFiles/models");

let db = undefined;
connection.then(async _ => db = _);

const sendVerificationMail = async (email, student) => {
    const transporter = nodemailer.createTransport({
        service: 'Outlook',
        auth: {
            user: 'YogaPlanner@outlook.com',
            pass: 'Mivediahe'
        }
    });

    const verificationLink = `http://localhost:8080/user/verify/?username=${email}&student=${student}`;
    const mailOptions = {
        from: 'YogaPlanner@outlook.com',
        to: email,
        subject: 'Verify your email address',
        text: `Please click on the following link to verify your email address: ${verificationLink}`
    };
    return await transporter.sendMail(mailOptions);
}

const checkIfVerified = async (username, student, next) => {
    try {


        let model;
        // let key;

        if (student) {
            model = db.models.Students;
            // key = 'student_id';
        } else {
            model = db.models.Teachers;
            // key = 'teacher_id'; 
        }

        const data = await model.findByPk(username);

        if (data) {
            if (data.verified) {
                return true;
            } else {
                return false;
            }
        } else {
            throw Error(BAD_REQUEST, { cause: 'User not found please provide valid username.' });
        }

    } catch (error) {

        next(error);
    }
}

const checkLogin = async (req, res, next) => {
    try {

        const { username, password, student } = req.body;

        const verified = await checkIfVerified(username, student, next);

        if (verified) {
            let query = undefined;

            if (student) {
                query = `SELECT * FROM Students WHERE username='${username}' AND password='${password}';`;
            } else {
                query = `SELECT * FROM Teachers WHERE username='${username}' AND password='${password}';`;
            }

            const [data, metaData] = await db.sequelize.query(query);

            if (data.length) {
                res.status(200).send(new StudentDetails(data[0]));
            } else {
                throw Error(BAD_REQUEST, { cause: 'Incorrect Password!' });
            }
        } else {
            throw Error(UNAUTHORISED, { cause: 'Please verify your email first!' });
        }

    } catch (error) {

        next(error);
    }
}

const registerUser = async (req, res, next) => {
    try {

        const { username, password, student, dob, gender, name } = req.body;

        let query = undefined;
        let model = undefined;

        if (student == true) {
            query = `SELECT username FROM Students WHERE username='${username}';`;
            model = db.models.Students;
        } else {
            query = `SELECT username FROM Teachers WHERE username='${username}';`;
            model = db.models.Teachers;
        }

        const userAlreadyRegistered = await model.findByPk(username);

        if (!userAlreadyRegistered) {
            await model.create({ username, password, dob, gender, name });
            res.status(200);
            await sendVerificationMail(username, student);
            res.send(`User ${name} registered with id ${username}!!! \nPlease verify your email by clicking on the link received in your email.`);
        } else {
            throw Error(BAD_REQUEST, { cause: 'User Already Registered!' });
        }

    } catch (error) {

        next(error);
    }
}

const userVerification = async (req, res, next) => {
    try {
        const { username, student } = req.query;
        let model;

        if (student == 'true') {
            model = db.models.Students;
        } else {
            model = db.models.Teachers;
        }

        const data = await model.update({ verified: true }, { where: { username } });

        if (data[0]) {
            res.status(200).send(`User with email id ${username} is successfully verified!!!`);
        } else {
            throw Error(BAD_REQUEST, { cause: 'User not found please provide valid username.' });
        }

    } catch (error) {

        next(error);
    }
}

//****************       Initially to load dummy data at the start of the server
const loadInitialData = (req, res) => {
    setTimeout(async () => {
        try {
            const { username, username2, password, name, name2, dob, gender, level, sequence, sequence2,
                pose_name, sanskrit_name, pose_type, image, benefits, contra_indications } = INITIAL_DATA;

            await db.models.Students.create({ username, password, name, dob, gender, level, benefits, contra_indications, verified: true });
            await db.models.Teachers.create({ username, password, name, dob, gender, verified: true });
            await db.models.Students.create({ username: username2, password, name: name2, dob, gender, level, benefits, contra_indications, verified: true });
            await db.models.Teachers.create({ username: username2, password, name: name2, dob, gender, verified: true });
            await db.models.Bookings.create({ date: fullDate(new Date()), end_time: new Date(), student_id: username, teacher_id: username, sequence });
            await db.models.Bookings.create({ date: '2023-06-13 04:00:00', end_time: '2023-06-13 05:00:00', student_id: username2, teacher_id: username2, sequence: sequence2 });
            await db.models.YogaPoses.create({ image, pose_name, sanskrit_name, pose_type, benefits, contra_indications });

        } catch (error) {
            console.log("Error while loading Initial Data ", error);
        }
    }, 1000);
}

//Use if want to load initial data
// loadInitialData();

module.exports = {
    checkLogin, registerUser, userVerification, loadInitialData
}; 