import { createSlice } from "@reduxjs/toolkit";

const rentalSlc = createSlice({
    name : 'rentalSlc',
    initialState : [],
    reducers : {
        setrental : (action) => {
            return action.payload;
        },
        clrrental : () => {
            return []
        }
    }
})

export const {setrental, clrrental} = rentalSlc.actions;
export default rentalSlc.reducer;