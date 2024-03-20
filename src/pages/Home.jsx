import React, { useEffect, useState } from "react";
import HeroSec from "../components/HeroSec";
import { useSelector } from "react-redux";
import Dealscontainer from "../components/Dealscontainer";
import { Link } from "react-router-dom";
import rentalsvg from "../rental.svg";
import servicesvg from "../service.svg";
import dormpng from "../dorm.png";
import LinkCard from "../components/LinkCard";

const Home = () => {
	const [loading, setLoading] = useState(true);

	const dorms = useSelector((state) => state.dormslc);
	const [dormDeals, setDormDeals] = useState(null);

	const rentals = useSelector((state) => state.rentalslc);
	const [rntls, setRntls] = useState(null);

	const services = useSelector((state) => state.serviceslc);
	const [srvcs, setsrvcs] = useState(null);

	const selectRandomItems = (A) => {
		let B = [];
		let indices = new Set();
		let numItems = Math.min(3, A.length);
		while (indices.size < numItems) {
			let array = new Uint32Array(1);
			window.crypto.getRandomValues(array);
			let randNo = array[0] % A.length;
			if (randNo <= A.length && !indices.has(randNo)) {
				indices.add(randNo);
				B.push(A[randNo]);
			}
		}
		return B;
	};

	useEffect(() => {
		if (dorms.length > 0) {
			setDormDeals(selectRandomItems(dorms));
			console.log("dorms", dormDeals);
		}
	}, [dorms]);

	useEffect(() => {
		if (rentals.length > 0) {
			setRntls(selectRandomItems(rentals));
			console.log("rentals", rntls);
		}
	}, [rentals]);

	useEffect(() => {
		if (services.length > 0) {
			setsrvcs(selectRandomItems(services));
			console.log("services", services);
		}
	}, [services]);

	return (
		<>
			<div className="m-auto border4 border-red-500">
				<HeroSec />
				<div className="bg-[#002233]">
					<div className=" border2 border-green-500 m-auto px-2 md:px-5 py-8 md:w-[95%] max-w-4xl bg[#002233] bg-transparent md:my8 my-0">
						{/* <div className="m-auto px-2 md:px-5 py-8  md:w-[95%] max-w-6xl bg-gradient-to-r from-[#002233] to-[#0152ca] md:rounded-xl md:my-8 my-0"> */}
						<h3
							id="target"
							className=" text-purple500 text-[#ffff] text-3xl font-bold p-4 m-auto text-center "
						>
							Featured Deals
						</h3>
						<div className="my-5">
							<div>
								<h3 className="text-blue400 text-[#ffff] text-xl font-semibold px-2">
									Dorm Deals
								</h3>
								{dormDeals && (
									<Dealscontainer
										posts={dormDeals}
										link="/dormdeals"
									/>
								)}
							</div>

							<div className="my-5">
								<h3 className="text-blue400 text-[#ffff] text-xl font-semibold px-2">
									Rentals
								</h3>
								{rntls && (
									<Dealscontainer
										posts={rntls}
										link="/services"
									/>
								)}
							</div>

							<div className="my-5">
								<h3 className="text-blue400 text-[#ffff] text-xl font-semibold px-2">
									Services
								</h3>
								{srvcs && (
									<Dealscontainer
										posts={srvcs}
										link="/rentals"
									/>
								)}
							</div>
						</div>
					</div>
					<div className="mt-4">
						<h3 className=" text-purple500 text-[#ffff] text-3xl font-bold p-4 m-auto text-center ">
							Get started As
						</h3>

						<div className="flex flex-col gap-5 p-4 md:flex-row items-center justify-between border2 m-auto md:w-[95%] max-w-6xl bg[#002233] bg-transparent my-0">
							<LinkCard
								clsnm="border2 w-full md:w-[25%]"
								lnk='/dormform'
								image={dormpng}
								title={"A seller"}
								description={
									"Clear out your space and earn money by selling items to fellow students."
								}
							/>
							<LinkCard
								clsnm="border2 w-full md:w-[25%]"
								lnk='/rentalform'
								image={rentalsvg}
								title={"A vehicle owner"}
								description={
									"Earn extra income and help students with their transportation needs."
								}
							/>
							<LinkCard
								clsnm="border2 w-full md:w-[25%]"
								lnk='/serviceform'
								image={servicesvg}
								title={"A service provider"}
								description={
									"Showcase your skills, provide services to earn money, and assist students with their tasks."
								}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
