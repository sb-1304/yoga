import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBRow } from 'mdb-react-ui-kit';

import { DELETE, PUT } from '../Apis/Apis';
import CONSTANTS from '../CONSTANTS.json';
import { useSelector } from 'react-redux';
import DateTimePicker from './DateTimePicker';

export default function ClassCard({ date, endTime, student, setModal, setFun, bookingId, ViewBookings, teacherId, teacherName,
    key, capacity, ...rest }) {
    const { user } = useSelector(_ => _);

    const newDate = new Date(date);
    const startTime = newDate.toLocaleTimeString();
    const eTime = new Date(endTime).toLocaleTimeString();

    const handleDelete = async () => {
        const url = CONSTANTS.DELETE_BOOKING.concat('/', bookingId);
        const f = async () => {
            const data = await DELETE(url);
            if (data) {
                alert(data);
                ViewBookings({ teacherName: teacherId });
            }
        }
        setFun({ fun: f });
        setModal(true);
    };

    const handleConfirm = async () => {
        const f = async () => {
            const data = await PUT(CONSTANTS.UPDATE_BOOKING, {
                bookingId, date, studentId: user.username,
                teacherId, endTime, student: user.student
            });
            if (data) {
                alert(data);
                ViewBookings({ teacherName: teacherId });
            }
        }
        setFun({ fun: f });
        setModal(true);
    };

    return (
        <MDBCard key={key} id={key}>
            <MDBCardBody>
                <MDBRow size='12'>
                    <MDBCol size='10'>

                        <DateTimePicker
                            date={newDate}
                            startTime={startTime}
                            endTime={eTime}
                            disabled={true}
                        />
                    </MDBCol>

                    <MDBCol size='10'>
                        Capacity: {capacity}
                        {student ? '  Teacher: ' + teacherName : <></>}
                    </MDBCol>

                    <MDBCol size='2'>
                        {
                            student ?
                                <MDBBtn color='primary' className='me-2' onClick={handleConfirm}>Book</MDBBtn>
                                :
                                <MDBBtn color='danger' className='me-2' onClick={handleDelete}>Delete</MDBBtn>
                        }
                    </MDBCol>
                </MDBRow>
            </MDBCardBody>

        </MDBCard>
    );
}