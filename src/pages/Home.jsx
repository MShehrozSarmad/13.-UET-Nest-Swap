import React, { useEffect, useState } from "react";
import HeroSec from "../components/HeroSec";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import dbService from "../appwrite/dbservices";
import { setdorms, clrdorms } from "../store/dormSlc";
import { setrental, clrrental } from "../store/rentalSlc";
import { setsrvc, clrsrvc } from "../store/servicesSlc";

const Home = () => {
	const dorms = useSelector((state) => state.dormslc);
	const [dormDeals, setDormDeals] = useState(null);
	const [loading, setLoading] = useState(true);
	
	// const rentals = useSelector(state => state.rentalslc);
	// const services = useSelector(state => state.serviceslc);

	const selectRandomItems = (A) => {
		let B = [];
		let indices = new Set();
		let numItems = Math.min(3, A.length);
		while(indices.size < numItems) {
			let array = new Uint32Array(1);
			window.crypto.getRandomValues(array);
			let randNo = array[0] % A.length;
			if(randNo <= A.length && !indices.has(randNo)) {
				indices.add(randNo);
				B.push(A[randNo]);
			}
		}
		return B;
	}

	useEffect(() => {
		console.log("triggered", dorms);
		if (dorms.length > 0) {
			setDormDeals(selectRandomItems(dorms));
			console.log(dormDeals);
		}
	}, [dorms]);


	return (
		<>
			<HeroSec />
			{
				dormDeals && <p>Hello {dormDeals[0].title}</p>
			}
		</>
	);
};

export default Home;