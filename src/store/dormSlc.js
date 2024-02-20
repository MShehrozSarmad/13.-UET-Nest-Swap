import { createSlice } from "@reduxjs/toolkit";

const dormSlc = createSlice({
    name : 'dormSlc',
    initialState : [],
    reducers : {
        setdorms : (state, action) => {
            return action.payload;
        },
        clrdorms : () => {
            return []
        }
    }
})

export const {setdorms, clrdorms} = dormSlc.actions;
export default dormSlc.reducer;