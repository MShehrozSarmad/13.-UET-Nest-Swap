import { createSlice } from "@reduxjs/toolkit";

const serviceSlc = createSlice({
    name : 'serviceSlc',
    initialState : [],
    reducers : {
        setsrvcs : (state, action) => {
            return action.payload;
        },
        clrsrvcs : () => {
            return []
        }
    }
})

export const {setsrvcs, clrsrvcs} = serviceSlc.actions;
export default serviceSlc.reducer;