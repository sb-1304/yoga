const { STATUS_CODES, BAD_REQUEST, UNAUTHORISED } = require('./config.json');

const errorHandler = (error, req, res, next) => {
    try {
        // console.log("In Error Handler ********** ", error.message, BAD_REQUEST, error.message === BAD_REQUEST);
        switch (true) {
            case error.message === BAD_REQUEST:
                res.status(STATUS_CODES.BAD_REQUEST).send(error.cause);
                break;

            case error.message === UNAUTHORISED:
                res.status(STATUS_CODES.UNAUTHORISED).send(error.cause);
                break;

            default:
                console.log("\nDefault Error in Handler **********  ", error);
                res.status(STATUS_CODES.INTERNAL_SERVER).send(error.message);
        }

    } catch (error) {
        console.log("\nError Handler Error **********  ", error);
        res.status(STATUS_CODES.INTERNAL_SERVER).send("Internal Server Error.");
    }
}

module.exports = errorHandler;