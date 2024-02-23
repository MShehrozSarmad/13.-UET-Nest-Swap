import React from "react";
import { Link } from "react-router-dom";
import dbService from "../appwrite/dbservices";

const DormCard = ({image1, $id, price, title}) => {
	return (
		<Link to={`/dormdeal/${$id}`}>
			<div className="w-full bg-gray-100 rounded-xl p-4">
				<div className="w-full justify-center mb-4">
					<img
						src={dbService.previewFile(image1)}
						alt=""
						className="rounded-xl"
					/>
				</div>
			</div>
			<h2 className="rounded-xl font-bold">{title}</h2>
            <p className="rounded-xl font-bold">{price} PKR</p>
		</Link>
	);
};

export default DormCard;