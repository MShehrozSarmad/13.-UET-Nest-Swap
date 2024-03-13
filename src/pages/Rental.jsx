import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import parse from "html-react-parser";
import dbService from "../appwrite/dbservices";
import Carousel from "@itseasy21/react-elastic-carousel";
import { toast } from "react-toastify";
import "./carousalstyle.css";
import Preloader from "../components/Preloader";

const Rental = () => {
	const [deal, setDeal] = useState(null);
	const [loading, setLoading] = useState(true);
	const { slug } = useParams();
	const navigate = useNavigate();
	const [response, setresponse] = useState("Loading...");

	const userData = useSelector((state) => state.authslc.userData);
	const isAuthor = deal && userData ? deal.userId === userData.$id : false;
	const allPosts = useSelector((state) => state.rentalslc);

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
		dbService.delPostRental(deal.$id).then((status) => {
			if (status) {
				dbService
					.delFile(deal.image1)
					.then(dbService.delFile(deal.image2))
					.then(console.log("deleted images"));
				toast.success("Deleted successfully");
				navigate("/rentals");
			}
		});
	};

	return loading ? (
		<div>
			{response == "Loading..." ? (
				<Preloader/>
			) : (
				response
			)}
		</div>
	) : (
		<>
			<div className="[&>*]:border4 [&>*]:lg:bg-red400 [&>*]:border-blue-500 borderred-400 border-2 grid lg:grid-flow-col border-gray-200 w-[95%] max-w-5xl mx-auto my-8 p-2 rounded-lg shadow-xl grid-cols-1 lg:grid-cols-2">
				<div className=" my-auto p-4">
					{deal ? (
						<Carousel className="">
							<div>
								<img
									src={dbService.previewFile(deal.image1)}
									alt={deal.title}
									className="rounded-xl w-full"
								/>
							</div>
							<div>
								<img
									src={dbService.previewFile(deal.image2)}
									alt={deal.title}
									className="rounded-xl w-full"
								/>
							</div>
						</Carousel>
					) : null}
				</div>

				<div className="bg-white shadowlg p-4 my-auto">
					{isAuthor && (
						<div className="flex justify-end mb-4">
							<Link to={`/editrental/${deal.$id}`}>
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
							Rent: {deal.rent}
						</h2>
					</div>
					<div className="mb-4">
						<p className="text-gray-700">By: {deal.author}</p>
						<p className="text-gray-700">
							Date Posted: {deal.date}
						</p>
						<p></p>
						<p className="text-gray-700">
							Current Status:{" "}
							<span
								className={`${
									deal.status === "sold"
										? "text-red-500"
										: "text-green-500"
								}`}
							>
								{ deal.status}
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
					{deal.status !== "sold" && (
						<button className=" cursor-default bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none">
							<a
								href={`https://wa.me/923424295275?text=i%20am%20interested%20in%20this%20deal%20https://localhost:5173/dormdeal/${deal.$id}%20and%20i%20offer%20you%20${deal.price}PKR`}
								target="_blank"
								rel="noreferrer"
								className="hover:text-white cursor-pointer"
							>
								Hire
							</a>
						</button>
					)}
				</div>
			</div>
		</>
	);
};

export default Rental;
