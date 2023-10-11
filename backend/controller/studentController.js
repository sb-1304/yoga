const { Op } = require("sequelize");

const connection = require("../setupFiles/database");
const { BAD_REQUEST } = require('../setupFiles/config.json');
const { StudentDetails, Bookings, Bookings2 } = require('../setupFiles/models');

let db = undefined;
connection.then(async _ => db = _);

const getStudentDetails = async (req, res, next) => {
    try {

        const { username } = req.query;
        const data = await db.models.Students.findByPk(username);

        if (data) {
            res.status(200).send(new StudentDetails(data));
        } else {
            throw Error(BAD_REQUEST, { cause: 'User does not exist!' });
        }

    } catch (error) {

        next(error);
    }
}

const getAllStudents = async (req, res, next) => {
    try {
        const data = await db.models.Students.findAll();
        if (data) {
            res.status(200).send(data.map(_ => new StudentDetails(_)));
        } else {
            throw Error(BAD_REQUEST, { cause: 'No Student found' });
        }

    } catch (error) {

        next(error);
    }
}

const updateDetails = async (req, res, next) => {
    try {

        const { name, username, dob, level, benefits, contra_indications } = new StudentDetails(req.body);
        const data = await db.models.Students.update({ name, username, dob, level, benefits, contra_indications }, { where: { username } });

        if (data[0]) {
            const newData = await db.models.Students.findByPk(username);
            res.status(200).send(new StudentDetails(newData));
        } else {
            throw Error(BAD_REQUEST, { cause: 'Nothing Updated!' });
        }

    } catch (error) {

        next(error);
    }
}

const checkIfBookingExists = async ({ student_id, teacher_id, date, end_time, booking_id }) => {

    let studentQuery;
    let teacherQuery;
    if (booking_id) {
        studentQuery = `SELECT * FROM Bookings where student_id="${student_id}" AND booking_id!=${booking_id} AND (("${date}" BETWEEN date AND end_time) OR ("${end_time}" BETWEEN date AND end_time));`

        const [studentData] = await db.sequelize.query(studentQuery);
        if (studentData.length) {
            throw Error(BAD_REQUEST, { cause: "You already have a class for the selected date and time." });
        }
    } else {
        teacherQuery = `SELECT * FROM Bookings where teacher_id="${teacher_id}" AND (("${date}">=date AND "${date}"<=end_time) OR ("${end_time}">=date AND "${end_time}"<=end_time));`

        const [teacherData] = await db.sequelize.query(teacherQuery);
        if (teacherData.length) {
            throw Error(BAD_REQUEST, { cause: "You have a class scheduled for the selected date and time." });
        }
    }

    return true;
}

const getAllBookings = async (req, res, next) => {
    try {

        const { student, id } = req.query;

        let data;
        if (student == 'true') {
            data = await db.models.Bookings.findAll({ where: { [Op.or]: [{ student_id: id }, { student_id: null }] } });
        } else {
            data = await db.models.Bookings.findAll({ where: { teacher_id: id } });
        }

        if (data) {
            const newData = await Promise.all(data.map(async (element) => {
                const newElement = new Bookings2(element);
                const teacherData = await db.models.Teachers.findByPk(element.teacher_id);
                const studentData = await db.models.Students.findByPk(element.student_id);
                newElement.teacherName = teacherData?.name;
                newElement.studentDetails = studentData ? new StudentDetails(studentData) : {};
                return await newElement;
            }));

            res.status(200).send(await newData);
        } else {
            throw Error(BAD_REQUEST, { cause: 'No Bookings Available.' });
        }

    } catch (error) {
        next(error);
    }
}

const createBooking = async (req, res, next) => {
    try {

        req.body.dateValidation = 'past';
        req.body.endDate = true;
        const { teacher_id, date, end_time, capacity } = new Bookings(req.body);
        const bookingNotExists = await checkIfBookingExists({ teacher_id, date, end_time });

        if (bookingNotExists) {
            const data = await db.models.Bookings.create({ teacher_id, date, end_time, capacity });

            if (data) {
                res.status(200).send(`Class scheduled for the selected date and time.`);
            } else {
                throw Error(BAD_REQUEST, { cause: 'Incorrect Data, Please check data!' });
            }

        } else {
            throw Error(BAD_REQUEST, { cause: "Class already scheduled for the selected date!" })
        }

    } catch (error) {

        next(error);
    }
}

const checkIfProfileUpdated = async ({ student_id }) => {
    try {
        let ret = true;
        const data = await db.models.Students.findByPk(student_id);
        const studentDetails = data.dataValues;
        for (const key in studentDetails) {
            if (studentDetails[key] && (studentDetails[key].length)) {
                let len = studentDetails[key].length;
            } else if (key !== 'verified') {
                ret = false;
                break;
            }
        }
        return ret;

    } catch (error) {
        console.log(error);
    }
}

const updateBooking = async (req, res, next) => {
    try {

        const { booking_id, student_id, date, end_time, sequence, student, feedback } = new Bookings(req.body);

        const bookingNotExists = await checkIfBookingExists({ student_id, date, end_time, booking_id });

        if (bookingNotExists) {
            let data;
            let responseText;
            let payload;
            let whereCondition = { where: { booking_id } };

            if (student) {

                if (student_id) {
                    const updated = await checkIfProfileUpdated({ student_id });

                    if (updated) {
                        responseText = `Class booked successfully.`;
                        payload = { student_id };
                        await db.models.Bookings.increment({ capacity: -1 }, whereCondition);

                    } else {

                        throw Error(BAD_REQUEST, { cause: 'Please update your profile first!' });
                    }

                } else if (!student_id) {
                    responseText = `Class booking cancelled.`;
                    payload = { student_id };
                    await db.models.Bookings.increment({ capacity: 1 }, whereCondition);

                } else if (feedback) {
                    responseText = `Feedback Submitted.`;
                    payload = { feedback };
                }
                data = await db.models.Bookings.update({ student_id, feedback }, whereCondition);

            } else {
                data = await db.models.Bookings.update({ sequence }, whereCondition);
                responseText = `Class sequence updated.`;

            }

            if (data[0]) {
                res.status(200).send(responseText);
            } else {
                throw Error(BAD_REQUEST, { cause: 'Incorrect Data, Please check data!' });
            }

        } else {
            throw Error(BAD_REQUEST, { cause: "Class already scheduled for the selected date!" })
        }

    } catch (error) {

        next(error);
    }
}

const deleteBooking = async (req, res, next) => {
    try {

        const booking_id = req.params[0];

        const data = await db.models.Bookings.destroy({ where: { booking_id } });

        if (data) {
            res.status(200).send(`Class deleted successfully.`);
        } else {
            throw Error(BAD_REQUEST, { cause: 'Class does not exist.' });
        }

    } catch (error) {

        next(error);
    }
}

module.exports = {
    getStudentDetails, getAllStudents, updateDetails, getAllBookings, createBooking, updateBooking, deleteBooking
}; 