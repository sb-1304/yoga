import { createSlice } from '@reduxjs/toolkit'

const { tab, teacherDetails, studentDetails, asanasData } = sessionStorage?.appData ? JSON.parse(sessionStorage?.appData) : '';

export const appData = createSlice({
    name: 'appData',
    initialState: { tab: tab ? tab : 'profile', teacherDetails, studentDetails, asanasData: asanasData ? asanasData : [] },
    reducers: {
        setTeacherStudentDetails: (state, action) => {
            state.teacherDetails = action.payload.teacherDetails;
            state.studentDetails = action.payload.studentDetails;
            state.asanasDetails = action.payload.asanasDetails;
            sessionStorage.setItem('appData', JSON.stringify(state));
        },
        setAsanas: (state, action) => {
            state.asanasData = action.payload;
            sessionStorage.setItem('appData', JSON.stringify(state));
        },
        setCurrentTab: (state, action) => {
            state.tab = action.payload;
            sessionStorage.setItem('appData', JSON.stringify(state));
        }
    },
})

// Action creators are generated for each case reducer function
export const { setTeacherStudentDetails, setCurrentTab, setAsanas } = appData.actions

export default appData.reducer