import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Preloader from "./Preloader";

export default function AuthLayout({ children, authentication = true }) {
	const navigate = useNavigate();
	const authStatus = useSelector((state) => state.authslc.status);
	const [authStts, setAuthStts] = useState(null);
	const [loader, setLoader] = useState(true);
	const [response, setresponse] = useState("loading...");
	const usrData = useSelector((state) => state.authslc.userData);
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		setAuthStts(authStatus);
	}, [authStatus]);

	useEffect(() => {
		setUserData(usrData);
	}, [usrData]);

	useEffect(() => {
		setLoader(authentication && !authStts);
		if (authentication) {
			if (authStts) {
				if (userData && !userData.emailVerification) {
					navigate("/verify");
				}
			} else {
				setresponse("SignIn to Continue !");
			}
		} else if (authStts) {
			navigate("/");
		}
	}, [authentication, authStatus, authStts, navigate]);

	return loader ? (
		response == "loading..." ? (
			<Preloader />
		) : (
			<div className=" font-semibold flex w-full h-screen justify-center items-center text-red-500">
				<p>{response}</p>
			</div>
		)
	) : (
		<>{children}</>
	);
}