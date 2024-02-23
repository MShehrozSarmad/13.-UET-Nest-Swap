import React, { useEffect, useState } from "react";
import dbService from "../appwrite/dbservices";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DormCard from "../components/DormCard";

const DormDeals = () => {
	const [deals, setDeals] = useState(null);
	const dorms = useSelector((state) => state.dormslc);

	useEffect(() => {
		setDeals(dorms);
	}, [dorms]);

	return (
		<>
			<div className="w-full py-8">
				<div>DormDeals</div>
				<div className="flex flex-wrap">
					{deals ? (
						deals.map((deal) => (
							<div
								key={deal.$id}
								className="p-2 w-1/4"
							>
								<DormCard {...deal} />
							</div>
						))
					) : (
						<p> No deal found </p>
					)}
				</div>
			</div>
		</>
	);
};

export default DormDeals;