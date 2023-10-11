const connection = require("../setupFiles/database");
const { BAD_REQUEST } = require('../setupFiles/config.json');
const { TeacherDetails, YogaPoses } = require('../setupFiles/models');

let db = undefined;
connection.then(async _ => db = _);

const getTeacherDetails = async (req, res, next) => {
    try {

        const { username } = req.query;
        const data = await db.models.Teachers.findByPk(username);

        if (data) {
            res.status(200).send(new TeacherDetails(data));
        } else {
            throw Error(BAD_REQUEST, { cause: 'User does not exist!' });
        }

    } catch (error) {

        next(error);
    }
}

const updateDetails = async (req, res, next) => {
    try {

        const { dob, name, username } = new TeacherDetails(req.body);
        const data = await db.models.Teachers.update({ dob, name }, { where: { username } });

        if (data[0]) {
            res.status(200).send('Data Update successfully.');
        } else {
            throw Error(BAD_REQUEST, { cause: 'Nothing Updated!' });
        }

    } catch (error) {

        next(error);
    }
}

const getAllTeachers = async (req, res, next) => {
    try {
        const data = await db.models.Teachers.findAll();
        if (data) {
            res.status(200).send(data.map(_ => new TeacherDetails(_)));
        } else {
            throw Error(BAD_REQUEST, { cause: 'No teacher found' });
        }

    } catch (error) {

        next(error);
    }
}

const getAllAsanas = async (req, res, next) => {
    try {
        const data = await db.models.YogaPoses.findAll();
        if (data) {
            res.status(200).send(data.map(_ => new YogaPoses(_)));
        } else {
            throw Error(BAD_REQUEST, { cause: 'Issue while fetching Asanas!' });
        }

    } catch (error) {

        next(error);
    }
}

const addAsanas = async (req, res, next) => {
    try {

        const { pose_name, sanskrit_name, pose_type, benefits, contra_indications, image } = new YogaPoses(req.body);

        const doesNotExistArray = await db.models.YogaPoses.findAll({ where: { pose_name } });

        if (!doesNotExistArray.length) {
            const data = await db.models.YogaPoses.create({ pose_name, sanskrit_name, pose_type, benefits, contra_indications, image });
            if (data) {
                res.status(200).send({ message: `Yoga Pose, ${pose_name} created successfully!`, poseId: data.pose_id });
            } else {
                throw Error(BAD_REQUEST, { cause: 'Incorrect Data, Please check data!' });
            }
        } else {
            throw Error(BAD_REQUEST, { cause: `Pose with name ${pose_name} already exists!` });
        }

    } catch (error) {

        next(error);
    }
}

const updateAsanas = async (req, res, next) => {
    try {

        const { pose_id, pose_name, sanskrit_name, pose_type, benefits, contra_indications, image } = new YogaPoses(req.body);
        const data = await db.models.YogaPoses.update({ pose_name, sanskrit_name, pose_type, benefits, contra_indications, image }, { where: { pose_id } });

        if (data) {
            res.status(200).send({ message: 'Pose Update successfully.' });
        } else {
            throw Error(BAD_REQUEST, { cause: 'Incorrect Data, Please check data!' });
        }

    } catch (error) {

        next(error);
    }
}

const deleteAsana = async (req, res, next) => {
    try {
        const id = req.params[0];
        const data = await db.models.YogaPoses.destroy({ where: { pose_id: id } });
        if (data) {
            res.status(200).send('Asana delete successfully!');
        } else {
            throw Error(BAD_REQUEST, { cause: 'Asana does not exist.' });
        }
    } catch (error) {

        next(error);
    }
}

module.exports = {
    getTeacherDetails, updateDetails, addAsanas, getAllAsanas, deleteAsana, updateAsanas, getAllTeachers
}; 