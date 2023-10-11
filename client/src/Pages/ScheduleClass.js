import React, { useEffect, useState } from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBTypography,
    MDBRow
} from 'mdb-react-ui-kit';

import { useSelector, useDispatch } from 'react-redux'
import DateTimePicker from '../Components/DateTimePicker';
import { GET, POST } from '../Apis/Apis';
import { setLoadingFalse, setLoadingTrue } from "../Redux/loginSlicer";
import CONSTANTS from "../CONSTANTS.json";
import ClassCard from '../Components/ClassCard';
import PopUpModal from '../Components/PopUpModal';
import CustomTextField from '../Components/CustomTextField';


export default function ScheduleClass() {
    const { user } = useSelector(state => state);
    const dispatch = useDispatch();

    const [Display, setDisplay] = useState();
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [capacity, setCapacity] = useState();

    const [modal, setModal] = useState(false);
    const [fun, setFun] = useState(null);

    const scheduleClass = async () => {

        let [startHours, startMinutes] = startTime.split(':');

        date.setHours(startHours);
        date.setMinutes(startMinutes);
        date.setSeconds(0);


        let [endHours, endMinutes] = endTime.split(':');
        const newDate = new Date(date);

        newDate.setHours(endHours);
        newDate.setMinutes(endMinutes);
        newDate.setSeconds(0);

        if (newDate < date) {
            alert('End Time should be greater than Start Time.');
            return false;
        }

        dispatch(setLoadingTrue());
        const data = await POST(CONSTANTS.CREATE_BOOKING, { date, teacherId: user.username, endTime: newDate, capacity });

        if (data) {
            alert(data);
            ViewBookings();
        }
        dispatch(setLoadingFalse());
    }

    const ViewBookings = async () => {
        const data = await GET(CONSTANTS.GET_ALL_BOOKINGS.concat("?", "student=", user.student, "&id=", user.username));
        const newData = data.filter(_ => !_.studentId);

        setDisplay(newData.length ?
            newData.map((_, i) =>
                <ClassCard
                    setFun={setFun}
                    setModal={setModal}
                    student={user.student}
                    ViewBookings={ViewBookings}
                    {..._}
                />
            )
            :
            <MDBTypography className='topmargin15 display-6 leftMargin2'>No Classes Scheduled</MDBTypography>
        );
    }

    useEffect(() => {
        ViewBookings();
    }, []);

    return (
        <>
            <MDBContainer>

                <MDBTypography tag='div' className='display-5 pb-3 mb-3 border-bottom'>
                    Schedule Class
                </MDBTypography>

                <MDBRow className='mb-3'>
                    <MDBCol size='10'>
                        <DateTimePicker
                            id='date'
                            className="datePicker"
                            date={date}
                            setDate={setDate}
                            startTime={startTime}
                            setStartTime={setStartTime}
                            endTime={endTime}
                            setEndTime={setEndTime}
                        />
                        <label htmlFor='capacity' className='leftMargin'>Capacity</label>
                        <input
                            id="capacity"
                            value={capacity}
                            onChange={_ => setCapacity(_.target.value)}
                            placeholder="Enter Capacity"
                            type="number"
                        />
                    </MDBCol>


                    <MDBCol size='2'>
                        <button className='btn btn-primary' onClick={scheduleClass}>Schedule</button>
                    </MDBCol>

                </MDBRow>

                <MDBTypography tag='div' className='display-5 pb-3 mb-3 border-bottom topMargin15'>
                </MDBTypography>


                <MDBTypography tag='div' className='display-5 pb-3 mb-3 border-bottom topMargin15 d-flex justify-content-between'>
                    Classes Scheduled
                    <MDBCol tag='span' size='5' className='me-2'>
                        <button className='btn btn-primary leftMargin' onClick={ViewBookings}>Refresh</button>
                    </MDBCol>
                </MDBTypography>
                <MDBCol size='11'>
                    {Display}
                </MDBCol>

                <PopUpModal
                    title='Confirmation'
                    message='Are you sure?'
                    singleButton={false}
                    popup={modal}
                    toggle={setModal}
                    callback={fun}
                />

            </MDBContainer>
        </>
    );
}