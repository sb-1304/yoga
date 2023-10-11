import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCol,
    MDBRow,
    MDBCardImage,
    MDBCardSubTitle,
    MDBCardFooter,
    MDBBtn,
    MDBCardHeader,
} from 'mdb-react-ui-kit';

import { DELETE } from "../Apis/Apis"
import CONSTANTS from "../CONSTANTS.json";
import { displayMultipleText } from '../common';

export default function AsanasCard({ poseId, poseName, sanskritName, poseType, benefits, contraIndications, image, getAllAsanas
    , handleAddAsanas, setFun, setModal }) {

    const handleDelete = async (event) => {
        const id = event.target.id;
        const url = CONSTANTS.DELETE_ASANA.concat('/', id);
        const f = async () => {
            const data = await DELETE(url);
            if (data) {
                alert(data);
                getAllAsanas();
            }
        };
        setFun({ fun: f });
        setModal(true);
    }

    const handleEdit = () => {
        handleAddAsanas('edit', { poseId, poseName, sanskritName, poseType, benefits, contraIndications, image });
    }

    return (

        <MDBCol sm='11'>
            <MDBCard>
                <MDBRow className='g-0'>
                    <MDBCol md='4' className='alignCenter'>
                        <MDBCardImage className='displayImageCard' src={image} alt='Yoga Pose' fluid />
                    </MDBCol>
                    <MDBCol md='8'>
                        <MDBCardBody>
                            <MDBCardHeader className='card-header'>
                                <MDBCardTitle>Pose Name: {poseName}</MDBCardTitle>
                                <MDBCardSubTitle>Sanskrit Name: {sanskritName}</MDBCardSubTitle>
                            </MDBCardHeader>

                            <MDBCardText>
                                Pose Type: {displayMultipleText(poseType)}
                            </MDBCardText>

                            <MDBCardText>
                                Interests: {displayMultipleText(benefits)}
                            </MDBCardText>

                            <MDBCardText>
                                Risk factors: {displayMultipleText(contraIndications)}
                            </MDBCardText>

                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
                <MDBCardFooter className="d-flex flex-row-reverse">
                    <MDBBtn className='me-1' color='danger' id={poseId} onClick={handleDelete}>Delete Asana</MDBBtn>
                    <MDBBtn className='me-1' onClick={handleEdit}>Edit Asana</MDBBtn>
                </MDBCardFooter>
            </MDBCard>
        </MDBCol>
    );
}