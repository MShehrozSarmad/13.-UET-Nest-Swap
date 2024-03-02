import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children, authentication = true }) {
	const navigate = useNavigate();
	const authStatus = useSelector((state) => state.authslc.status);
	const [authStts, setAuthStts] = useState(null);
	const [loader, setLoader] = useState(true);
	const [response, setresponse] = useState("loading...");
	const usrData = useSelector(state => state.authslc.userData);
	const [userData, setUserData] = useState(null);



	useEffect(() => {
		setAuthStts(authStatus);
	}, [authStatus]);

	useEffect(() => {
		setUserData(usrData);
	}, [usrData]);

	useEffect(() => {
		// setLoader(authentication && !authStts);
		// if (authentication) {
		// 	authStts ? null : setresponse("SignIn to Continue !");
		// } else if (authStts) {
		// 	navigate("/");
		// }
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

	return loader ? <h1>{response}</h1> : <>{children}</>;
}
