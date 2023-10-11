import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'; import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBCol,
    MDBCardImage,
    MDBRow
} from 'mdb-react-ui-kit';
import TextField from '@mui/material/TextField';

import { POST, PUT } from "../Apis/Apis"
import CONSTANTS from "../CONSTANTS.json";
import { setLoadingFalse, setLoadingTrue } from "../Redux/loginSlicer";
import MultipleSelect from './MultipleSelect';
import { uploadImage } from '../Apis/Firebase';

export default function AsanasPopup({ closePopup, showPopup, payload }) {

    const dispatch = useDispatch();
    const [poseName, setPoseName] = useState(payload?.poseName ? payload.poseName : '');
    const [sanskritName, setSanskritName] = useState(payload?.sanskritName ? payload.sanskritName : '');
    const [poseType, setPoseType] = useState(payload?.poseType ? payload.poseType : []);
    const [benefits, setBenefits] = useState(payload?.benefits ? payload.benefits : []);
    const [contraIndications, setContraIndications] = useState(payload?.contraIndications ? payload.contraIndications : []);
    const [imageUrl, setImageUrl] = useState(payload?.image ? payload.image : '');
    const [image, setImage] = useState(null);
    const [newImage, setNewImage] = useState(false);
    let uploadedImage = null;

    useEffect(() => {
        setPoseName(payload?.poseName ? payload.poseName : '');
        setSanskritName(payload?.sanskritName ? payload.sanskritName : '');
        setPoseType(payload?.poseType ? payload.poseType : []);
        setBenefits(payload?.benefits ? payload.benefits : []);
        setContraIndications(payload?.contraIndications ? payload.contraIndications : []);
        setImageUrl(payload?.image ? payload.image : '');
    }, [payload, showPopup])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let url;

        if (newImage) {
            url = await uploadImage(image);
        }

        const newUrl = url ? url : imageUrl;

        dispatch(setLoadingTrue());
        let data;
        if (payload.title === 'Add Asana') {
            data = await POST(CONSTANTS.ADD_ASANAS, { poseName, sanskritName, poseType, benefits, contraIndications, image: newUrl });
        } else {
            data = await PUT(CONSTANTS.UPDATE_ASANAS, { poseId: payload.poseId, poseName, sanskritName, poseType, benefits, contraIndications, image: newUrl });
        }

        if (data) {
            alert(data.message);
            closePopup();

        }
        dispatch(setLoadingFalse());

    }

    function handleChange(event) {
        const uploadedFiles = event.target.files;
        filesDisplay(uploadedFiles)
    }

    const filesDisplay = (newFiles) => {
        uploadedImage = newFiles[0];

        if (!uploadedImage.type.startsWith("image/")) {
            alert("Invalid Image Type")
            return;
        }

        setNewImage(true);
        setImage(uploadedImage);

        const reader = new FileReader();
        reader.onload = (e) => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(uploadedImage);

    }

    return (<>
        <MDBModal show={showPopup} setShow={() => closePopup} tabIndex='-1'>
            <MDBModalDialog size="xl">
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>{payload.title}</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={() => closePopup()}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>

                        <div id="addAsanasForm">
                            <MDBRow className='leftMargin2 topmargin15'>
                                <MDBCol size='2'>
                                    <div className='displayImage alignCenter'>
                                        <MDBCardImage id="displayImage" src={imageUrl}
                                            alt='Yoga Pose' fluid />

                                    </div>
                                </MDBCol>
                                <MDBCol size='5'>
                                    <div>
                                        <label htmlFor='image'> Browse images  </label>
                                        <input
                                            type="file"
                                            id='image'
                                            accept='.png, .jpg, .jpeg'
                                            onChange={handleChange}
                                        />
                                    </div>
                                </MDBCol>
                            </MDBRow>

                            <div className='topmargin15'>
                                <label htmlFor='posename' className="form-label col-sm-2">Pose Name</label>
                                <TextField id="posename" value={poseName} className="col-sm-8" size="small" placeholder='Enter Pose Name'
                                    onChange={_ => setPoseName(_.target.value)} />
                            </div>

                            <div className='topmargin15'>
                                <label htmlFor='sanskritName' className="form-label col-sm-2">Sanskrit Name</label>
                                <TextField id="sanskritName" value={sanskritName} className="col-sm-8" size="small" placeholder='Enter Sanskrit Name'
                                    onChange={_ => setSanskritName(_.target.value)} />

                            </div>

                            <div className='topmargin15'>
                                <label htmlFor="postType" className="form-label col-2">Pose Type</label>
                                <MultipleSelect
                                    className="col-sm-8"
                                    id="pose"
                                    list={CONSTANTS.POSE_TYPE}
                                    value={poseType}
                                    setter={setPoseType}
                                />
                            </div>

                            <div className='topmargin15'>
                                <label htmlFor="benefits" className="form-label col-sm-2">Interests</label>
                                <MultipleSelect
                                    className="col-sm-8"
                                    id="benefits"
                                    list={CONSTANTS.BENEFITS}
                                    value={benefits}
                                    setter={setBenefits}
                                />
                            </div>

                            <div className='topmargin15'>
                                <label htmlFor="contraIndications" className="form-label col-sm-2">Risk factors</label>
                                <MultipleSelect
                                    className="col-sm-8"
                                    id="contraIndications"
                                    list={CONSTANTS.CONTRA_INDICATIONS}
                                    value={contraIndications}
                                    setter={setContraIndications}
                                />
                            </div>

                        </div >

                    </MDBModalBody>

                    <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={() => closePopup()}>
                            Close
                        </MDBBtn>
                        <MDBBtn onClick={handleSubmit}>Save</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal >

    </>);
}