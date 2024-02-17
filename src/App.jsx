import React from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

const App = () => {
    const navigate = useNavigate();
	return(
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    );  
};

export default App;