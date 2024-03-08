import React from "react";
import DormCard from './DormCard';
import { Link } from "react-router-dom";

const Dealscontainer = ({posts, link}) => {
	return (
		<>
			<div className="flex flex-wrap">
				{posts ? (
					posts.map((post) => (
						<div key={post.$id} className="p-2 w-1/4">
							<DormCard {...post} />
						</div>
					))
				) : (
					<p>No Data Found....</p>
				)}
                <Link to={link} className=" border">See More ➡️</Link>
			</div>
		</>
	);
};

export default Dealscontainer;
