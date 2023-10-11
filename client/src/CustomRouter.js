
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux'
import { MDBSpinner } from 'mdb-react-ui-kit';

import CustomNavBar from "./Components/CustomNavBar";
import Home from "./Pages/Home";
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";

export const CustomRouter = () => {
    const user = useSelector(state => state.user);
    return <Router>
        <CustomNavBar />
        {user.loading ?
            <div className='d-flex justify-content-center align-items-center spinner'>
                <MDBSpinner color='primary' role='status' style={{ width: '3rem', height: '3rem' }} />
            </div> : <>
                <Routes>
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </>
        }
    </Router >
}