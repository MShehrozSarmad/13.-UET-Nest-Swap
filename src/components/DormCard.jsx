import React from "react";
import { Link } from "react-router-dom";
import dbService from "../appwrite/dbservices";

const DormCard = ({ image1, image, $id, price, charges, rent, title }) => {
	return (
		<Link to={`/${ price && 'dormdeal' || charges && 'service' || rent && 'rental' }/${$id}`}>
			<div className="w-full bg-gray-100 rounded-xl p-3 pb-2">
				<div className="w-full justify-center mb-2">
					<img
						src={dbService.previewFile(image1 || image)}
						alt="img"
						className=" rounded-t-md aspect-square object-cover"
					/>
				</div>
				<div className=" [&>*]:px-2 flex justify-between font-semibold text-gray-600">
					<p className="">{title}</p>
					<p className="">
						{price || rent || charges} {price && "PKR"}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default DormCard;