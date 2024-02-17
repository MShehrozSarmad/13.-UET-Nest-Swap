import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import authService from "../appwrite/authservices";

const SignUp = () => {
	const navigate = useNavigate();
	const [error, seterror] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors }, 
	} = useForm();

	const signup = async (data) => {
		seterror("");
		try {
			const response = await authService.createAccount(data);
			console.log('response => ', response);
			if(response){
				// const userData = await authService.getCurrentUser();
				// console.log('user data => ', userData);
			}
		} catch (err) {
			console.log('catch it => ', err.response.message)
			seterror(err.response.message)
		}
		try {
			const verRes = await authService.createVerification();
			console.log(verRes)
		} catch (error) {
			console.log('error =>', {error})			
		}
	};

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
						// validate: {
						// 	matchPattern: (value) =>
						// 		/\.uettaxila\.edu\.pk$/.test(value) ||
						// 		"Only in campus deals allowed, Use UET assigned email",
						// },
					})}
				/>
				{errors.email && <p>{errors.email.message}</p>}
				<Input
					type="password"
					label="Password"
					placeholder="Enter your password"
					className=" text-slate-950 "
					{...register("password", {
						required: true,
					})}
				/>
				<Button type="submit" children="Sign Up" />
				{error && <p>{error}</p>}
			</form>
		</div>
	);
};

export default SignUp;
