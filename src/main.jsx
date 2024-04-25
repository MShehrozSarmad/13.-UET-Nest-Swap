import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Service from "./pages/Service.jsx";
import Services from "./pages/Services.jsx";
import ServiceForm from "./pages/ServiceForm.jsx";
import DormDeals from "./pages/DormDeals.jsx";
import DormDeal from "./pages/DormDeal.jsx";
import DormForm from "./pages/DormForm.jsx";
import Rentals from "./pages/Rentals.jsx";
import Rental from "./pages/Rental.jsx";
import RentalForm from "./pages/RentalForm.jsx";
import Devs from "./pages/Devs.jsx";
import Aboutus from "./pages/Aboutus.jsx";
import Contactus from "./pages/Contactus.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import Verify from "./pages/Verify.jsx";
import EditDorm from "./pages/EditDorm.jsx";
import EditRental from "./pages/EditRental.jsx";
import EditService from "./pages/EditService.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Help from "./pages/Help.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Feedback from "./pages/Feedback.jsx";
import Complaints from "./pages/Complaints.jsx";

const route = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/signin",
				element: (
					<AuthLayout authentication={false}>
						<Signin />
					</AuthLayout>
				),
			},
			{
				path: "/signup",
				element: (
					<AuthLayout authentication={false}>
						<Signup />
					</AuthLayout>
				),
			},
			{
				path: "/userprofile",
				element: (
					<AuthLayout authentication>
						<UserProfile />
					</AuthLayout>
				),
			},
			{
				path: "/dormdeals",
				element: <DormDeals />,
			},
			{
				path: "/rentals",
				element: <Rentals />,
			},
			{
				path: "/services",
				element: <Services />,
			},
			{
				path: "/dormdeal/:slug",
				element: <DormDeal />,
			},
			{
				path: "/rental/:slug",
				element: <Rental />,
			},
			{
				path: "/service/:slug",
				element: <Service />,
			},
			{
				path: "/dormform",
				element: (
					<AuthLayout authentication>
						<DormForm />
					</AuthLayout>
				),
			},
			{
				path: "/editdorm/:slug",
				element: (
					<AuthLayout authentication>
						<EditDorm />
					</AuthLayout>
				),
			},
			{
				path: "/editservice/:slug",
				element: (
					<AuthLayout authentication>
						<EditService />
					</AuthLayout>
				),
			},
			{
				path: "/editrental/:slug",
				element: (
					<AuthLayout authentication>
						<EditRental />
					</AuthLayout>
				),
			},
			{
				path: "/rentalform",
				element: (
					<AuthLayout authentication>
						<RentalForm />
					</AuthLayout>
				),
			},
			{
				path: "/serviceform",
				element: (
					<AuthLayout authentication>
						<ServiceForm />
					</AuthLayout>
				),
			},
			{
				path: "/devs",
				element: <Devs />,
			},
			{
				path: "/aboutus",
				element: <Aboutus />,
			},
			{
				path: "/complaint",
				element: <Complaints />,
			},
			{
				path: "/verify",
				element: <Verify />,
			},
			{
				path: "/terms",
				element: <TermsAndConditions />,
			},
			{
				path: "/privacy",
				element: <PrivacyPolicy />,
			},
			{
				path: "/help",
				element: <Help />,
			},
			{
				path: "/feedback",
				element: <Feedback />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={route} />
		<ToastContainer
			position="top-right"
			autoClose={3000}
			hideProgressBar={false}
			newestOnTop
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="colored"
			transition:Bounce
		/>
	</Provider>
);