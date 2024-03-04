import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import authService from "../appwrite/authservices";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as rdxLogin } from "../store/authSlc";
import { toast } from "react-toastify";

const SignUp = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [error, seterror] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const setUsrData = (resp) => {
		try {
			dispatch(rdxLogin(resp));
		} catch (error) {
			console.log('dipatch error', {error})
		}
	}

	const signup = async (data) => {
		seterror("");
		try {
			const response = await authService.createAccount(data);
			// console.log("response => ", response);
			if (response) {
				setUsrData(response);
				toast.success('Signed Up successfully');
				navigate("/verify");
			}
		} catch (err) {
			console.log("catch it => ", err.response.message);
			seterror(err.response.message);
		}
	};

	useEffect(() => {
		errors.email ? toast.warn(errors.email.message, {autoClose: 5000}) : console.log('nothing happened email') 
	}, [errors]);
	
	useEffect(() => {
		error ? toast.error(error, {autoClose: 5000}) : console.log('nothing happened error') 
	}, [error]);

	return (
		<div>
			<form onSubmit={handleSubmit(signup)}>
				<Input
					type="text"
					label="Name"
					placeholder="Enter your Full name"
					className=" text-slate-950 "
					{...register("name", {
						required: true,
					})}
				/>
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
						},
					})}
				/>
				{/* {errors.email && (
					<p className=" text-red-600">{errors.email.message}</p>
				)} */}
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

				<Button type="submit" children="Sign Up" />
				{/* {error && <p className=" text-red-600">{error}</p>} */}
			</form>
		</div>
	);
};

export default SignUp;
