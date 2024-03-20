import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import parse from "html-react-parser";
import dbService from "../appwrite/dbservices";
import { toast } from "react-toastify";
import "./carousalstyle.css";
import Preloader from "../components/Preloader";

const Service = () => {
	const [deal, setDeal] = useState(null);
	const [loading, setLoading] = useState(true);
	const { slug } = useParams();
	const navigate = useNavigate();
	const [response, setresponse] = useState("Loading...");

	const userData = useSelector((state) => state.authslc.userData);
	const isAuthor = deal && userData ? deal.userId === userData.$id : false;
	const allPosts = useSelector((state) => state.serviceslc);
	console.log("all posts", allPosts);

	useEffect(() => {
		// if (slug) {
		if (slug && allPosts.length > 0) {
			const myDeal = allPosts.filter((item) => item.$id == slug)[0];
			myDeal ? setDeal(myDeal) : setresponse("Deal not found");
		} else {
			// console.log("Post not found");
			setresponse("Loading...");
		}
	}, [navigate, slug, allPosts, deal]);

	useEffect(() => {
		if (deal) {
			setLoading(false);
		}
	}, [deal]);

	const deleteDeal = () => {
		dbService.delPostService(deal.$id).then((status) => {
			if (status) {
				dbService
					.delFile(deal.image)
					.then(console.log("deleted images"));
				toast.success("Deleted successfully");
				navigate("/services");
			}
		});
	};

	return loading ? (
		<div>
			{response == "Loading..." ? (
				<Preloader />
			) : (
				<p className=" flex w-full h-screen justify-center items-center text-red-500">
					{response}
				</p>
			)}
		</div>
	) : (
		<>
			<div className="w-full bg-[#002233] p-8">
				<div className="bg-gradient-to-r from-[#184b65] to-[#033a8d] [&>*]:border-blue-500 border[1px] border-gray-400 grid lg:grid-flow-col w-[95%] max-w-5xl mx-auto p-2 rounded-lg shadow-xl grid-cols-1 lg:grid-cols-2">
					<div className=" my-auto p-4">
						{deal ? (
							<img
								src={dbService.previewFile(deal.image)}
								alt={deal.title}
								className="rounded-xl w-full"
							/>
						) : null}
					</div>

					<div className="text-white p-4 my-auto">
						{isAuthor && (
							<div className="flex justify-end mb-4">
								<Link to={`/editservice/${deal.$id}`}>
									<button className="bg-green-500 text-white py-2 px-4 mr-2 rounded-md hover:bg-green-600 focus:outline-none">
										Edit
									</button>
								</Link>
								<button
									className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
									onClick={deleteDeal}
								>
									Delete
								</button>
							</div>
						)}

						<div className="mb-4">
							<h1 className="text-3xl font-bold">{deal.title}</h1>
						</div>
						<div className="mb-4">
							<h2 className="text-xl font-semibold">
								Charges: {deal.charges}
							</h2>
						</div>
						<div className="mb-4">
							<p className="">By: {deal.author}</p>
							<p className="">Date Posted: {deal.date}</p>
							<p></p>
							<p className="">
								Current Status:{" "}
								<span
									className={`${
										deal.status != "available"
											? "text-red-500"
											: "text-green-500"
									}`}
								>
									{deal.status}
								</span>
							</p>
						</div>
						<div className="mb-4">
							<p>Description: </p>
							<div className="">
								{parse(deal.description)}
								{/* Description: {parse(deal.description)} */}
								{/* <div className="" dangerouslySetInnerHTML={{ __html: deal.description }} /> */}
							</div>
						</div>
						{deal.status == "available" && (
							<button className=" cursor-default bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none">
								<a
									href={`https://wa.me/${deal.phone}?text=Hello%20${deal.author}!%20I'm%20interested%20in%20your%20service%20offer%20at%20UET%20Nest%20Swap.%20Could%20you%20provide%20more%20information%20about%20it?%20Here's%20the%20link%3A%20https%3A%2F%2Flocalhost%3A5173%2Fservice%2F${deal.$id}`}
									target="_blank"
									rel="noreferrer"
									className="hover:text-white cursor-pointer"
									aria-disabled={true}
								>
									Request Service
								</a>
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Service;
