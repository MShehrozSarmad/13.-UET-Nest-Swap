import React, { useEffect, useState } from "react";
import HeroSec from "../components/HeroSec";
import { useSelector } from "react-redux";
import Dealscontainer from "../components/Dealscontainer";
import { Link } from "react-router-dom";
import { setdorms, clrdorms } from "../store/dormSlc";
import { setrentals, clrrentals } from "../store/rentalSlc";
import { setsrvcs, clrsrvcs } from "../store/servicesSlc";

const Home = () => {
	const [loading, setLoading] = useState(true);

	const dorms = useSelector((state) => state.dormslc);
	const [dormDeals, setDormDeals] = useState(null);

	// const rentals = useSelector(state => state.rentalslc);
	const [rntls, setRntls] = useState(null);

	// const services = useSelector(state => state.serviceslc);
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
		console.log("triggered", dorms);
		if (dorms.length > 0) {
			setDormDeals(selectRandomItems(dorms));
			console.log(dormDeals);
		}
	}, [dorms]);

	// useEffect(() => {
	// 	console.log("triggered", dorms);
	// 	if (dorms.length > 0) {
	// 		setDormDeals(selectRandomItems(dorms));
	// 		console.log(dormDeals);
	// 	}
	// }, [dorms]);

	// useEffect(() => {
	// 	console.log("triggered", dorms);
	// 	if (dorms.length > 0) {
	// 		setDormDeals(selectRandomItems(dorms));
	// 		console.log(dormDeals);
	// 	}
	// }, [dorms]);

	return (
		<>
			<HeroSec />
			{dormDeals && <Dealscontainer posts={dormDeals} link="/dormdeals" />}
			{rntls && <Dealscontainer posts={rntls} link="/services" />}
			{srvcs && <Dealscontainer posts={srvcs} link="/rentals" />}
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
		</>
	);
};

export default Home;
