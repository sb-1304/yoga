import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCol,
    MDBRow,
    MDBCardHeader,
    MDBCardFooter,
    MDBBtn,
    MDBTextArea
} from 'mdb-react-ui-kit';
import DateTimePicker from '../Components/DateTimePicker';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DELETE, GET, PUT } from '../Apis/Apis';
import { setLoadingFalse, setLoadingTrue } from "../Redux/loginSlicer";
import CONSTANTS from '../CONSTANTS.json';
import { displayMultipleText, displayMultipleArray } from "../common";
import MultipleCheckboxes from './MultipleCheckboxes';

export default function BookingCard({ Title, date: selectedDate, endTime, studentDetails, teacherName, teacherId,
    teacherDetails: tDs, bookingId, ViewBookings, student, sequence: currentSequence, setFun, setModal,
    asanasDetails, previous, ...rest }) {

    const dispatch = useDispatch();
    const { user } = useSelector(_ => _);
    const [disable, setDisable] = useState(true);
    const [feedback, setFeedback] = useState('Not yet provided');
    const [sequence, setSequence] = useState(currentSequence);
    const [suggestions, setSuggestions] = useState([]);
    const [asanasData, setAsanasData] = useState([]);
    const [asanasList, setAsanasList] = useState([]);
    let data;

    const newDate = new Date(selectedDate);
    const startTime = newDate.toLocaleTimeString();
    const eTime = new Date(endTime).toLocaleTimeString();

    const handleSearchFilter = () => {
        let tempData = JSON.parse(JSON.stringify(asanasData));
        let newArray = [];
        let indexArray = [];

        tempData.forEach((ele, i) => {

            if (studentDetails.benefits.length) {
                let returnTrue;
                for (const iterator of studentDetails.benefits) {
                    const val = ele.benefits.includes(iterator);
                    if (val) {
                        ele.type = 'Benefits';
                        indexArray.push(i);
                        returnTrue = true;
                        break;
                    }
                }
                if (returnTrue) return;
            }

            if (studentDetails.contraIndications.length) {
                let returnTrue;
                for (const iterator of studentDetails.contraIndications) {
                    const val = ele.contraIndications.includes(iterator);
                    if (val) {
                        ele.type = 'Contra Indications';
                        indexArray.push(i);
                        returnTrue = true;
                        break;
                    }
                }
                if (returnTrue) return;
            }

        });


        const set = new Set(indexArray);
        indexArray = [...set];
        newArray = indexArray.map(_ => tempData[_]);
        setSuggestions(newArray);
    }

    const updateBooking = async () => {
        const newFeedback = feedback === 'Not yet provided' ? '' : feedback;
        dispatch(setLoadingTrue());
        const data = await PUT(CONSTANTS.UPDATE_BOOKING, {
            bookingId, date: selectedDate, sequence, studentId: studentDetails.username,
            teacherId, student: user.student, feedback: newFeedback
        });

        if (data) {
            alert(data);
        }
        dispatch(setLoadingFalse());
    }

    const handleTeacherDelete = async () => {
        const url = CONSTANTS.DELETE_BOOKING.concat('/', bookingId);

        const f = async () => {
            const data = await DELETE(url);
            if (data) {
                alert(data);
                ViewBookings();
            }
        }

        setFun({ fun: f });
        setModal(true);
    };

    const handleStudentDelete = async () => {
        const url = CONSTANTS.UPDATE_BOOKING;
        const payload = {
            bookingId, date: selectedDate, sequence, studentId: null,
            teacherId, endTime, student: user.student
        };

        const f = async () => {
            const data = await PUT(url, payload);
            if (data) {
                alert(data);
                ViewBookings();
            }
        }

        setFun({ fun: f });
        setModal(true);
    }

    const handleEdit = async () => {
        setDisable(!disable);
    };

    const handleClass = async () => {
        setDisable(!disable);
        handleSearchFilter();
    }

    const getAllAsanas = async () => {
        data = await GET(CONSTANTS.GET_ALL_ASANAS);
        setAsanasData(data);
        setAsanasList(data.map(_ => _.poseName));
    }

    useEffect(() => {
        getAllAsanas();
    }, [])

    return (
        <MDBCol sm='11'>
            <MDBCard>
                <MDBCardHeader>
                    <MDBCardTitle>{Title}</MDBCardTitle></MDBCardHeader>

                <MDBCardBody>
                    <MDBRow>
                        <MDBCol size='9'>
                            <DateTimePicker
                                date={newDate}
                                startTime={startTime}
                                endTime={eTime}
                                disabled={true}
                            />
                        </MDBCol>
                    </MDBRow>
                    <br />

                    {
                        !student ?
                            <>
                                <MDBCardTitle>Student Details:</MDBCardTitle>

                                <MDBRow>
                                    <MDBCol size='2'>Student Name</MDBCol>
                                    <MDBCol size='10'>{studentDetails.name}</MDBCol>
                                </MDBRow>

                                <MDBRow>
                                    <MDBCol size='2'>Level</MDBCol>
                                    <MDBCol size='10'>{studentDetails.level}</MDBCol>
                                </MDBRow>

                                <MDBRow>
                                    <MDBCol size='2'>Interests</MDBCol>
                                    <MDBCol size='10'>
                                        {displayMultipleText(studentDetails.benefits)}
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow>
                                    <MDBCol size='2'>Risk factors</MDBCol>
                                    <MDBCol size='10'>
                                        {displayMultipleText(studentDetails.contraIndications)}
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow>
                                    <MDBCol size='2'>Pose Sequence</MDBCol>
                                    <MDBCol size='10'>
                                        {
                                            disable ?
                                                <>
                                                    {displayMultipleText(sequence)}
                                                </>
                                                :
                                                <>
                                                    <MultipleCheckboxes
                                                        options={asanasList}
                                                        value={sequence}
                                                        setter={setSequence}
                                                    />
                                                </>
                                        }
                                    </MDBCol>
                                </MDBRow>


                                {
                                    !disable ?
                                        <MDBRow>
                                            <MDBCol size='2'>Suggestions</MDBCol>
                                            <MDBCol size='10'>
                                                {displayMultipleArray(suggestions, ['poseName'])}
                                            </MDBCol>
                                        </MDBRow>
                                        :
                                        <></>
                                }

                            </>
                            :
                            <>
                                <MDBRow>
                                    <MDBCol size='2'>
                                        <label htmlFor='teacher'>Teacher: </label>
                                    </MDBCol>
                                    <MDBCol size='3'>
                                        {' ' + teacherName}
                                    </MDBCol>
                                </MDBRow>
                            </>
                    }

                    {
                        previous ?
                            <MDBRow>
                                <MDBCol size='2' htmlFor='feedback'>Feedback:{'  '} </MDBCol>
                                <MDBCol size='7' htmlFor='feedback'>
                                    {
                                        student && !disable ?
                                            <MDBTextArea id='feedback' value={feedback} onChange={e => setFeedback(e.target.value)} />
                                            :
                                            <>{feedback}</>
                                    }
                                </MDBCol>
                            </MDBRow>
                            :
                            <></>
                    }

                </MDBCardBody>

                <MDBCardFooter className="d-flex flex-row-reverse">
                    {
                        disable ?
                            <>
                                {
                                    previous ?
                                        <>
                                            {student ? <MDBBtn className='me-1' onClick={handleClass}>Edit Class</MDBBtn> : <></>}
                                        </>
                                        :
                                        <>
                                            {student ? <></> : <MDBBtn className='me-1' onClick={handleClass}>Edit Class</MDBBtn>}
                                            <MDBBtn className='me-1' color='danger'
                                                onClick={student ? handleStudentDelete : handleTeacherDelete}
                                            >
                                                {student ? 'Cancel Booking' : 'Cancel Class'}
                                            </MDBBtn>
                                        </>
                                }
                            </>
                            :
                            <>
                                <MDBBtn className='me-1' onClick={handleEdit} color='secondary'>Close Edit</MDBBtn>
                                <MDBBtn className='me-1' onClick={updateBooking}>Update Details</MDBBtn>
                            </>
                    }
                </MDBCardFooter>
            </MDBCard>
        </MDBCol >
    );
}