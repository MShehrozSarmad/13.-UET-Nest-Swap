import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DormCard from "../components/DormCard";
import "../components/pagination.css";
import Preloader from "../components/Preloader";
import SEO from "../components/SEO";
import AdsenseCmpnt from "../components/AdsenseCmpnt";

const Rentals = () => {
	const [rentals, setRentals] = useState(null);
	const rntls = useSelector((state) => state.rentalslc);
	const navigate = useNavigate();

	const [page, setPage] = useState(1);

	const flag1 = useSelector((state) => state.preloadslc.flag1);
	const flag2 = useSelector((state) => state.preloadslc.flag2);
	const flag3 = useSelector((state) => state.preloadslc.flag3);
	const flag4 = useSelector((state) => state.preloadslc.flag4);
	const [flag, setFlag] = useState(true);

	useEffect(() => {
		if (!flag1 && !flag2 && !flag3 && !flag4) {
			setFlag(false);
		} else {
			setFlag(true);
		}
	}, [flag1, flag2, flag3, flag4]);

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

	return flag ? (
		<Preloader />
	) : (
		<>
			<SEO title={'Rentals'} desc={"Rent out vehicles to your fellow students at UET Taxila students to earn side income."} />
			<div className="w-full bg-[#002233]">
				<div className=" m-auto w-[95%] max-w-6xl py-8">
					<h1 className="text-white text-center font-bold text-3xl mb-8">
						Rentals
					</h1>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3">
						{rentals ? (
							rentals
								.slice(page * 12 - 12, page * 12)
								.map((deal) => (
									<div key={deal.$id} className="p-2">
										<DormCard {...deal} />
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
								className={
									page > 1 ? "" : "pagination__disable"
								}
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
												`${page > 1 ? "" : "pagination__disable"}
												${page === i + 1 ? "pagination__selected" : ""}
												`
											}
											onClick={() =>
												selectPageHandler(i + 1)
											}
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
			</div>
			<AdsenseCmpnt/>
		</>
	);
};

export default Rentals;
