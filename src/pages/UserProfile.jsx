import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DormCard from "../components/DormCard";

const UserProfile = () => {
	const [usrData, setUsrData] = useState(null);
	const [deals, setDeals] = useState(null);
	const userData = useSelector((state) => state.authslc.userData);
	const dormsData = useSelector((state) => state.dormslc);
	// const [response, setResponse] = useState('Loading...');

	useEffect(() => {
		setUsrData(userData);
	}, [userData]);

	useEffect(() => {
		if (usrData) {
			if (dormsData) {
				setDeals(
					dormsData.filter((item) => item.userId == usrData.$id)
				);
			} else {
				console.log("failed to load");
			}
		}
	}, [dormsData, usrData]);

	return (
		<>
			<div>UserProfile ---------------------</div>
			{usrData ? (
				<div>
					<p>{usrData.name}</p>
					<p>{usrData.email}</p>
					<p>
						{usrData.emailVerification && (
							<span>Verified User</span>
						)}
					</p>
				</div>
			) : null}
			<div>Dashboard ---------------------</div>
			<div className="flex flex-wrap">
				{deals ? (
					deals?.map((deal) => (
						<div key={deal.$id} className="p-2 w-1/4">
							<DormCard {...deal} />
						</div>
					))
				) : (
					<p>No Data Found....</p>
				)}
			</div>
		</>
	);
};

export default UserProfile;
