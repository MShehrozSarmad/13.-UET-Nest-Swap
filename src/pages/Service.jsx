import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import dbService from "../appwrite/dbservices";
import { toast } from "react-toastify";
import "./carousalstyle.css";
import Preloader from "../components/Preloader";
import { WhatsappShareButton, WhatsappIcon } from "react-share";
import { setsrvcflg } from "../store/preloadSlc";
import authorsvg from "../assets/author.svg";
import calendersvg from "../assets/calender.svg";
import statussvg from "../assets/status.svg";
import dollarsvg from "../assets/dollar.svg";
import deletesvg from "../assets/delete.svg";
import editsvg from "../assets/edit.svg";
import sharesvg from "../assets/share.svg";
import SEO from "../components/SEO";
import AdsenseCmpnt from "../components/AdsenseCmpnt";

const Service = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [deal, setDeal] = useState(null);
	const [loading, setLoading] = useState(true);
	const [btnStat, setbtnStat] = useState(false);
	const { slug } = useParams();
	const [response, setresponse] = useState("Loading...");
	const userData = useSelector((state) => state.authslc.userData);
	const isAuthor = deal && userData ? deal.userId === userData.$id : false;
	const allPosts = useSelector((state) => state.serviceslc);
	const shareUrl = `https://www.uetnestswap.live/service/${deal?.$id}`;

	useEffect(() => {
		// if (slug) {
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
		dbService.delPostService(deal.$id).then((status) => {
			if (status) {
				dbService
					.delFile(deal.image)
					.then(console.log("deleted images"));
				toast.success("Deleted successfully");
				dispatch(setsrvcflg());
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
			<SEO {...deal} />
			<div className="w-full bg-[#002233] py-14">
				<div className="bg-gradient-to-r from-[#0079b8] to-[#023179] [&>*]:border-blue-500 border[1px] border-gray-400 grid lg:grid-flow-col w-[95%] max-w-5xl mx-auto p-2 rounded-lg shadow-xl grid-cols-1 lg:grid-cols-2">
					<div className=" my-auto px-2 py-4 md:p-8">
						{deal ? (
							<img
								src={dbService.previewFile(deal.image)}
								alt={deal.title}
								className="rounded-xl w-full"
							/>
						) : null}
					</div>

					<div className="text-white p-4 my-auto">
						<div className="flex justify-end items-center mb-4 gap-2">
							{isAuthor && (
								<>
									<Link
										to={`/editservice/${deal.$id}`}
										className=" h-[24px]"
									>
										<img src={editsvg} alt="edit" />
									</Link>
									<button
										className={` focus:outline-none  ${
											btnStat ? " blur-sm" : "blur-0"
										}`}
										onClick={() => {
											setbtnStat(true);
											deleteDeal();
										}}
										disabled={btnStat}
									>
										<img src={deletesvg} alt="delete" />
									</button>
								</>
							)}
							<WhatsappShareButton url={shareUrl}>
								{/* <WhatsappIcon
									size={35}
									round={false}
									className="rounded-md"
								/> */}
								<img src={sharesvg} alt="share" />
							</WhatsappShareButton>
						</div>

						<div className="mb-4">
							<h1 className="text-3xl font-bold">{(deal.title).charAt(0).toUpperCase() + (deal.title).slice(1)}</h1>
						</div>
						<div className="flex gap-2">
							<img src={dollarsvg} alt="charges" />{" "}
							<span>{deal.charges}</span>
						</div>
						<div className="mb-4">
							<div className="flex gap-2">
								<img src={authorsvg} alt="author" />
								<span>{deal.author}</span>
							</div>
							<div className="flex gap-2">
								<img src={calendersvg} alt="date" />
								<span>{deal.date}</span>
							</div>
							<div className="flex gap-2">
								<img src={statussvg} alt="availability" />
								<span
									className={`${
										deal.status != "available"
											? "text-red-500"
											: "text-green-500"
									}`}
								>
									{deal.status}
								</span>
							</div>
						</div>
						<div className="mb-4">
							<span className=" font-bold">
								Description:{" "}
							</span>
							<div
								style={{
									overflowWrap: "break-word",
									wordWrap: "break-word",
								}}
							>
								{parse(deal.description)}
								{/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla debitis eaque sed voluptatibus doloremque earum ipsa praesentium voluptas impedit. Molestias minus illo ea a neque.</p> */}
								{/* {console.log(deal.description)} */}
							</div>
						</div>
						{deal.status == "available" && (
							<button className=" cursor-default bg-[#03a9f4] hover:bg-[#2196f3] text-white py-2 px-4 rounded-md focus:outline-none">
								<a
									href={`https://wa.me/${deal.phone}?text=Hello%20${deal.author}!%20I'm%20interested%20in%20your%20service%20offer%20at%20UET%20Nest%20Swap.%20Could%20you%20provide%20more%20information%20about%20it?%20Here's%20the%20link%20https://www.uetnestswap.live%2Fservice%2F${deal.$id}`}
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
			<AdsenseCmpnt/>
		</>
	);
};

export default Service;
