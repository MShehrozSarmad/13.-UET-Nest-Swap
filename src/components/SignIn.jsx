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
	const [btnStat, setbtnStat] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors }, // Add formState and errors destructuring
	} = useForm();

	const login = async (data) => {
		setbtnStat(true);
		seterror("");
		try {
			const session = await authService.loginAccount(data);
			console.log("session => ", session);
			if (session) {
				const userData = await authService.getCurrentUser();
				console.log("user data => ", userData);
				setUdata(userData);
				dispatch(storeLogin(userData));
				toast.success("Signed in successfully");
				navigate("/");
			}
		} catch (err) {
			console.log(err.message);
			seterror(err.message);
			setbtnStat(false);
			// register[pass]
		}
	};

	useEffect(() => {
		errors.email
			? toast.warn(errors.email.message, { autoClose: 10000 })
			: console.log("nothing happened email");
	}, [errors]);

	useEffect(() => {
		error
			? toast.error(error, { autoClose: 5000 })
			: console.log("nothing happened error");
	}, [error]);

	return (
		<div className="flex justify-center items-center h-[85vh] md:h-dvh">
			<form
				onSubmit={handleSubmit(login)}
				className="bg-gradient-to-r from-blue-900 to-blue-600 shadow-md md:rounded px-8 pt-6 pb-8 w-full max-w-md text-white h-full md:h-auto"
			>
				<h1 className=" font-bold text-2xl m-2 mb-6 text-center">
					Welcome back to family!
				</h1>

				<div className="mb-6">
					<Input
						type="email"
						label="Email"
						placeholder="Enter your email"
						// className="mb-4"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						lblClass="text-sm font-semibold mb-2"
						{...register("email", {
							required: true,
							validate: {
								matchPattern: (value) =>
									/\.uettaxila\.edu\.pk$/.test(value) ||
									"Only in-campus deals allowed, use UET assigned email",
							},
						})}
					/>
					{errors.email && (
						<p className="text-red-500 text-xs italic">
							{errors.email.message}
						</p>
					)}
				</div>

				<div className="mb-6">
					<Input
						type="password"
						label="Password"
						placeholder="Enter your password"
						// className="mb-6"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						lblClass="text-sm font-semibold mb-2"
						{...register("password", { required: true })}
					/>
				</div>

				<p className="text-gray-400 text-xs italic mb-4">
					By signing in, you agree to our{" "}
					<Link
						to={"/terms"}
						target="_blank"
						className="text-blue-300"
					>
						Terms & Conditions
					</Link>
				</p>
				{error && (
					<p className="text-red-500 text-xs italic mt-4">{error}</p>
				)}

				<Button
					type="submit"
					disabled={btnStat}
					className={`${
						btnStat
							? "bg-[#788c6e] text-gray-200"
							: "bg-blue-500 hover:bg-[#689250] transition duration-300"
					} text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
				>
					Sign In
				</Button>

				<div className="text-gray-400 text-sm mt-4">
					<p>
						Don't have an account?{" "}
						<Link to={"/signup"} className="text-blue-300">
							Sign up here
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default SignIn;
