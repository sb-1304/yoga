import React from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBBtn,
    MDBTypography,
    MDBNavbarLink
} from 'mdb-react-ui-kit';

import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../Redux/loginSlicer'


export default function CustomNavBar() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    return (
        <MDBNavbar sticky dark bgColor='primary'>
            <MDBContainer fluid className='d-flex flex-row'>
                <MDBNavbarBrand>
                    <MDBTypography color='light' className='fst-italic fw-bold' tag='h3'>Yoga Planner</MDBTypography>
                </MDBNavbarBrand>

                <div tag="form" className='d-flex'>
                    {user.username ? < >
                        <MDBTypography color='light' className='topmargin15'>Welcome {user.name}!</MDBTypography>
                        <MDBNavbarLink>
                            <MDBBtn color='light' rippleColor='dark' onClick={() => dispatch(deleteUser())}>Log Out</MDBBtn>
                        </MDBNavbarLink>

                    </> : <></>}
                </div>

            </MDBContainer>
        </MDBNavbar>
    );
}