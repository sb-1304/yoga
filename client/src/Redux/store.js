import { configureStore } from '@reduxjs/toolkit'

import user from './loginSlicer';
import appData from './appData';

export const store = configureStore({
    reducer: {
        user,
        appData
    },
})