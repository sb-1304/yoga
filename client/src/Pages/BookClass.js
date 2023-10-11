import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { GET } from "../Apis/Apis"
import CONSTANTS from "../CONSTANTS.json";
import ClassCard from '../Components/ClassCard';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setTeacherStudentDetails } from '../Redux/appData';
import PopUpModal from '../Components/PopUpModal';

export default function BookClass() {

    const dispatch = useDispatch();
    const { appData } = useSelector(_ => _);
    const [teacherDetails, setTeacherDetails] = useState(appData.teacherDetails);
    const [studentDetails, setStudentDetails] = useState(appData.studentDetails);
    const [asanasDetails, setAsanasDetails] = useState(appData.asanasDetails);

    const [modal, setModal] = useState(false);
    const [fun, setFun] = useState(null);

    const [classDisplay, setClassDisplay] = useState();
    const [teacher, setTeacher] = useState(teacherDetails?.username ? teacherDetails.username : '');

    const setDisplay = (newData) => {
        setClassDisplay(newData.length ?
            newData.map((_, i) =>
                <ClassCard
                    key={'class' + i}
                    setFun={setFun}
                    setModal={setModal}
                    student={true}
                    ViewBookings={ViewTeacherBookings}
                    {..._}
                />
            )
            :
            <></>
        );
    }

    const ViewTeacherBookings = async ({ teacherName }) => {
        const data = await GET(CONSTANTS.GET_ALL_BOOKINGS.concat("?", "student=", false, "&id=", teacherName ? teacherName : teacher));
        const newData = data.filter(_ => !_.studentId && _.capacity > 0);
        setDisplay(newData)
    }

    const getAllTeachersStudentDetails = async () => {
        setTeacherDetails(await GET(CONSTANTS.GET_ALL_TEACHERS));
        setStudentDetails(await GET(CONSTANTS.GET_ALL_STUDENTS));
        setAsanasDetails(await GET(CONSTANTS.GET_ALL_ASANAS));
        dispatch(setTeacherStudentDetails({ teacherDetails, studentDetails, asanasDetails }));
    }


    useEffect(() => {
        getAllTeachersStudentDetails();
    }, []);

    return (
        <>
            <MDBContainer>

                <MDBTypography tag='div' className='display-5 pb-3 mb-3 border-bottom'>
                    Available Classes
                </MDBTypography>

                <MDBRow className='mb-3'>

                    <MDBCol size='3'>
                        <label htmlFor='teacher'>Teacher</label>
                        <Select
                            className='leftMargin customWidth'
                            size="small"
                            id="teacher"
                            value={teacher}
                            onChange={e => {
                                setTeacher(e.target.value);
                                ViewTeacherBookings({ teacherName: e.target.value });
                            }}
                        >
                            {teacherDetails && teacherDetails.map(_ => <MenuItem key={_.username} value={_.username}>{_.name}</MenuItem>)}
                        </Select>
                    </MDBCol>

                </MDBRow>

                <MDBRow>
                    {classDisplay && classDisplay.length ?
                        <>
                            <MDBCol size={12}>
                                {classDisplay}
                            </MDBCol>
                        </>
                        :
                        <>{teacher ? <MDBTypography className='topmargin15 display-6 leftMargin2'>No Classes Scheduled by the teacher</MDBTypography> : <></>}</>
                    }
                </MDBRow>

                <PopUpModal
                    title='Confirmation'
                    message='Are you sure?'
                    singleButton={false}
                    popup={modal}
                    toggle={setModal}
                    callback={fun}
                />
            </MDBContainer >
        </>
    );
}