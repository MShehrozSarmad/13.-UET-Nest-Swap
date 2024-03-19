import React from "react";
import DormCard from "./DormCard";
import { Link } from "react-router-dom";
import "./custom.css";
import seemore from "../seemore.svg";

const Dealscontainer = ({ posts, link }) => {
	return (
		<>
			<div className=" border2 border-red-500 flex flex-wrap items-center justifyevenly justify-between justifyaround gap-2 md:gap-5 md:p-2 my-2">
				{posts ? (
					posts.map((post, index) => (
						<div
							key={post.$id}
							className={`w-[48%] md:w-[30%] ${
								index == 2 ? "hidden" : "block"
							} md:block `}
						>
							<DormCard {...post} />
						</div>
					))
				) : (
					<p>No Data Found....</p>
				)}
				{/* <Link to={link} className=" h-fit mauto hidden md:block">
					<img className="w-[20px]" src={seemore} alt="seemore" />
				</Link> */}
			</div>

			{/* <Link to={link} className=" h-fit mauto hidden md:block">
				<img className="w-[20px]" src={seemore} alt="seemore" />
			</Link> */}
		</>
	);
	{/* See More➡️ */}
};

export default Dealscontainer;
