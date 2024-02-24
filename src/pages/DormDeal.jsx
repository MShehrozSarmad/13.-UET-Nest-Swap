import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import parse from "html-react-parser";
import dbService from "../appwrite/dbservices";

const DormDeal = () => {
	const [deal, setDeal] = useState(null);
	const [loading, setLoading] = useState(true);
	const { slug } = useParams();
	const navigate = useNavigate();
	const [response, setresponse] = useState('loading...');

	const userData = useSelector((state) => state.authslc.userData);
	const isAuthor = deal && userData ? deal.userId === userData.$id : false;
	const allPosts = useSelector((state) => state.dormslc);

	useEffect(() => {
		if (slug) {
			const myDeal = allPosts.filter((item) => item.$id == slug)[0];
			myDeal ? setDeal(myDeal) : setresponse('Post not found');
		} else {
			console.log("Post not found");
			setresponse('Post not found');
		}
		console.log("deal", deal);
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
				navigate("/dormdeals");
			}
		});
	};

	return loading ? (
		// <div>loading...</div>
		<div>{response}</div>
	) : (
		<>
			<div>
				<p>dorm deal</p>
				<div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
					<img
						src={dbService.previewFile(deal.image1)}
						alt={deal.title}
						className="rounded-xl"
					/>
				</div>
				<div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
					<img
						src={dbService.previewFile(deal.image2)}
						alt={deal.title}
						className="rounded-xl"
					/>
				</div>
				<div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
					<img
						src={dbService.previewFile(deal.image3)}
						alt={deal.title}
						className="rounded-xl"
					/>
				</div>
				{isAuthor && (
					<div className="absolute right-6 top-6">
						<Link to={`/editdorm/${deal.$id}`}>
							<Button bgColor="bg-green-500" className="mr-3">
								Edit
							</Button>
						</Link>
						<Button bgColor="bg-red-500" onClick={deleteDeal}>
							Delete
						</Button>
					</div>
				)}
				<div className="w-full mb-6">
					<h1 className="text-2xl font-bold">{deal.title}</h1>
				</div>
				<div className="w-full mb-6">
					<h1 className="text-2xl font-bold">
						Demand: {deal.price}PKR
					</h1>
				</div>
				<div>
					<span>By: {deal.author}</span>
					<br />
					<span>Date Posted: {deal.date}</span>
					<br />
					<span>Condition: {deal.condition}/10</span>
					<br />
					<span>Current Status: {deal.status}</span>
					<br />
				</div>
				<div className="browser-css">
					{" "}
					Description: {parse(deal.description)}
				</div>
			</div>
			<p className=" border-red-900 rounded-md w-fit px-3 py-1 bg-slate-500 text-red-600">
				<Link
					target="_blank"
					to={`https://wa.me/923424295275?text=i%20am%20interested%20in%20this%20deal%20https://localhost:5173/dormdeal/${deal.$id}%20and%20i%20offer%20you%20${deal.price}PKR`}
				>
					Make an Offer
				</Link>
			</p>
		</>
	);
};

export default DormDeal;
