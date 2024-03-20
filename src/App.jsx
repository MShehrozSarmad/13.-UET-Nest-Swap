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
// import Lottie from "lottie-react";
// import preloader from "./loading.json";
import Preloader from "./components/Preloader";

const App = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const [loading2, setLoading2] = useState(true);

	useEffect(() => {
		async function getuserData() {
			try {
				const userData = await authService
					.getCurrentUser()
					.then(setLoading2(false))
					.then(dispatch(setflag1(false)));
				userData ? dispatch(login(userData)) : null;
			} catch (error) {
				console.log(error);
			}
		}

		async function getDorms() {
			try {
				await dbService
					.getPostsDorms()
					.then((deals) => {
						deals
							? dispatch(setdorms(deals.documents))
							: console.log("failed to set");
					})
					.then(setLoading(false))
					.then(dispatch(setflag2(false)));
			} catch (error) {
				console.log("error", error);
			}
		}

		async function getRentals() {
			try {
				await dbService
					.getPostsRentals()
					.then((deals) => {
						deals
							? dispatch(setrentals(deals.documents))
							: console.log("rentals failed");
					})
					.then(dispatch(setflag3(false)));
			} catch (error) {
				console.log("error", error.response.message);
			}
		}

		async function getServices() {
			try {
				await dbService
					.getPostsServices()
					.then((deals) => {
						deals
							? dispatch(setsrvcs(deals.documents))
							: console.log("services failed");
					})
					.then(dispatch(setflag4(false)));
			} catch (error) {
				console.log("error", error.response.message);
			}
		}

		getuserData();
		getDorms();
		getRentals();
		getServices();
	}, [navigate, location]);

	const flag1 = useSelector((state) => state.preloadslc.flag1);
	const flag2 = useSelector((state) => state.preloadslc.flag2);
	const flag3 = useSelector((state) => state.preloadslc.flag3);
	const flag4 = useSelector((state) => state.preloadslc.flag4);
	const [flag, setFlag] = useState(true);

	useEffect(() => {
		if (!flag1 && !flag2 && !flag3 && !flag4) {
			setFlag(false);
			console.log('set to false!');
		} else {
			setFlag(true);
			console.log('till true!');
		}
	}, [flag1, flag2, flag3, flag4]);

	// return loading && loading2 ? (
	return flag ? (
		<Preloader/>
	) : (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};

export default App;
