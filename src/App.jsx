import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import dbService from "./appwrite/dbservices";
import { setdorms } from "./store/dormSlc";
import authService from "./appwrite/authservices";
import { login } from "./store/authSlc";

const App = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		async function getDorms() {
			try {
				await dbService.getPostsDorms().then((deals) => {
					deals ? dispatch(setdorms(deals.documents)) : null;
				});
			} catch (error) {
				console.log("error", error);
			}
		}
		async function getuserData(){
			try {
				const userData = await authService.getCurrentUser();
				console.log(userData);
				userData ? dispatch(login(userData)) : null;
			} catch (error) {
				console.log(error)
			}
		}
		// async function getRentals() {
		// 	try {
		// 		await dbService.getPostsRentals().then((deals) => {
		// 			deals ? dispatch(setdorms(deals.documents)) : null;
		// 		});
		// 	} catch (error) {
		// 		console.log("error", error.response.message);
		// 	}
		// }
		// async function getServices() {
		// 	try {
		// 		await dbService.getPostsServices().then((deals) => {
		// 			deals ? dispatch(setdorms(deals.documents)) : null;
		// 		});
		// 	} catch (error) {
		// 		console.log("error", error.response.message);
		// 	}
		// }
		getDorms();
		getuserData();
		// getRentals();
		// getServices();
	}, []);

	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};

export default App;
