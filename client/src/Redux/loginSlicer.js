import { createSlice } from '@reduxjs/toolkit'

const { username, name, student } = localStorage?.user ? JSON.parse(localStorage?.user) : '';

export const loginSlice = createSlice({
    name: 'user',
    initialState: { username, loading: false, name, student },
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username;
            state.name = action.payload.name;
            state.student = action.payload.student;
            state.dob = action.payload.dob;
            state.gender = action.payload.gender;
            state.level = action.payload.level;
            state.benefits = action.payload.benefits;
            state.contraIndications = action.payload.contraIndications;
            state.loading = false;
            localStorage.setItem('user', JSON.stringify(state));
        },
        deleteUser: (state) => {
            state.username = "";
            state = {};
            localStorage.removeItem('user');
            sessionStorage.removeItem('appData');
        },
        setLoadingTrue: (state) => {
            document.body.style = 'pointer-events: none;'
            state.loading = true;
        },
        setLoadingFalse: (state) => {
            document.body.style = 'pointer-events: auto;'
            state.loading = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUser, deleteUser, setLoadingFalse, setLoadingTrue } = loginSlice.actions

export default loginSlice.reducer