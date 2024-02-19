import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData : null
}

const authSlc = createSlice({
    name : 'authSlc',
    initialState,
    reducers : {
        login : (state, action) => {
            state.status = true,
            state.userData = action.payload.userData
        },

        logout : (state) => {
            state.status = false,
            state.userData = null
        }
    }
})

export const {login, logout} = authSlc.actions;
export default authSlc.reducer;