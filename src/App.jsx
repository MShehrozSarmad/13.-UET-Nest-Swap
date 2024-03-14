import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import dbService from "./appwrite/dbservices";
import { setdorms } from "./store/dormSlc";
import { setrentals } from "./store/rentalSlc";
import { setsrvcs } from "./store/servicesSlc";
import authService from "./appwrite/authservices";
import { login } from "./store/authSlc";
import Lottie from "lottie-react";
import preloader from "./loading.json";

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
					.then(setLoading2(false));
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
					.then(setLoading(false));
			} catch (error) {
				console.log("error", error);
			}
		}

		async function getRentals() {
			try {
				await dbService.getPostsRentals().then((deals) => {
					deals
						? dispatch(setrentals(deals.documents))
						: console.log("rentals failed");
				});
			} catch (error) {
				console.log("error", error.response.message);
			}
		}

		async function getServices() {
			try {
				await dbService.getPostsServices().then((deals) => {
					deals
						? dispatch(setsrvcs(deals.documents))
						: console.log("services failed");
				});
			} catch (error) {
				console.log("error", error.response.message);
			}
		}

		getuserData();
		getDorms();
		getRentals();
		getServices();
	}, [navigate, location]);

	return loading && loading2 ? (
		<div className=" w-5 h-5">
			<Lottie animationData={preloader} loop={true} />
		</div>
	) : (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};

export default App;
