import React from "react";
import { Link } from "react-router-dom";
import dbService from "../appwrite/dbservices";

const DormCard = ({ image1, image, $id, price, charges, rent, title }) => {
	return (
		<Link
			to={`/${
				(price && "dormdeal") ||
				(charges && "service") ||
				(rent && "rental")
			}/${$id}`}
			//  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3"
			//  className=" aspect-square object-cover overflow-hidden"
			// className=" "
		>
			<div className="w-full bg-gradient-to-r from-[#0079b8] to-[#023179] text-gray-100 rounded-xl p3 pb2 overflow-hidden hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition duration-200">
			{/* <div className="w-full bg-[#0079b8]  text-gray-300 rounded-xl p3 pb2 overflow-hidden hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition duration-200"> */}
				<div className="w-full justify-center overflow-hidden">
					<img
						src={dbService.previewFile(image1 || image)}
						alt="img"
						className=" rounded-tmd aspect-square object-cover hover:scale-125 transition duration-700 cursor-zoom-in"
					/>
				</div>
				<div className=" [&>*]:px-0 p-2 text-xs md:text-sm lg:text-base space-y-1">
					<p className=" w-full whitespace-nowrap overflow-hidden text-ellipsis ">{title}</p>
					<p className="">
						{price ||
							rent ||
							charges.split(" ").slice(0, 1).join(" ")}{" "}
						{price && "PKR"}
					</p>
				</div>
			</div>
		</Link>
	);
};
export default DormCard;
