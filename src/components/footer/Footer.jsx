import React from "react";
import { Link } from "react-router-dom";
// import logo from "../../assets/logo.png";
import logo from "../../assets/logoo.png";

const Footer = () => {
	return (
		<>
		{/* text-[#A9C5A0] */}
			<div className="border-t-[1px] border-gray-500 text-center p-2 py-8 bg-[#002233] text-gray-400 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				<div className=" flex flex-col justify-evenly p-2 gap-8 sm:col-span-2 md:row-span-2 md:col-span-1 lg:row-span-1">
					<p className=" w-fit m-auto">
						<Link to={"/"}>
							<img src={logo} alt="Logo" className="h-[3.2rem]" />
						</Link>
					</p>
					<p className="">
						<span className="">
							©
							<a
								href="https://wa.me/923424295275"
								target="_blank"
								className="hover:text-[#A9C5A0]"
							>
								Muhammad Shehroz Sarmad
							</a>
							&nbsp; | All Rights Reserved
						</span>
					</p>
				</div>
				<div className=" [&>*]:bgred-400 [&>*]:m-auto [&>*]:text-justify [&>*]:w-[10rem] bgblue-800 flex flex-col justify-evenly p-2 gap-3 ">
					<p>
						<Link to="help" className="hover:text-[#A9C5A0]">
							Help
						</Link>
					</p>
					<p>
						<Link to="/aboutus" className="hover:text-[#A9C5A0]">
							About Us
						</Link>
					</p>
					<p>
						<Link to="/feedback" className="hover:text-[#A9C5A0]">
							Feedback
						</Link>
					</p>
				</div>
				<div className="bggreen-800 flex flex-col justify-evenly p-2 gap-3 [&>*]:bgred-400 [&>*]:m-auto [&>*]:text-justify [&>*]:w-[10rem]">
					<p>
						<Link to="/complaint" className="hover:text-[#A9C5A0]">
							Complaints
						</Link>
					</p>
					<p>
						<Link to="/privacy" className="hover:text-[#A9C5A0]">
							Privacy Policy
						</Link>
					</p>

					<p>
						<Link to="/terms" className="hover:text-[#A9C5A0]">
							Terms and Conditions
						</Link>
					</p>
				</div>
			</div>
		</>
	);
};

export default Footer;
