import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBTypography } from 'mdb-react-ui-kit';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { PUT } from "../Apis/Apis"
import CONSTANTS from "../CONSTANTS.json";
import { setUser, setLoadingFalse, setLoadingTrue } from "../Redux/loginSlicer";
import MultipleSelect from '../Components/MultipleSelect';

export default function Profile() {

    const user = useSelector(_ => _.user);
    const dispatch = useDispatch();
    const [name, setName] = useState(user.name ? user.name : '');
    const [username, setUsername] = useState(user.username ? user.username : '');
    const [dob, setDOB] = useState(user.dob ? user.dob : '');
    const [gender, setGender] = useState(user.gender ? user.gender : '');
    const [level, setLevel] = useState(user?.level ? user.level : '');
    const [benefits, setBenefits] = useState(user?.benefits ? user.benefits : []);
    const [contraIndications, setContraIndications] = useState(user?.contraIndications ? user.contraIndications : []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = user.student ? CONSTANTS.STUDENT_UPDATE_DETAILS : CONSTANTS.TEACHER_UPDATE_DETAILS;

        dispatch(setLoadingTrue());
        const data = await PUT(url, { name, username, dob, student: user.student, level, benefits, contraIndications });

        if (data) {
            dispatch(setUser({ ...data, student: user.student }));
            alert('Details updated successfully.');
        }
        dispatch(setLoadingFalse());
    }

    return (<>

        <form id="profileForm" onSubmit={handleSubmit}>

            <MDBTypography tag='div' className='display-5 pb-3 mb-3 border-bottom'>
                User Details
            </MDBTypography>

            <div className='topmargin15'>
                <label htmlFor='name' className="form-label col-sm-2">Name<span style={{ color: "red" }}>*</span></label>
                <TextField id="name" className="col-sm-8" size="small" placeholder='Enter Name' required={true}
                    value={name} onChange={_ => setName(_.target.value)} />
            </div>

            <div className='topmargin15'>
                <label htmlFor='username' className="form-label col-sm-2">Email Id<span style={{ color: "red" }}>*</span></label>
                <TextField id="username" className="col-sm-8" size="small" placeholder='Enter Email Id' disabled required={true}
                    value={username} onChange={_ => setUsername(_.target.value)} />
            </div>

            <div className='topmargin15'>
                <label htmlFor='dob' className="form-label col-sm-2">Date of Birth<span style={{ color: "red" }}>*</span></label>
                <TextField id="dob" className="col-sm-8" size="small" placeholder='Enter DOB' type="date" disabled required={true}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    value={dob} onChange={_ => setDOB(_.target.value)} />
            </div>

            <div className='topmargin15'>
                <label htmlFor='gender' className="form-label col-sm-2">Gender<span style={{ color: "red" }}>*</span></label>
                <TextField id="gender" className="col-sm-8" size="small" placeholder='Enter Gender' disabled required={true}
                    value={gender} onChange={_ => setGender(_.target.value)} />
            </div>

            {user.student ?
                <>
                    <div className='topmargin15'>
                        <label htmlFor="level" className="form-label col-2">Level<span style={{ color: "red" }}>*</span></label>
                        <Select
                            size="small"
                            required={true}
                            placeholder='Select Level'
                            className="col-8"
                            id="level"
                            value={level}
                            onChange={e => {
                                console.log(e);
                                setLevel(e.target.value)
                            }}
                        >
                            {CONSTANTS.LEVELS.map(_ => <MenuItem key={_} value={_}>{_}</MenuItem>)}
                        </Select>
                    </div>

                    <div className='topmargin15'>
                        <label htmlFor="benefits" className="form-label col-sm-2">Interests<span style={{ color: "red" }}>*</span></label>
                        <MultipleSelect
                            className="col-sm-8"
                            required={true}
                            id="benefits"
                            list={CONSTANTS.BENEFITS}
                            value={benefits}
                            setter={setBenefits}
                        />
                    </div>

                    <div className='topmargin15'>
                        <label htmlFor="contraIndications" className="form-label col-sm-2">Risk factors<span style={{ color: "red" }}>*</span></label>
                        <MultipleSelect
                            className="col-sm-8"
                            id="contraIndications"
                            required={true}
                            list={CONSTANTS.CONTRA_INDICATIONS}
                            value={contraIndications}
                            setter={setContraIndications}
                        />
                    </div>
                </>
                :
                <></>
            }

            <button className='btn btn-primary button topmargin15' type="submit">Update Details</button>
        </form>
    </>);
}