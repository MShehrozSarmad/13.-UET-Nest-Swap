import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animation from "../loading.json";
import downarrow from "../downarrow.json";
import bckgrnd from "../wave-haikei.svg";

const HeroSec = () => {
	const scrollToSection = () => {
		const targetSection = document.getElementById("target");
		targetSection.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div className="bg-hero-pattern hscreen h-[92vh] bg-cover bg-center py5 pb-5 px-5 md:px-10 flex flex-col md:flex-row items-center justify-around">
			<div className="text-white flex flex-col items-center md:items-start">
				<h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-3">
					UET Nest Swap
				</h1>
				<p className="text-lg md:text-xl mb-1 md:mb-2">
					Your Campus Exchange Hub,
				</p>
				<p className="text-lg md:text-xl mb-4 md:mb-8">
					Where Deals Meet Convenience!
				</p>
				<button
					className="bg-white text-[#4696EC] py-2 px-6 rounded-full font-semibold text-lg hover:bg-[#689250] hover:text-white transition duration-300"
					onClick={scrollToSection}
				>
					Get Started
				</button>
			</div>
			<div className="border2 border-black mt-5 md:mt-0">
				<Lottie
					className="h-full"
					animationData={animation}
					loop={true}
				/>
			</div>
		</div>
	);
};

export default HeroSec;
