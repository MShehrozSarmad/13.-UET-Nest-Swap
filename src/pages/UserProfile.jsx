import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DormCard from "../components/DormCard";
import { Link } from "react-router-dom";
import LogoutBtn from "../components/LogoutBtn";
import UserProfileCard from "../components/UserProfileCard";
// import Preloader from '../components/Preloader'
import Preloader from "../components/Preloader";

const UserProfile = () => {
	const [usrData, setUsrData] = useState(null);
	const userData = useSelector((state) => state.authslc.userData);
	const [deals, setDeals] = useState(null);
	const dormsData = useSelector((state) => state.dormslc);
	const [rentals, setrentals] = useState(null);
	const rntlsData = useSelector((state) => state.rentalslc);
	const [services, setservices] = useState(null);
	const srvcsData = useSelector((state) => state.serviceslc);

	// const [response, setResponse] = useState("Loading...");
	// const [flag, setFlag] = useState(true);
	// const [flag1, setFlag1] = useState(true);
	// const [flag2, setFlag2] = useState(true);
	// const [flag3, setFlag3] = useState(true);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (userData) {
			setUsrData(userData);
			setLoading(false);
		} else {
			setLoading(true);
		}
	}, [userData]);

	useEffect(() => {
		if (usrData && dormsData) {
			setDeals(dormsData.filter((item) => item.userId === usrData.$id));
		} else {
		}
	}, [dormsData, usrData]);

	useEffect(() => {
		if (usrData && rntlsData) {
			setrentals(rntlsData.filter((item) => item.userId === usrData.$id));
		} else {
			// console.log("rntls failed");
		}
	}, [rntlsData, usrData]);

	useEffect(() => {
		if (usrData && srvcsData) {
			setservices(
				srvcsData.filter((item) => item.userId === usrData.$id)
			);
		} else {
			// console.log("services failed");
		}
	}, [srvcsData, usrData]);

	return loading ? (
		<Preloader />
	) : (
		<>
			{usrData ? (
				<UserProfileCard
					name={usrData.name}
					email={usrData.email}
					isVerified={usrData.emailVerification}
				/>
			) : null}
			<div className="w-full text-white bg-[#002233]">
				<div className=" m-auto w-[95%] max-w-6xl py-8">
					<h1 className="text-center font-bold text-3xl mb-8">
						Dashboard
					</h1>
					<div>
						<h3 className="text-bold text-2xl p-2">Dorm Deals</h3>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3">
							{deals?.length > 0 ? (
								deals.map((deal) => (
									<div key={deal.$id} className="p-2">
										<DormCard {...deal} />
									</div>
								))
							) : (
								<p className="p-2 text-yellow-600">
									{" "}
									⚠️ No Ad Posted
								</p>
							)}
						</div>
					</div>
					<div className="my-8">
						<h3 className="text-bold text-2xl p-2">Rentals</h3>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3">
							{rentals?.length > 0 ? (
								rentals.map((deal) => (
									<div key={deal.$id} className="p-2">
										<DormCard {...deal} />
									</div>
								))
							) : (
								<p className="p-2 text-yellow-600">
									{" "}
									⚠️ No Ad Posted
								</p>
							)}
						</div>
					</div>
					<div>
						<h3 className="text-bold text-2xl p-2">Services</h3>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3">
							{services?.length > 0 ? (
								services.map((deal) => (
									<div key={deal.$id} className="p-2">
										<DormCard {...deal} />
									</div>
								))
							) : (
								<p className="p-2 text-yellow-600">
									{" "}
									⚠️ No Ad Posted
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserProfile;
