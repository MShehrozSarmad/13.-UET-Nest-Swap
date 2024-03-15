import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animation from "../loading.json";
import downarrow from "../downarrow.json";
import bckgrnd from "../wave-haikei.svg";

const HeroSec = () => {
	// return (
	//   <div className="bg-[#4696EC] text-white py-20 px-5 md:px-20 text-center">
	//     <h1 className="text-3xl md:text-5xl font-bold mb-6">Your Campus Exchange Hub</h1>
	//     <p className="text-lg md:text-xl mb-8">UET Nest Swap, Where Deals Meet Convenience!</p>
	//     <button className="bg-white text-[#4696EC] py-2 px-6 rounded-full font-semibold text-lg hover:bg-[#F5F5F5] hover:text-[#4696EC] transition duration-300">
	//       <Link to={'/'}>Get Started</Link>
	//     </button>
	//   </div>
	// );

	const scrollToSection = () => {
		const targetSection = document.getElementById("target");
		targetSection.scrollIntoView({ behavior: "smooth" });
	};

	return (
		// <div className=" py-5 px5 md:px-10 bg-[#4696EC] text-white  text-center h-[85vh] border-2 border-red-500">
		// 	{/* <div className=" py-5 px5 md:px-10 bg-[#4696EC] h[70%]"> */}
		// 		<div className=" border-2 border-black h-[50%]">
		// 			<Lottie
		// 				className=" h-full border2 border-red-500"
		// 				animationData={animation}
		// 				loop={true}
		// 			/>
		// 		</div>
		// 		<div className="max-w-4xl mx-auto">
		// 			{/* <img
		// 			src="your-image-url.jpg"
		// 			alt="UET Nest Swap"
		// 			className="mx-auto mb-8"
		// 		/> */}
		// 			<h1 className="text-3xl md:text-5xl font-bold mb-6">
		// 				{/* Your Campus Exchange Hub */}
		// 				UET Nest Swap
		// 			</h1>
		// 			<p className="text-lg md:text-xl mb">
		// 				{/* UET Nest Swap, Where Deals Meet Convenience! */}
		// 				Your Campus Exchange Hub,
		// 				{/* UET Nest Swap, Where Deals Meet Convenience! */}
		// 			</p>
		// 			<p className="text-lg md:text-xl mb-8">
		// 				Where Deals Meet Convenience!
		// 			</p>
		// 			<button
		// 				className="bg-white text-[#4696EC] py-2 px-6 rounded-full font-semibold text-lg hover:bg-[#F5F5F5] hover:text-[#4696EC] transition duration-300"
		// 				onClick={scrollToSection}
		// 			>
		// 				Get Started
		// 				{/* <Lottie className=" inline-block" animationData={downarrow} loop={true}/> */}
		// 			</button>
		// 		</div>
		// 	{/* </div> */}

		// 	<div className=" h[30%] border-2 border-black w-full">
		// 		<svg
		// 			xmlns="http://www.w3.org/2000/svg"
		// 			viewBox="0 0 1440 320"
		// 			className="border-2 border-red-500"
		// 		>
		// 			<path
		// 				// fill="#0099ff"
		// 				fill="#4696EC"
		// 				fill-opacity="1"
		// 				d="M0,128L80,138.7C160,149,320,171,480,160C640,149,800,107,960,96C1120,85,1280,107,1360,117.3L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
		// 			></path>
		// 		</svg>
		// 	</div>
		// </div>
		// <div className=" border-2 border-red-500 bg-[url('../wave-haikei.svg')] w-full h-[100vh] " >

		// {/* <di className=" py-5 px5 md:px-10 bg-[#4696EC] h[70%]"> */}

		// {/* max-w-4xl */}
		// {/* h-[60%] */}

		// <div className="bg-hero-pattern w-full h-[80vh] bg-cover bg-center py-5 px5 md:px-10 flex content-center justify-between">
		// 		<div className=" border2  mxauto text-white flex flex-col justify-center contentcenter">
		// 			<h1 className="text-3xl md:text-5xl font-bold mb-6">
		// 				UET Nest Swap
		// 			</h1>
		// 			<p className="text-lg md:text-xl mb">
		// 				Your Campus Exchange Hub,
		// 			</p>
		// 			<p className="text-lg md:text-xl mb-8">
		// 				Where Deals Meet Convenience!
		// 			</p>
		// 			<button
		// 				className=" w-fit bg-white text-[#4696EC] py-2 px-6 rounded-full font-semibold text-lg hover:bg-[#F5F5F5] hover:text-[#4696EC] transition duration-300"
		// 				onClick={scrollToSection}
		// 			>
		// 				Get Started
		// 				{/* <Lottie className=" inline-block" animationData={downarrow} loop={true}/> */}
		// 			</button>
		// 		</div>
		//     <div className=" border2 border-black ">
		//  			<Lottie
		// 				className=" h-full border2 border-red-500"
		// 				animationData={animation}
		// 				loop={true}
		// 			/>
		// 		</div>
		// </div>

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
					className="bg-white text-[#4696EC] py-2 px-6 rounded-full font-semibold text-lg hover:bg-[#F5F5F5] hover:text-[#4696EC] transition duration-300"
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
