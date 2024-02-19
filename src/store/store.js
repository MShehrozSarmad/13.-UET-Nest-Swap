import { configureStore } from "@reduxjs/toolkit";
import authSlc from './authSlc';
import dormSlc from './dormSlc';
import rentalSlc from './rentalSlc';
import serviceSlc from './servicesSlc';

const store = configureStore({
    reducer:{
        authslc : authSlc,
        dormslc : dormSlc,
        rentalslc : rentalSlc,
        serviceslc : serviceSlc
    }
});

export default store;