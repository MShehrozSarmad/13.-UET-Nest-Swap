import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logoo.png";
import Dropdown from "./DropDown";
import { motion } from "framer-motion";
import '../fds.css';

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const authStatus = useSelector((state) => state.authslc.status);
	const navigate = useNavigate();
	const userData = useSelector((state) => state.authslc.userData);

	const navItems = [
		{
			name: "Dorm Deals",
			slug: "/dormdeals",
			active: true,
		},
		{
			name: "Rentals",
			slug: "/rentals",
			active: true,
		},
		{
			name: "Services",
			slug: "/services",
			active: true,
		},
		{
			name: "SignIn",
			slug: "/signin",
			active: !authStatus,
		},
		{
			name: "Post Ad",
			slug: "#",
			// slug: "/dormform",
			active: authStatus,
		},
	];

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		// absolute w-full mb-[50vh]
		<motion.header
			initial={{ height: 'auto' }}
			animate={{ height: isMenuOpen ? "auto" : '8vh' }}
			transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
			className="border2 border-red-500"
		>
			<div className="header  bg[#34404F] bg-[#002233] text-white p-2">
				<nav className="flex flex-wrap items-center justify-between">
					<div className=" mx-2">
						<Link to="/">
							<img
								className="h-[3.2rem] fdslogo"
								src={logo}
								alt="logo"
							/>
						</Link>
					</div>
					<div className="ml-auto">
						<button
							className="block md:hidden textwhite focus:outline-none"
							onClick={toggleMenu}
						>
							<svg
								className="h-6 w-6 fill-current"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								{isMenuOpen ? (
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M5.707 5.293a1 1 0 011.414 0L12 10.586l4.879-4.879a1 1 0 111.414 1.414L13.414 12l4.879 4.879a1 1 0 11-1.414 1.414L12 13.414l-4.879 4.879a1 1 0 01-1.414-1.414L10.586 12 5.707 7.121a1 1 0 010-1.414z"
									/>
								) : (
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"
									/>
								)}
							</svg>
						</button>
					</div>
					<motion.ul
						// initial={{ x: "100%" }}
						// animate={{ x: isMenuOpen ? "0%" : "100%" }}
						// transition={{
						// 	type: "spring",
						// 	stiffness: 60,
						// 	damping: 20,
						// }}
						className={`${
							isMenuOpen ? "block" : "hidden"
						} md:flex md:flex-wrap md:items-center md:ml-auto`}
					>
						{navItems.map((item) =>
							item.active ? (
								item.name == "Post Ad" ? (
									<li key={item.name}>
										<Dropdown />
									</li>
								) : (
									<li key={item.name}>
										<button
											onClick={() => navigate(item.slug)}
											className="inline-block px-6 py-2 duration-200 hover:bg-blue100 hover:text-[#A9C5A0]"
										>
											{item.name}
										</button>
									</li>
								)
							) : null
						)}
						{authStatus && (
							<>
								<li
									className="inline-block px-6 py-2 hover:text-[#053e7c] rounded-full"
									style={{ color: "white" }}
								>
									<Link
										className="hover:text-[#A9C5A0] duration-200"
										to={"userprofile"}
									>
										{(userData?.name)
											.split(" ")
											.slice(0, 2)
											.join(" ")}{" "}
									</Link>
								</li>
							</>
						)}
					</motion.ul>
				</nav>
			</div>
		</motion.header>
	);
};

export default Header;
