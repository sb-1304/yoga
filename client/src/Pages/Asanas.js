import { useEffect, useState } from 'react';
import { MDBCol, MDBRow, MDBTypography, MDBContainer, MDBBtn } from 'mdb-react-ui-kit';

import { GET } from "../Apis/Apis"
import CONSTANTS from "../CONSTANTS.json";
import AddAsanas from '../Components/AsanasPopup';
import AsanasCard from '../Components/AsanasCard';
import SearchFilter from '../Components/SearchFilter';
import { setAsanas } from '../Redux/appData';
import { useSelector, useDispatch } from 'react-redux';
import PopUpModal from '../Components/PopUpModal';

export default function Asanas() {

    const { appData } = useSelector(_ => _);
    const dispatch = useDispatch();

    const [displayData, setDispalyData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupPayload, setPopupPayload] = useState({});
    const [asanasData, setAsanasData] = useState(appData.asanasData);

    const [modal, setModal] = useState(false);
    const [fun, setFun] = useState(null);

    const [search, setSearch] = useState('');
    const [poseType, setPoseType] = useState([]);
    const [benefits, setBenefits] = useState([]);
    const [contraIndications, setContraIndications] = useState([]);

    const resetSearchFilter = () => {
        setSearch('');
        setPoseType([]);
        setBenefits([]);
        setContraIndications([]);
        displayDataFunction(asanasData);
    }

    const handleSearchFilter = ({ sortTrue, sortOrder, searchTrue }) => {
        let tempData = JSON.parse(JSON.stringify(asanasData));

        if (searchTrue) {
            if (search) {
                tempData = tempData.filter((ele, i) => {
                    if (ele.poseName.toLowerCase().includes(search.trim().toLowerCase()) ||
                        ele.sanskritName.toLowerCase().includes(search.trim().toLocaleLowerCase())) {
                        return true;
                    }
                    return false;
                });
            }

            if (poseType.length) {
                tempData = tempData.filter((ele, i) => {
                    let returnTrue;
                    for (const pose of poseType) {
                        const val = ele.poseType.includes(pose);
                        if (!val) {
                            returnTrue = true;
                            break;
                        }
                    }
                    if (returnTrue) return false;
                    return true;
                })
            }

            if (benefits.length) {
                tempData = tempData.filter((ele, i) => {
                    let returnTrue;
                    for (const benefit of benefits) {
                        const val = ele.benefits.includes(benefit);
                        if (!val) {
                            returnTrue = true;
                            break;
                        }
                    }
                    if (returnTrue) return false;
                    return true;
                })
            }

            if (contraIndications.length) {
                tempData = tempData.filter((ele, i) => {
                    let returnTrue;
                    for (const iterator of contraIndications) {
                        const val = ele.contraIndications.includes(iterator);
                        if (!val) {
                            returnTrue = true;
                            break;
                        }
                    }
                    if (returnTrue) return false;
                    return true;
                })
            }

        }

        if (sortTrue) {
            tempData = tempData.sort((a, b) => sortOrder ?
                a.poseName.localeCompare(b.poseName) :
                -a.poseName.localeCompare(b.poseName));
        }

        displayDataFunction(tempData);
    }


    const displayDataFunction = (data) => {
        setDispalyData(data.length ?
            data.map((_, i) =>
                <AsanasCard key={_.poseId} {..._} getAllAsanas={getAllAsanas}
                    handleAddAsanas={handleAddAsanas}
                    closePopup={closePopup}
                    setFun={setFun}
                    setModal={setModal}
                />) :
            <MDBTypography className='topmargin15 display-6 leftMargin2'>No Asanas Found</MDBTypography>
        )
    }

    const getAllAsanas = async () => {
        const data = await GET(CONSTANTS.GET_ALL_ASANAS);
        setAsanasData(data);
        dispatch(setAsanas(data));
        handleSearchFilter({ sortTrue: true, sortOrder: true });
    }

    const handleAddAsanas = (action, payload = {}) => {
        const title = action === 'add' ? 'Add Asana' : 'Edit Asana';
        setPopupPayload({ ...payload, title, getAllAsanas });
        setShowPopup(true);
    }

    const closePopup = () => {
        setShowPopup(false);
        setPopupPayload({});
    }

    useEffect(() => {
        setAsanasData(appData.asanasData);
        getAllAsanas();
    }, [])

    return (<>
        <MDBContainer>
            <AddAsanas closePopup={closePopup} showPopup={showPopup} payload={popupPayload} />

            <MDBTypography tag='div' className='display-5 pb-3 mb-3 border-bottom'>
                <MDBRow>
                    <MDBCol size='7'>
                        View Asanas
                    </MDBCol>
                    <MDBCol size='5'>
                        <MDBBtn className='me-1' onClick={() => handleAddAsanas('add')}>+ Add Asanas</MDBBtn>
                        <MDBBtn color='secondary' className='me-1' onClick={() => getAllAsanas()}>Refresh Asanas</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBTypography>

            <SearchFilter
                filterButtonAction={handleSearchFilter}
                resetButtonAction={resetSearchFilter}
                searchField={search}
                setSearchField={setSearch}
                poseType={poseType}
                setPoseType={setPoseType}
                benefits={benefits}
                setBenefits={setBenefits}
                contraIndications={contraIndications}
                setContraIndications={setContraIndications}
            />

            <MDBContainer fluid>
                {displayData}
            </MDBContainer>

            <PopUpModal
                title='Confirmation'
                message='Are you sure?'
                singleButton={false}
                popup={modal}
                toggle={setModal}
                callback={fun}
            />
        </MDBContainer>
    </>)
}