import { useState } from 'react';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBRow,
    MDBCol,
} from 'mdb-react-ui-kit';

import Profile from '../Pages/Profile';
import Asanas from '../Pages/Asanas';
import Bookings from '../Pages/Bookings';
import ScheduleClass from './ScheduleClass';
import { setCurrentTab } from '../Redux/appData';
import { useDispatch, useSelector } from 'react-redux';
import PreviousBookings from './PreviousBookings';

const TeacherComponent = () => {

    const { appData } = useSelector(_ => _);
    const dispatch = useDispatch();
    const [verticalActive, setVerticalActive] = useState(appData.tab);

    const handleVerticalClick = (value) => {
        if (value === verticalActive) {
            return;
        }

        setVerticalActive(value);
        dispatch(setCurrentTab(value));
    };

    return (<>

        <MDBRow>

            <MDBCol size='2'>
                <MDBTabs className='flex-column text-center'>

                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleVerticalClick('profile')} active={verticalActive === 'profile'}>
                            Profile
                        </MDBTabsLink>
                    </MDBTabsItem>

                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleVerticalClick('pbookings')} active={verticalActive === 'pbookings'}>
                            Previous Bookings
                        </MDBTabsLink>
                    </MDBTabsItem>

                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleVerticalClick('ubookings')} active={verticalActive === 'ubookings'}>
                            Upcoming Bookings
                        </MDBTabsLink>
                    </MDBTabsItem>

                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleVerticalClick('class')} active={verticalActive === 'class'}>
                            Schedule Class
                        </MDBTabsLink>
                    </MDBTabsItem>

                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleVerticalClick('asanas')} active={verticalActive === 'asanas'}>
                            Asanas
                        </MDBTabsLink>
                    </MDBTabsItem>

                </MDBTabs>
            </MDBCol>

            <MDBCol size='10'>
                <MDBTabsContent>
                    <MDBTabsPane show={verticalActive === 'profile'}><Profile /></MDBTabsPane>
                    <MDBTabsPane show={verticalActive === 'pbookings'}><PreviousBookings /></MDBTabsPane>
                    <MDBTabsPane show={verticalActive === 'ubookings'}><Bookings /></MDBTabsPane>
                    <MDBTabsPane show={verticalActive === 'class'}><ScheduleClass /></MDBTabsPane>
                    <MDBTabsPane show={verticalActive === 'asanas'}><Asanas /></MDBTabsPane>
                </MDBTabsContent>
            </MDBCol>

        </MDBRow>

    </>)
}

export default TeacherComponent;