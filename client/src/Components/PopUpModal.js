import React, { useEffect } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';

export default function PopUpModal({ popup, singleButton, title, message, callback, toggle }) {


    const toggleShow = () => {
        toggle(!popup);
    }

    const handleClick = () => {
        toggleShow();
        callback.fun();
    }

    useEffect(() => {
        toggle(popup);
    }, [popup])

    return (
        <>
            <MDBModal show={popup} setShow={toggle} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>{title}</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>{message}</MDBModalBody>

                        <MDBModalFooter>
                            {singleButton ?
                                <>
                                    <MDBBtn color='primary' onClick={toggleShow}>
                                        Ok
                                    </MDBBtn>
                                </>
                                :
                                <>
                                    <MDBBtn color='secondary' onClick={toggleShow}>
                                        No
                                    </MDBBtn>
                                    <MDBBtn onClick={handleClick}>Yes</MDBBtn>
                                </>
                            }
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}