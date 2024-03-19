import React from "react";
import { Link } from "react-router-dom";
import "./fds.css";

const LinkCard = ({ image, title, description, clsnm }) => {
	return (
		<div
			className={` max-w-[300px] roundedlg overflow-hidden h-full ${clsnm} `}
		>
			<Link to={"/rentalform"} className="">
				<img
					src={image}
					alt="serviceform"
					className="w-full  h-40 object-contain p-2 fds "
				/>
			</Link>
			<div className="p-4 bggray-100">
				<h3 className="text-xl text-white font-semibold mb-2 text-center">
					{title}
				</h3>
				<p className=" text-sm lg:text-base text-gray-400 text-justify">{description}</p>
			</div>
		</div>
	);
};

export default LinkCard;
