import { createSlice } from "@reduxjs/toolkit";

const serviceSlc = createSlice({
    name : 'serviceSlc',
    initialState : [],
    reducers : {
        setsrvc : (action) => {
            return action.payload;
        },
        clrsrvc : () => {
            return []
        }
    }
})

export const {setsrvc, clrsrvc} = serviceSlc.actions;
export default serviceSlc.reducer;