const { BAD_REQUEST } = require('./config.json');

const fullDate = (fullDate, dateValidation, endDate) => {
    const today = new Date();
    const minutes = today.getMinutes();
    const hours = today.getHours();
    today.setHours(hours - 1);
    today.setMinutes(minutes - 1);
    const newDate = new Date(fullDate);

    if (endDate) newDate.setMinutes(newDate.getMinutes() - 1);

    if (newDate && dateValidation === 'future' && newDate > new Date()) {
        throw Error(BAD_REQUEST, { cause: "Future date not allowed." })
    }

    if (newDate && dateValidation === 'past' && newDate < today) {
        throw Error(BAD_REQUEST, { cause: "Cannot select past date and time." })
    }

    const dd = newDate ? newDate.toISOString() : undefined;
    return dd;
}

class StudentDetails {
    constructor(obj) {
        this.healthQuestionnaire = obj.health_questionnaire;
        this.bookingId = obj.booking_id;
        this.contraIndications = obj.contra_indications;

        this.health_questionnaire = obj.healthQuestionnaire;
        this.booking_id = obj.bookingId;
        this.contra_indications = obj.contraIndications;

        this.username = obj.username;
        this.dob = fullDate(obj.dob, 'future');
        this.name = obj.name;
        this.gender = obj.gender;
        this.level = obj.level;
        this.benefits = obj.benefits;
    }
}

class TeacherDetails {
    constructor(obj) {
        this.availableDate = obj.available_date;
        this.bookingId = obj.booking_id;


        this.available_date = obj.availableDate;
        this.booking_id = obj.bookingId;


        this.username = obj.username;
        this.dob = fullDate(obj.dob, 'future');
        this.name = obj.name;
        this.gender = obj.gender;
    }
}

class Bookings {
    constructor(obj) {
        this.student_id = obj.studentId;
        this.teacher_id = obj.teacherId;
        this.booking_id = obj.bookingId;
        this.date = fullDate(obj.date, obj.dateValidation);
        this.end_time = fullDate(obj.endTime, null, obj.endDate);
        this.sequence = obj.sequence;
        this.student = obj.student;
        this.capacity = obj.capacity;
        this.feedback = obj.feedback;
    }
}

class Bookings2 {
    constructor(obj) {
        this.studentId = obj.student_id;
        this.teacherId = obj.teacher_id;
        this.bookingId = obj.booking_id;
        this.date = obj.date;
        this.endTime = obj.end_time;
        this.sequence = obj.sequence;
        this.student = obj.student;
        this.capacity = obj.capacity;
        this.feedback = obj.feedback;
    }
}

class YogaPoses {
    constructor(obj) {
        this.pose_id = obj.poseId;
        this.pose_name = obj.poseName;
        this.sanskrit_name = obj.sanskritName;
        this.pose_type = obj.poseType;
        this.contra_indications = obj.contraIndications;

        this.poseId = obj.pose_id;
        this.poseName = obj.pose_name;
        this.sanskritName = obj.sanskrit_name;
        this.poseType = obj.pose_type;
        this.contraIndications = obj.contra_indications;

        this.image = obj.image;
        this.benefits = obj.benefits;
    }

}

module.exports = { StudentDetails, TeacherDetails, Bookings, Bookings2, YogaPoses, fullDate }