import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import authService from "../appwrite/authservices";
import { useDispatch, useSelector } from "react-redux";
import { login as storeLogin } from "../store/authSlc";
import { toast } from "react-toastify";

const SignIn = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [error, seterror] = useState("");
	const [udata, setUdata] = useState(null);
	const {
		register,
		handleSubmit,
		formState: { errors }, // Add formState and errors destructuring
	} = useForm();

	const login = async (data) => {
		seterror("");
		try {
			const session = await authService.loginAccount(data);
			console.log("session => ", session);
			if (session) {
				const userData = await authService.getCurrentUser();
				console.log("user data => ", userData);
				setUdata(userData);
				dispatch(storeLogin(userData));
				toast.success('Signed in successfully');
				navigate("/");
			}
		} catch (err) {
			console.log(err.message);
			seterror(err.message);
		}
	};

	useEffect(() => {
		errors.email ? toast.warn(errors.email.message, {autoClose: 10000}) : console.log('nothing happened email') 
	}, [errors]);
	
	useEffect(() => {
		error ? toast.error(error, {autoClose: 5000}) : console.log('nothing happened error') 
	}, [error]);

	return (
		<div>
			<form onSubmit={handleSubmit(login)}>
				<Input
					type="email"
					label="Email"
					placeholder="Enter your email"
					className=" text-slate-950 "
					{...register("email", {
						required: true,
						validate: {
							matchPattern: (value) =>
								/\.uettaxila\.edu\.pk$/.test(value) ||
								"Only in campus deals allowed, Use UET assigned email",
								// toast.warn("Only in campus deals allowed, Use UET assigned email" , {autoClose: 5000})
						},
					})}
				/>
				{errors.email && (
					<p className=" text-red-600">{errors.email.message}</p>
				)}
				<Input
					type="password"
					label="Password"
					placeholder="Enter your password"
					className=" text-slate-950 "
					{...register("password", {
						required: true,
					})}
				/>
				<p>
					By signing in, you agree to our{" "}
					<Link
						to={"/terms"}
						target="_blank"
						className=" text-blue-500"
					>
						Terms & Conditions
					</Link>{" "}
				</p>
				<Button type="submit" children="Sign In" />
				{/* {error && <p className=" text-red-600">{error}</p>} */}
			</form>
		</div>
	);
};

export default SignIn;
