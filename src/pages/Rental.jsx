import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import parse from "html-react-parser";
import dbService from "../appwrite/dbservices";
import Carousel from "@itseasy21/react-elastic-carousel";
import { toast } from "react-toastify";
import "./carousalstyle.css";
import Preloader from "../components/Preloader";
import { WhatsappShareButton, WhatsappIcon } from "react-share";
import { setrntlflg } from "../store/preloadSlc";
import authorsvg from "../assets/author.svg";
import calendersvg from "../assets/calender.svg";
import statussvg from "../assets/status.svg";
import dollarsvg from "../assets/dollar.svg";
import deletesvg from "../assets/delete.svg";
import editsvg from "../assets/edit.svg";
import sharesvg from "../assets/share.svg";
import SEO from "../components/SEO";

const Rental = () => {
	const dispatch = useDispatch();
	const [deal, setDeal] = useState(null);
	const [loading, setLoading] = useState(true);
	const [btnStat, setBtnStat] = useState(false);
	const { slug } = useParams();
	const navigate = useNavigate();
	const [response, setresponse] = useState("Loading...");

	const userData = useSelector((state) => state.authslc.userData);
	const isAuthor = deal && userData ? deal.userId === userData.$id : false;
	const allPosts = useSelector((state) => state.rentalslc);
	const shareUrl = `https://www.uetnestswap.live/rental/${deal?.$id}`;

	useEffect(() => {
		if (slug && allPosts.length > 0) {
			const myDeal = allPosts.filter((item) => item.$id == slug)[0];
			myDeal ? setDeal(myDeal) : setresponse("Ad not found!");
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
				dispatch(setrntlflg());
				toast.success("Deleted successfully");
				navigate("/rentals");
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
			<SEO {...deal} />
			<div className="w-full bg-[#002233] py-14">
				<div className=" [&>*]:border4 [&>*]:lg:bg-red400 bg-gradient-to-r from-[#0079b8] to-[#023179] [&>*]:border-blue-500 border[1px] border-gray-400 grid lg:grid-flow-col w-[95%] max-w-5xl mx-auto p-2 rounded-lg shadow-xl grid-cols-1 lg:grid-cols-2">
					<div className="my-auto px-2 py-4 md:p-4">
						{deal ? (
							<Carousel className="">
								<div>
									<a target="_blank" className="cursor-zoom-in" href={(dbService.previewFile(deal.image1)).href}>
										<img
											src={dbService.previewFile(deal.image1)}
											alt={deal.title}
											className="rounded-xl w-full"
										/>
									</a>
								</div>
								<div>
									<a target="_blank" className="cursor-zoom-in" href={(dbService.previewFile(deal.image2)).href}>
										<img
											src={dbService.previewFile(deal.image2)}
											alt={deal.title}
											className="rounded-xl w-full"
										/>
									</a>
								</div>
							</Carousel>
						) : null}
					</div>

					<div className=" bg-transparent p-4 my-auto text-white">
						<div className="flex justify-end items-center mb-4 gap-2">
							{isAuthor && (
								<>
									<Link
										to={`/editrental/${deal.$id}`}
										className=" h-[24px]"
									>
										<img src={editsvg} alt="edit" />
									</Link>
									<button
										className={` focus:outline-none  ${btnStat ? " blur-sm" : "blur-0"
											}`}
										onClick={() => {
											setBtnStat(true);
											deleteDeal();
										}}
										disabled={btnStat}
									>
										<img src={deletesvg} alt="delete" />
									</button>
								</>
							)}
							<WhatsappShareButton url={shareUrl}>
								<img src={sharesvg} alt="share" />
							</WhatsappShareButton>
						</div>

						<div className="mb-4">
							<h1 className="text-3xl font-bold">
								{deal.title.charAt(0).toUpperCase() +
									deal.title.slice(1)}
							</h1>
						</div>
						<div className="mb-4">
							<div className="flex gap-2">
								<img src={dollarsvg} alt="rent" />{" "}
								<span>{deal.rent}</span>
							</div>
							<div className="flex gap-2">
								<img src={authorsvg} alt="author" />
								<span>{deal.author}</span>
							</div>
							<div className="flex gap-2">
								<img src={calendersvg} alt="date" />
								<span>{deal.date}</span>
							</div>
							<p></p>
							<div className="flex gap-2">
								<img src={statussvg} alt="availability" />
								<span
									className={`${deal.status !== "available"
										? "text-red-500"
										: "text-green-500"
										}`}
								>
									{deal.status}
								</span>
							</div>
						</div>
						<div className="mb-4">
							<span className="font-bold">Description: </span>
							<div
								style={{
									overflowWrap: "break-word",
									wordWrap: "break-word",
								}}
							>
								{parse(deal.description)}
							</div>
						</div>
						{deal.status == "available" && (
							<button className=" cursor-default bg-[#03a9f4] hover:bg-[#2196f3] text-white py-2 px-4 rounded-md focus:outline-none">
								<a
									href={`https://wa.me/${deal.phone}?text=Hi%20${deal.author}!%20Your%20rental%20listing%20at%20UET%20Nest%20Swap%20caught%20my%20eye.%20Can%20we%20chat%20about%20the%20details?%20Here's%20the%20link%20https://www.uetnestswap.live%2Frental%2F${deal.$id}`}
									target="_blank"
									rel="noreferrer"
									className="hover:text-white cursor-pointer"
									aria-disabled={true}
								>
									Book Now
								</a>
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Rental;
