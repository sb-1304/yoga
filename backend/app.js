var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { PORT } = require('./setupFiles/config.json');
const errorHandler = require('./setupFiles/errorHandler');

const userRouter = require('./routes/userRouter');
const studentRouter = require('./routes/studentRouter');
const teacherRouter = require('./routes/teacherRouter');

var app = express();

// Increase the size limit to 10MB
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/student', studentRouter)
app.use('/teacher', teacherRouter)

app.use(errorHandler);

//Express server running port
app.listen(PORT, () => console.log('Server listening on http://localhost:' + PORT + '/'));
module.exports = app;
