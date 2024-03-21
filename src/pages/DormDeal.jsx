import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import parse from "html-react-parser";
import dbService from "../appwrite/dbservices";
import Carousel from "@itseasy21/react-elastic-carousel";
import { toast } from "react-toastify";
import Preloader from "../components/Preloader";
import "./carousalstyle.css";
import shareicon from "../share.svg";
import {
	FacebookShareButton,
	WhatsappShareButton,
	WhatsappIcon,
	FacebookIcon,
} from "react-share";

const DormDeal = () => {
	const [deal, setDeal] = useState(null);
	const [loading, setLoading] = useState(true);
	const [btnStat, setbtnStat] = useState(false);
	const { slug } = useParams();
	const navigate = useNavigate();
	const [response, setresponse] = useState("Loading...");

	const userData = useSelector((state) => state.authslc.userData);
	const isAuthor = deal && userData ? deal.userId === userData.$id : false;
	const allPosts = useSelector((state) => state.dormslc);
	const shareUrl = `https://localhost.com/dormdeal/${deal?.$id}`;

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
		dbService.delPostDorm(deal.$id).then((status) => {
			if (status) {
				dbService
					.delFile(deal.image1)
					.then(dbService.delFile(deal.image2))
					.then(dbService.delFile(deal.image3))
					.then(console.log("deleted images"));
				toast.success("Deleted successfully");
				navigate("/dormdeals");
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
			<div className="w-full bg-[#002233] p-4">
				<div className=" [&>*]:border4 [&>*]:lg:bg-red400 bg-gradient-to-r from-[#184b65] to-[#033a8d] [&>*]:border-blue-500 border[1px] border-gray-400 grid lg:grid-flow-col w-[95%] max-w-5xl mx-auto p-2 rounded-lg shadow-xl grid-cols-1 lg:grid-cols-2">
					<div className=" my-auto px-2 py-4 md:p-4">
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
								<div>
									<img
										src={dbService.previewFile(deal.image3)}
										alt={deal.title}
										className="rounded-xl w-full"
									/>
								</div>
							</Carousel>
						) : null}
					</div>

					<div className="p-4 my-auto text-white">
						<div className="flex justify-end items-center mb-4 gap-2">
							{isAuthor && (
								<>
									<Link to={`/editdorm/${deal.$id}`}>
										<button className="bg-green-500 text-white py-2 px-4 mr2 rounded-md hover:bg-green-600 focus:outline-none">
											Edit
										</button>
									</Link>
									<button
										className={`bg-red-500 text-white py-2 px-4 mr2 rounded-md hover:bg-red-600 focus:outline-none  ${
											btnStat
												? " blur-sm hover:bg-red-500"
												: "blur-0"
										}`}
										onClick={() => {
											setbtnStat(true);
											deleteDeal();
										}}
										disabled={btnStat}
									>
										Delete
									</button>
								</>
							)}
							<WhatsappShareButton
								url={shareUrl}
								quote={"hello world"}
								className="border"
							>
								<WhatsappIcon size={35} round={false} className="rounded-md" />
							</WhatsappShareButton>
						</div>

						<div className="mb-4">
							<h1 className="text-3xl font-bold">{deal.title}</h1>
						</div>
						<div className="mb-4">
							<h2 className="text-xl font-semibold">
								Demand: {deal.price} PKR
							</h2>
						</div>
						<div className="mb-4">
							<p className="">By: {deal.author}</p>
							<p className="">Date Posted: {deal.date}</p>
							<p>
								Condition:{" "}
								<span
									className={`  ${
										deal.condition < 5
											? "text-red-500"
											: "text-white"
									} `}
								>
									{deal.condition}
								</span>
								/10
							</p>
							<p className="">
								Current Status:{" "}
								<span
									className={`${
										deal.status === "sold"
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
						{deal.status !== "sold" && (
							<button className=" cursor-default bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none">
								<a
									href={`https://wa.me/${deal.phone}?text=Hey!%20${deal.author}%20I%20spotted%20your%20dorm%20deal%20at%20UET%20Nest%20Swap%20and%20I'm%20intrigued!%20Could%20you%20tell%20me%20more%20about%20it?%20Here's%20the%20link%3A%20https%3A%2F%2Flocalhost%3A5173%2Fdormdeal%2F${deal.$id}`}
									target="_blank"
									rel="noreferrer"
									className="hover:text-white cursor-pointer"
								>
									Reserve Now
								</a>
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default DormDeal;
