import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlc";
import authService from "../appwrite/authservices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserProfileCard = ({ name, email, isVerified }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const logoutHndlr = () => {
		authService.logOut().then(() => {
			dispatch(logout());
			navigate('/');

		});
		toast.success("Logged Out Successfully");
	};

	return (
		// <div className="bg-gradient-to-r from-[#000133e6] to-[#044dba] md:rounded-lg shadow-lg p-6 w-full  md:max-w-sm mx-auto my-4">
		// <div className="bg-gradient-to-r from-[#0072ad] to-[#033a8d] md:rounded-lg shadow-lg p-6 w-full  md:max-w-sm mx-auto my-4">
		<div className="bg-gradient-to-r from-[#0079b8] to-[#023179] md:rounded-lg shadow-lg p-6 w-full  md:max-w-sm mx-auto my-4">
			<h2 className="text-lg lg:text-2xl font-bold text-white mb-4">{name}</h2>
			<p className="text-sm lg:text-lg text-white mb-2">{email}</p>
			<p
				className={`text-sm lg:text-lg mb-4 ${
					isVerified ? "text-white" : "text-red-500"
				} `}
			>
				{isVerified ? "Verified Account" : "Not Verified"}
			</p>
			<button
				className=" text-sm lg:text-base bg-gray-100 text-[#4696EC] hover:bg-[#689250] hover:text-white transition duration-300 font-semibold py-2 px-4 rounded-md"
				onClick={logoutHndlr}
			>
				Logout
			</button>
			{!isVerified && (
				<button
					className=" mx-3 bg-gray-100 text-[#4696EC] hover:bg-green-500 hover:text-white transition duration-300 font-semibold py-2 px-4 rounded-md"
					onClick={async () => {
						try {
							const verRes =
								await authService.createVerification();
							if (verRes) {
								toast.success("Email Sent, Check Your Inbox", {
									autoClose: 5000,
								});
							}
						} catch (error) {
							console.log("error =>", { error });
						}
					}}
				>
					Verify Account
				</button>
			)}
			{/* <button onClick={() => dispatch(setflag())} >flag check</button> */}
		</div>
	);
};

export default UserProfileCard;
