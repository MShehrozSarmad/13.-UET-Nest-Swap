import React, { useEffect, useState } from "react";
import dbService from "../appwrite/dbservices";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DormCard from "../components/DormCard";
import "../components/pagination.css";
import Preloader from '../components/Preloader';

const DormDeals = () => {
	const [deals, setDeals] = useState(null);
	const dorms = useSelector((state) => state.dormslc);
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
			// console.log("set to false!");
		} else {
			setFlag(true);
			// console.log("till true!");
		}
	}, [flag1, flag2, flag3, flag4]);

	useEffect(() => {
		setDeals(dorms);
	}, [dorms, location, navigate]);

	const selectPageHandler = (selectedPage) => {
		if (
			selectedPage >= 1 &&
			selectedPage <= Math.ceil(deals.length / 12) && // Fix: Calculate the correct length of the deals array
			selectedPage !== page
		) {
			setPage(selectedPage);
		}
	};

	return flag ? (
		<Preloader />
	) : (
		<>
			<div className="w-full bg-[#002233]">
				<div className=" m-auto w-[95%] max-w-6xl py-8">
					<h1 className="text-white text-center font-bold text-3xl mb-8">
						DormDeals
					</h1>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3">
						{deals ? (
							deals
								.slice(page * 12 - 12, page * 12)
								.map((deal) => (
									<div key={deal.$id} className="p-2 w1/4">
										<DormCard {...deal} />
									</div>
								))
						) : (
							<p> Loading... </p>
						)}
					</div>
					{deals && deals.length > 0 && (
						<div className="pagination">
							<span
								onClick={() => selectPageHandler(page - 1)}
								className={
									page > 1 ? "" : "pagination__disable"
								}
							>
								◀
							</span>

							{[...Array(Math.ceil(deals.length / 12))].map(
								(_, i) => {
									// Fix: Calculate the correct length of the deals array
									return (
										<span
											key={i}
											className={
												page === i + 1
													? "pagination__selected"
													: ""
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
									page < Math.ceil(deals.length / 12) // Fix: Calculate the correct length of the deals array
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
		</>
	);
};

export default DormDeals;
