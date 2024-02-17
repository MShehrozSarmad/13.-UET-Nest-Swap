import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home.jsx';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';
import UserProfile from './pages/UserProfile.jsx';
import Service from './pages/Service.jsx';
import Services from './pages/Services.jsx';
import ServiceForm from './pages/ServiceForm.jsx';
import DormDeals from './pages/DormDeals.jsx';
import DormDeal from './pages/DormDeal.jsx';
import DormForm from './pages/DormForm.jsx';
import Rentals from './pages/Rentals.jsx';
import Rental from './pages/Rental.jsx';
import RentalForm from './pages/RentalForm.jsx';
import Devs from './pages/Devs.jsx';
import Aboutus from './pages/Aboutus.jsx';
import Contactus from './pages/Contactus.jsx';
import TermsAndConditions from './pages/TermsAndConditions.jsx';
import Verify from './pages/Verify.jsx';


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
				element: <Signin />,
			},
			{
				path: "/signup",
				element: <Signup />,
			},
			{
				path: "/userprofile",
				element: <UserProfile />,
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
				element: <DormForm />,
			},
			{
				path: "/rentalform",
				element: <RentalForm />,
			},
			{
				path: "/serviceform",
				element: <ServiceForm />,
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
				path: "/contactus",
				element: <Contactus />,
			},
			{
				path: "/verify",
				element: <Verify />,
			},
			{
				path: "/terms",
				element: <TermsAndConditions />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={route} />
	</React.StrictMode>
);