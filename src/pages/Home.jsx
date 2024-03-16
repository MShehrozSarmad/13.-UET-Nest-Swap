import React, { useEffect, useState } from "react";
import HeroSec from "../components/HeroSec";
import { useSelector } from "react-redux";
import Dealscontainer from "../components/Dealscontainer";
import { Link } from "react-router-dom";
// import { setdorms, clrdorms } from "../store/dormSlc";
// import { setrentals, clrrentals } from "../store/rentalSlc";
// import { setsrvcs, clrsrvcs } from "../store/servicesSlc";

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
		// console.log("triggered", dorms);
		if (dorms.length > 0) {
			setDormDeals(selectRandomItems(dorms));
			console.log("dorms", dormDeals);
		}
	}, [dorms]);

	useEffect(() => {
		// console.log("triggered", rentals);
		if (rentals.length > 0) {
			setRntls(selectRandomItems(rentals));
			console.log("rentals", rntls);
		}
	}, [rentals]);

	useEffect(() => {
		// console.log("triggered", services);
		if (services.length > 0) {
			setsrvcs(selectRandomItems(services));
			console.log("services", services);
		}
	}, [services]);

	return (
		<>
			<div className="m-auto">
				<HeroSec />
				<div className="m-auto px-2 md:px-5 py-8  md:w-[95%] max-w-6xl bg-[#002233] md:rounded-xl md:my-8 my-0">
					<h3 id="target" className=" text-purple500 text-[#0066ff] text-2xl font-bold p-4 m-auto text-center ">
						Featured Deals
					</h3>
					<div className="my-5">
						<div>
							<h3 className="text-blue400 text-[#689250] text-xl font-semibold px-2">
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
							<h3 className="text-blue400 text-[#689250] text-xl font-semibold px-2">
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
							<h3 className="text-blue400 text-[#689250] text-xl font-semibold px-2">
								Services
							</h3>
							{srvcs && (
								<Dealscontainer posts={srvcs} link="/rentals" />
							)}
						</div>
					</div>
				</div>
				<section className="flex flex-wrap">
					<div className="p-2 w-[33.3%]">
						<Link to={"/dormform"}>Post Deal</Link>
					</div>
					<div className="p-2 w-[33.3%]">
						<Link to={"/rentalform"}>Post Rental</Link>
					</div>
					<div className="p-2 w-[33.3%]">
						<Link to={"/serviceform"}>Post Service</Link>
					</div>
				</section>
			</div>
		</>
	);
};

export default Home;
