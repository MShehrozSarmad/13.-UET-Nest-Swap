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
	const [btnStat, setbtnStat] = useState(false);
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
			console.log("dipatch error", { error });
		}
	};

	const signup = async (data) => {
		setbtnStat(true);
		seterror("");
		try {
			const response = await authService.createAccount(data);
			// console.log("response => ", response);
			if (response) {
				setUsrData(response);
				toast.success("Signed Up successfully");
				navigate("/verify");
			}
		} catch (err) {
			console.log("catch it => ", err.response.message);
			seterror(err.response.message);
			setbtnStat(false);
		}
	};

	useEffect(() => {
		errors.email
			? toast.warn(errors.email.message, { autoClose: 5000 })
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
				onSubmit={handleSubmit(signup)}
				className="bg-gradient-to-r from-blue-900 to-blue-600 shadow-md md:rounded px-8 pt-6 pb-8 w-full max-w-md text-white h-full md:h-auto"
			>
				<h1 className=" font-bold text-2xl m-2 mb-6 text-center">
					Create an Account
				</h1>

				<div className="mb-6">
					<Input
						type="text"
						label="Name"
						placeholder="Enter your Full name"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						{...register("name", {
							required: true,
						})}
					/>
				</div>

				<div className="mb-6">
					<Input
						type="email"
						label="Email"
						placeholder="Enter your email"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						{...register("password", {
							required: true,
						})}
					/>
				</div>

				<p className="text-gray-400 text-xs italic mb-4">
					By creating account, you agree to our{" "}
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
					Sign Up
				</Button>

				<div className="text-gray-400 text-sm mt-4">
					<p>
						Already have an account?{" "}
						<Link to={"/signin"} className="text-blue-300">
							Sign in here
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
