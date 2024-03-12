import React, { useEffect, useState } from "react";
import dbService from "../appwrite/dbservices";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DormCard from "../components/DormCard";
import "../components/pagination.css";

const Rentals = () => {
	const [rentals, setRentals] = useState(null);
	const rntls = useSelector((state) => state.rentalslc);
	const navigate = useNavigate();

	const [page, setPage] = useState(1);

	useEffect(() => {
		setRentals(rntls);
	}, [rntls, location, navigate]);

	const selectPageHandler = (selectedPage) => {
		if (
			selectedPage >= 1 &&
			selectedPage <= Math.ceil(rentals.length / 12) && // Fix: Calculate the correct length of the deals array
			selectedPage !== page
		) {
			setPage(selectedPage);
		}
	};

	return (
		<>
			<div className="w-full py-8">
				<div>DormDeals</div>
				<div className="flex flex-wrap">
					{rentals ? (
						rentals.slice(page * 12 - 12, page * 12).map((deal) => (
							<div key={deal.$id} className="p-2 w-1/4">
								<DormCard {...deal} />
								{console.log({deal})}
							</div>
						))
					) : (
						<p> Loading... </p>
					)}
				</div>
				{rentals && rentals.length > 0 && (
					<div className="pagination">
						<span
							onClick={() => selectPageHandler(page - 1)}
							className={page > 1 ? "" : "pagination__disable"}
						>
							◀
						</span>

						{[...Array(Math.ceil(rentals.length / 12))].map(
							(_, i) => {
								// Fix: Calculate the correct length of the rentals array
								return (
									<span
										key={i}
										className={
											page === i + 1
												? "pagination__selected"
												: ""
										}
										onClick={() => selectPageHandler(i + 1)}
									>
										{i + 1}
									</span>
								);
							}
						)}

						<span
							onClick={() => selectPageHandler(page + 1)}
							className={
								page < Math.ceil(rentals.length / 12) // Fix: Calculate the correct length of the rentals array
									? ""
									: "pagination__disable"
							}
						>
							▶
						</span>
					</div>
				)}
			</div>
		</>
	);
};

export default Rentals;
