import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    MDBRow,
    MDBCol,
    MDBTypography,
    MDBContainer,
    MDBBtn
} from 'mdb-react-ui-kit';

import { GET } from "../Apis/Apis"
import CONSTANTS from "../CONSTANTS.json";
import BookingCard from "../Components/BookingCard";
import { setTeacherStudentDetails } from '../Redux/appData';
import PopUpModal from '../Components/PopUpModal';

export default function PreviousBookings() {

    const dispatch = useDispatch();
    const { user, appData } = useSelector(_ => _);
    const [previousBookings, setPreviousBookings] = useState();
    const [teacherDetails, setTeacherDetails] = useState(appData.teacherDetails);
    const [studentDetails, setStudentDetails] = useState(appData.studentDetails);
    const [asanasDetails, setAsanasDetails] = useState(appData.asanasDetails);

    const [modal, setModal] = useState(false);
    const [fun, setFun] = useState(null);

    const ViewBookings = async () => {
        const data = await GET(CONSTANTS.GET_ALL_BOOKINGS.concat("?", "student=", user.student, "&id=", user.username));

        const prevData = data.filter(_ => _.studentId && new Date(_.endTime) < new Date());


        setPreviousBookings(prevData.length ?
            prevData.map((_, i) =>
                <BookingCard
                    classes={"sm-7"}
                    key={i}
                    Title={'Booking ' + Number(i + 1)}
                    ViewBookings={ViewBookings}
                    student={user.student}
                    teacherDetails={teacherDetails}
                    asanasDetails={asanasDetails}
                    setFun={setFun}
                    setModal={setModal}
                    previous={true}
                    {..._}
                />)
            :
            <MDBTypography className='topmargin15 display-7 leftMargin2'>No Previous Bookings Found</MDBTypography>
        );
    }

    const getAllTeachersStudentDetails = async () => {
        setTeacherDetails(await GET(CONSTANTS.GET_ALL_TEACHERS));
        setStudentDetails(await GET(CONSTANTS.GET_ALL_STUDENTS));
        setAsanasDetails(await GET(CONSTANTS.GET_ALL_ASANAS));
        dispatch(setTeacherStudentDetails({ teacherDetails, studentDetails, asanasDetails }));
    }

    useEffect(() => {
        getAllTeachersStudentDetails();
        ViewBookings();
    }, []);

    return (
        <>
            <MDBContainer>
                <MDBTypography tag='div' className='display-5 pb-3 mb-3 border-bottom'>
                    <MDBRow>
                        <MDBCol size='8'>
                            Previous Bookings
                        </MDBCol>
                        <MDBCol size='3'>
                            <MDBBtn onClick={_ => ViewBookings()}>Refresh Bookings</MDBBtn></MDBCol>
                    </MDBRow>
                </MDBTypography>

                {previousBookings}


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
    )
}