import React from "react";
import DormCard from "./DormCard";
import { Link } from "react-router-dom";
import "./custom.css";

const Dealscontainer = ({ posts, link }) => {
	return (
		<>
			<div className="flex flex-wrap items-center justify-evenly gap-2 md:gap-5 md:p-2 my-2">
				{posts ? (
					posts.map((post, index) => (
						<div key={post.$id} className={`w-[48%] md:w-[30%] ${index == 2 ? 'hidden' : 'block'} md:block `}>
							<DormCard {...post} />
						</div>
					))
				) : (
					<p>No Data Found....</p>
				)}
				<Link
					to={link}
					className=" h-fit mauto hidden md:block"
				>
					➡️
				</Link>
			</div>
		</>
	);
};

export default Dealscontainer;
