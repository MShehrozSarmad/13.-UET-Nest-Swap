import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Serviceform from "../components/Serviceform";

const EditService = () => {
	const { slug } = useParams();
	const [deal, setDeal] = useState(null);

	const allPosts = useSelector((state) => state.serviceslc);

	useEffect(() => {
		if (slug) {
			const myDeal = allPosts.filter((item) => item.$id == slug)[0];
			myDeal ? setDeal(myDeal) : console.log("post not found");
		} else {
			console.log("slug not found");
		}
		// console.log("deal", deal);
	}, [slug, allPosts, deal]);

	return deal ? (
		<>
			<Serviceform post={deal} />
		</>
	) : (
		<>
			<div className=" font-semibold flex w-full h-screen justify-center items-center text-red-500">
				<p>Service Not Found!</p>
			</div>
		</>
	);
};

export default EditService;
