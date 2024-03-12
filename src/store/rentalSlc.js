import { createSlice } from "@reduxjs/toolkit";

const rentalSlc = createSlice({
    name : 'rentalSlc',
    initialState : [],
    reducers : {
        setrentals : (state, action) => {
            return action.payload;
        },
        clrrentals : () => {
            return []
        }
    }
})

export const {setrentals, clrrentals} = rentalSlc.actions;
export default rentalSlc.reducer;