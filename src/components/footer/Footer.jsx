import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Footer = () => {
	return (
		// <footer className="bg-gray-800 text-white">
		//     <div className="container mx-auto py-4 px-6 flex flex-wrap items-center justify-between">
		//         <div className="flex items-center">
		//             <img src="logo.png" alt="Logo" className="w-8 h-8 mr-2" />
		//             <span className="font-bold">Logo</span>
		//             <span className="mr-4">© <a href="https://wa.me/923424295275" target='_blank'>Muhammad Shehroz Sarmad</a> </span>
		//         </div>
		//         <div className="flex flex-wrap items-center">
		//             <Link to="#" className="mr-4">About Us</Link>
		//             <Link to="#" className="mr-4">Complaints</Link>
		//             <Link to="#" className="mr-4">Terms and Conditions</Link>
		//         </div>
		//         <div className="flex flex-wrap items-center">
		//             <Link to="#" className="mr-4">Help</Link>
		//             <Link to="#" className="mr-4">Contact Us</Link>
		//             <Link to="#" className="mr-4">Contribute</Link>
		//         </div>
		//     </div>
		// </footer>
		<>
			<div className=" text-center p-2 bg-gray-400  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				<div className=" flex flex-col justify-evenly p-2 gap-2 sm:col-span-2 md:row-span-2 md:col-span-1 lg:row-span-1">
					<p className=" w-fit m-auto">
						<Link to={"/"}>
							<img src={logo} alt="Logo" className="h-[3.5rem]" />
						</Link>
					</p>
					<p className="">
						<span className="">
							©
							<a
								href="https://wa.me/923424295275"
								target="_blank"
							>
								Muhammad Shehroz Sarmad
							</a>
							&nbsp; | All Rights Reserved
						</span>
					</p>
				</div>
				<div className=" [&>*]:bgred-400 [&>*]:m-auto [&>*]:text-justify [&>*]:w-[10rem] bgblue-800 flex flex-col justify-evenly p-2 gap-2">
					<p>
						<Link to="help" className="">
							Help
						</Link>
					</p>
					<p>
						<Link to="/aboutus" className="">
							About Us
						</Link>
					</p>
					<p>
						<Link to="/feedback" className="">
							Feedback
						</Link>
					</p>
				</div>
				<div className="bggreen-800 flex flex-col justify-evenly p-2 gap-2 [&>*]:bgred-400 [&>*]:m-auto [&>*]:text-justify [&>*]:w-[10rem]">
					<p>
						<Link to="/complaint" className="">
							Complaints
						</Link>
					</p>
					<p>
						<Link to="/privacy" className="">
							Privacy Policy
						</Link>
					</p>

					<p>
						<Link to="/terms" className="">
							Terms and Conditions
						</Link>
					</p>
				</div>
			</div>
		</>
	);
};

export default Footer;
