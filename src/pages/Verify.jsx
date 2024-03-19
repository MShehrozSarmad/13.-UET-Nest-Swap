import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import authService from "../appwrite/authservices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as rdxlogin } from "../store/authSlc";
import { toast } from "react-toastify";
import UserProfileCard from "../components/UserProfileCard";

const Verify = () => {
	const [usrData, setusrData] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [params] = useSearchParams();
	console.log(params);
	const secret = params.get("secret");
	const id = params.get("userId");
	// console.log(secret);

	const userData = async () => {
		try {
			const userData = await authService.getCurrentUser();
			setusrData(userData);
		} catch (error) {
			console.log("error =>", { error });
		}
	};

	useEffect(() => {
		setTimeout(() => {
			userData();
		}, 3000);
		userData();
	}, []);

	useEffect(() => {
		if (usrData && usrData.emailVerification) {
			console.log("useeffect user data ", usrData);
			// toast.success("Acoount Verified", { autoClose: 3000 });
			dispatch(rdxlogin(usrData));
			navigate("/userprofile");
		}
	}, [usrData]);

	useEffect(() => {
		console.log(params);
		if (params.size > 0) {
			verifyAccnt();
		}
	}, [params]);

	const verifyAccnt = async () => {
		try {
			const res = await authService.verifyAccount(id, secret);
			// console.log("res => ", res);
			toast.success("Acoount Verified", { autoClose: 3000 });
			navigate("/userprofile");
		} catch (error) {
			console.log("error => ", { error });
			toast.error(error.response.message);
		}
	};

	return (
		<>
			<div className=" text-center font-semibold text-white" > ⚠️ Verify your account to continue</div>
			{usrData && (
				<UserProfileCard
					name={usrData.name}
					email={usrData.email}
					isVerified={usrData.emailVerification}

				/>
			)}
			<br />
		</>
	);
};

export default Verify;
