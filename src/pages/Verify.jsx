import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import authService from "../appwrite/authservices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as rdxlogin } from "../store/authSlc";

// todo : upon successful verification redirect user to user profile page ...

const Verify = () => {
	const [usrData, setusrData] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const secret = params.get("secret");
	const id = params.get("userId");
	console.log(secret);

	const userData = async () => {
		try {
			const userData = await authService.getCurrentUser();
			console.log("user data => ", userData);
			setusrData(userData);
		} catch (error) {
			console.log("error =>", { error });
		}
	};

	useEffect(() => {
		userData();
	}, []);

	useEffect(() => {
		if (usrData) {
			console.log("useeffect user data ", usrData);
			dispatch(rdxlogin(usrData));
			navigate("/userprofile");
		}
	}, [usrData]);

	useEffect(() => {
		if (params.size > 0) {
			console.log(params);
			verifyAccnt();
		}
	}, [params]);

	const verifyAccnt = async () => {
		try {
			const res = await authService.verifyAccount(id, secret);
			console.log("res => ", res);

			// navigate("/userprofile");
		} catch (error) {
			console.log("error => ", error);
		}
	};

	// verifyAccnt();

	return (
		<>
			<div> ⚠️ Verify your account to continue</div>
			<button
				onClick={async () => {
					try {
						const verRes = await authService.createVerification();
						console.log(verRes);
						if (verRes) {
							alert("email sent");
						}
					} catch (error) {
						console.log("error =>", { error });
					}
				}}
				// disabled = {false}
			>
				Verify Here
			</button>
			<br />
		</>
	);
};

export default Verify;