import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    flag1: true,
    flag2: true,
    flag3: true,
    flag4: true,
    dorm: false,
    rntl: false,
    srvc: false,
}

const preloadSlc = createSlice({
    name: 'preloadSlc',
    initialState,
    reducers: {
        setflag1: (state, action) => {
            state.flag1 = action.payload;
        },
        setflag2: (state, action) => {
            state.flag2 = action.payload;
        },
        setflag3: (state, action) => {
            state.flag3 = action.payload;
        },
        setflag4: (state, action) => {
            state.flag4 = action.payload;
        },
        setdormflg: (state) => {
            state.dorm = !state.dorm;
        },
        setrntlflg: (state) => {
            state.rntl = !state.rntl;
        },
        setsrvcflg: (state) => {
            state.srvc = !state.srvc;
        }
    }
})

export const { setflag1, setflag2, setflag3, setflag4, setdormflg, setrntlflg, setsrvcflg } = preloadSlc.actions;
export default preloadSlc.reducer;