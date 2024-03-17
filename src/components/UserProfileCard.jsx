import React from "react";
import { useDispatch } from "react-redux";
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
		<div className="bg-gradient-to-r from-[#002233] to-[#0459d8] rounded-lg shadow-lg p-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto my-4">
			<h2 className="text-2xl font-bold text-white mb-4">{name}</h2>
			<p className="text-lg text-white mb-2">{email}</p>
			<p
				className={` text-lg mb-4 ${
					isVerified ? "text-white" : "text-red-500"
				} `}
			>
				{isVerified ? "Verified Account" : "Not Verified"}
			</p>
			<button
				className="bg-gray-100 text-[#4696EC] hover:bg-[#689250] hover:text-white transition duration-300 font-semibold py-2 px-4 rounded-md"
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
		</div>
	);
};

export default UserProfileCard;
