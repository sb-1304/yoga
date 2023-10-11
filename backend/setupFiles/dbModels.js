const { DataTypes } = require('sequelize');

async function models(sequelize) {
    const models = {};

    const Student = {
        username: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
        password: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        dob: { type: DataTypes.DATEONLY, allowNull: false },
        gender: { type: DataTypes.STRING, allowNull: false },
        level: { type: DataTypes.STRING, allowNull: true },
        benefits: { type: DataTypes.JSON, allowNull: true, defaultValue: [] },
        contra_indications: { type: DataTypes.JSON, allowNull: true, defaultValue: [] },
        verified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
    };

    const Teacher = {
        username: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
        password: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        dob: { type: DataTypes.DATEONLY, allowNull: false },
        gender: { type: DataTypes.STRING, allowNull: false },
        verified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
    }

    const Booking = {
        booking_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        date: { type: DataTypes.DATE, allowNull: true },
        end_time: { type: DataTypes.DATE, allowNull: true },
        sequence: { type: DataTypes.JSON, allowNull: true, defaultValue: [] },
        capacity: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 10 },
        feedback: { type: DataTypes.STRING, allowNull: true },
    }

    const YogaPose = {
        pose_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        image: { type: DataTypes.STRING, allowNull: true },
        pose_name: { type: DataTypes.STRING, allowNull: false },
        sanskrit_name: { type: DataTypes.STRING, allowNull: false },
        pose_type: { type: DataTypes.JSON, allowNull: false },
        benefits: { type: DataTypes.JSON, allowNull: true, defaultValue: [] },
        contra_indications: { type: DataTypes.JSON, allowNull: true, defaultValue: [] }
    }

    //Defining and Initialising Models
    models.Students = await sequelize.define('Students', Student, {
        timestamps: false,
        freezeTableName: true
    });

    models.Teachers = await sequelize.define('Teachers', Teacher, {
        timestamps: false,
        freezeTableName: true
    });

    models.Bookings = await sequelize.define('Bookings', Booking, {
        timestamps: false,
        freezeTableName: true
    });

    models.YogaPoses = await sequelize.define('YogaPoses', YogaPose, {
        timestamps: false,
        freezeTableName: true
    });

    //Adding foreign keys to Models
    models.Students.hasOne(models.Bookings, { foreignKey: 'student_id', onDelete: 'SET NULL', allowNull: true });
    models.Teachers.hasOne(models.Bookings, { foreignKey: 'teacher_id', onDelete: 'SET NULL' });

    return models
}

module.exports = models;