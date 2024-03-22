import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import dbService from "./appwrite/dbservices";
import { setflag1, setflag2, setflag3, setflag4 } from "./store/preloadSlc";
import { login } from "./store/authSlc";
import { setdorms } from "./store/dormSlc";
import { setrentals } from "./store/rentalSlc";
import { setsrvcs } from "./store/servicesSlc";
import authService from "./appwrite/authservices";
import Preloader from "./components/Preloader";

const App = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const dormflg = useSelector((state) => state.preloadslc.dorm);
	const rntlflg = useSelector((state) => state.preloadslc.rntl);
	const srvcflg = useSelector((state) => state.preloadslc.srvc);
	const flag1 = useSelector((state) => state.preloadslc.flag1);
	const flag2 = useSelector((state) => state.preloadslc.flag2);
	const flag3 = useSelector((state) => state.preloadslc.flag3);
	const flag4 = useSelector((state) => state.preloadslc.flag4);
	const [flag, setFlag] = useState(true);

	const getuserData = async () => {
		try {
			const userData = await authService.getCurrentUser();
			if (userData) {
				dispatch(login(userData));
			}
		} catch (error) {
			console.log(error);
		}
		dispatch(setflag1(false));
	};

	const getDorms = async () => {
		try {
			const deals = await dbService.getPostsDorms();
			if (deals) {
				dispatch(setdorms(deals.documents));
				dispatch(setflag2(false));
			}
		} catch (error) {
			console.log("error", error);
		}
	};

	const getRentals = async () => {
		try {
			const deals = await dbService.getPostsRentals();
			if (deals) {
				dispatch(setrentals(deals.documents));
				dispatch(setflag3(false));
			}
		} catch (error) {
			console.log("error", error);
		}
	};

	const getServices = async () => {
		try {
			const deals = await dbService.getPostsServices();
			if (deals) {
				dispatch(setsrvcs(deals.documents));
				dispatch(setflag4(false));
			}
		} catch (error) {
			console.log("error", error);
		}
	};

	useEffect(() => {
		getuserData();
		getDorms();
		getRentals();
		getServices();
	}, []);

	useEffect(() => {
		console.log('effected dorm')
		getDorms();
	}, [dormflg]);
	useEffect(() => {
		console.log('effected rntl')
		getRentals();
	}, [rntlflg]);
	useEffect(() => {
		console.log('effected srvc')
		getServices();
	}, [srvcflg]);

	useEffect(() => {
		console.log("flag diary: ", flag1, flag2, flag3, flag4);
		if (!flag1 && !flag2 && !flag3 && !flag4) {
			setFlag(false);
			console.log("flag is false");
		} else {
			setFlag(true);
			console.log("flag is false");
		}
	}, [flag1, flag2, flag3, flag4]);

	return flag ? (
		<Preloader />
	) : (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};

export default App;
