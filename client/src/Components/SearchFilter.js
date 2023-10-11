import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit';
import InputLabel from '@mui/material/InputLabel';

import CustomTextField from './CustomTextField';
import { useEffect, useState } from 'react';
import MultipleSelect from './MultipleSelect';
import CONSTANTS from '../CONSTANTS.json';

export default function SearchFilter({ filterButtonAction, resetButtonAction, searchField, setSearchField, poseType, setPoseType,
    benefits, setBenefits, contraIndications, setContraIndications, ...rest }) {

    const [sortOrder, setSortOrder] = useState(true);

    useEffect(() => {

    }, [searchField])

    return (<>
        <MDBContainer fluid>
            <MDBRow>

                <MDBCol size={4}>
                    <InputLabel id='search'>Search</InputLabel>
                    <CustomTextField
                        value={searchField}
                        setter={setSearchField}
    
                        id='searchField'
                        placeholder='Search by Pose/Sanskrit Name'
                        size='small'
                        style={{ minWidth: '100%' }}
                    />
                </MDBCol>

                <MDBCol size={4}>
                    <MultipleSelect
                        id="poseType"
                        label="Pose Type"
                        list={CONSTANTS.POSE_TYPE}
                        value={poseType}
                        setter={setPoseType}
                        size='small'
                        style={{ minWidth: '100%' }}
                    />
                </MDBCol>

                <MDBCol size={4}>
                    <MDBBtn
                        tag='div'
                        color='light'
                        style={{ color: '#3b5998' }}
                        className='me-1'
                        onClick={() => {
                            setSortOrder(!sortOrder);
                            filterButtonAction({ sortTrue: true, sortOrder });
                        }}>
                        Sort<MDBIcon fas icon="arrows-alt-v" />
                    </MDBBtn>
                    <MDBBtn className='me-1' onClick={() => filterButtonAction({ searchTrue: true })}>Search</MDBBtn>
                    <MDBBtn className='me-1' color='danger' onClick={resetButtonAction}>Reset</MDBBtn>
                </MDBCol>

                <MDBCol size={4} className='topmargin15'>
                    <MultipleSelect
                        id="benefits"
                        label="Interests"
                        list={CONSTANTS.BENEFITS}
                        value={benefits}
                        setter={setBenefits}
                        size='small'
                        style={{ minWidth: '100%' }}
                    />
                </MDBCol>

                <MDBCol size={4} className='topmargin15'>
                    <MultipleSelect
                        id="contraIndications"
                        label="Risk factors"
                        list={CONSTANTS.CONTRA_INDICATIONS}
                        value={contraIndications}
                        setter={setContraIndications}
                        size='small'
                        style={{ minWidth: '100%' }}
                    />
                </MDBCol>

            </MDBRow>
        </MDBContainer >
    </>)
}