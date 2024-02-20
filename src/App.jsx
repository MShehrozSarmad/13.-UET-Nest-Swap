import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { useDispatch } from "react-redux";
import dbService from "./appwrite/dbservices";
import { setdorms } from "./store/dormSlc";

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
