import React, { useEffect } from "react";
import HeroSec from "../components/HeroSec";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import dbService from "../appwrite/dbservices";
import { setdorms, clrdorms } from "../store/dormSlc";
import { setrental, clrrental } from "../store/rentalSlc";
import { setsrvc, clrsrvc } from "../store/servicesSlc";

const Home = () => {
  
  // const dorms = useSelector(state => state.dormslc);
  // const rentals = useSelector(state => state.rentalslc);
  // const services = useSelector(state => state.serviceslc);
	return (
		<>
			<div>Home</div>
			<HeroSec />
			<button
				onClick={() => {
					console.log(data);
				}}
			>
				print data
			</button>
		</>
	);
};

export default Home;
