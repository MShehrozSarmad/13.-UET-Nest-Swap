import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import logo from "../../assets/logo.png";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const authStatus = useSelector((state) => state.authslc.status);
	const navigate = useNavigate();
	const userData = useSelector(state => state.authslc.userData);
    
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
			name: "Add Post",
			slug: "/dormform",
			active: authStatus,
		},
	];

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};


	return (
		// absolute w-full mb-[50vh]
		<header className="border2 border-red-500">
			<div className="header  bg[#34404F] bg-[#002233] text-white p-2">
				<nav className="flex flex-wrap items-center justify-between">
					<div className=" mx-2">
						<Link to="/">
							<img className="h-[3.2rem] drop-shadow-md" src={logo} alt="logo" />
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
										d="M19 12H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2zm0-7H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2zm0 14H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2z"
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
					<ul
						className={`${
							isMenuOpen ? "block" : "hidden"
						} md:flex md:flex-wrap md:items-center md:ml-auto`}
					>
						{navItems.map((item) =>
							item.active ? (
								<li key={item.name}>
									<button
										onClick={() => navigate(item.slug)}
										className="inline-block px-6 py-2 duration-200 hover:bg-blue100 hover:text-[#A9C5A0]"
									>
										{item.name}
									</button>
								</li>
							) : null
						)}
						{authStatus && (
							<>
								<li className="ml-4">
									<LogoutBtn />
								</li>
								<li className="inline-block px-6 py-2 hover:text-[#053e7c] rounded-full" style={{ color: "white" }}>
									<Link className="hover:text-[#A9C5A0] duration-200" to={'userprofile'}>{(userData?.name).split(' ').slice(0, 2).join(' ')} </Link>
								</li>
							</>
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
