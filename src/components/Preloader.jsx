import React from "react";
import Lottie from "lottie-react";
// import animation from "../../src/loading.json";
import animation from "../../src/loadinglptp.json";
// import animation from "../../src/loadingecom.json";

const Preloader = () => {
	return (
		<div className="border2 border-red-500 w-full h-[80vh] flex justify-center content-center">
			<Lottie
				className="border2 w-[200px] border-blue-500"
				animationData={animation}
				loop={true}
			/>
		</div>
	);
};

export default Preloader;
