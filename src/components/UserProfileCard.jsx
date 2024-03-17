import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlc";
import authService from "../appwrite/authservices";
import { toast } from "react-toastify";

const UserProfileCard = ({ name, email, isVerified }) => {
	const dispatch = useDispatch();
	const logoutHndlr = () => {
		authService.logOut().then(() => {
			dispatch(logout());
		});
		toast.success("Logged Out Successfully");
	};

	return (
		<div className="bg-gradient-to-r from-[#002233] to-[#0459d8] rounded-lg shadow-lg p-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
			<h2 className="text-2xl font-bold text-white mb-4">{name}</h2>
			<p className="text-lg text-white mb-2">{email}</p>
			<p className={` text-lg mb-4 ${isVerified ? 'text-white' : 'text-red-500'} `}>
				{isVerified ? "Verified Account" : "Not Verified"}
			</p>
			<button
				className="bg-white text-[#4696EC] hover:bg-[#689250] hover:text-white transition duration-300 font-semibold py-2 px-4 rounded-md"
				onClick={logoutHndlr}
			>
				Logout
			</button>
		</div>
	);
};

export default UserProfileCard;
