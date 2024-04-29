// import React from "react";

// const Complaints = () => {
//     return (
//         <div className="container mx-auto px-4 py-8 w-[95%] max-w-4xl">
//             <h1 className="text-3xl font-bold mb-4 text-purple-500">Complaint</h1>
//             <p className="mb-4">
//                 If you have any complaint regarding your experience with UET Nest Swap, please let us know. We take allCcomplaints seriously and will strive to resolve them promptly.
//             </p>
//             <h2 className="text-2xl font-bold mb-2">How to Submit a Complaint</h2>
//             <p className="mb-4">
//                 You can submit a complaint by filling out the form below. Please provide as much detail as possible to help us understand and address your concerns.
//             </p>
//             <form className="mb-8">
//                 <label className="block mb-2">Name (optional)</label>
//                 <input type="text" className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full" placeholder="Enter your name" />
//                 <label className="block mb-2">Email (optional)</label>
//                 <input type="email" className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full" placeholder="Enter your email" />
//                 <label className="block mb-2">Complaint</label>
//                 <textarea className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full" rows="5" placeholder="Enter your complaint"></textarea>
//                 <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Submit Complaint</button>
//             </form>
//             <p>
//                 Thank you for bringing your complaint to our attention. We will investigate the matter and take appropriate action to address your concerns.
//             </p>
//         </div>
//     );
// };

// export default Complaints;

import React from "react";
import AdsenseCmpnt from "../components/AdsenseCmpnt";

const Complaints = () => {
	return (
		<>
			<div className="w-full h-screen flex flex-col items-center justify-center text-yellow-500 gap-2 text-lg">
				<p className="">
					Oops! we are not currently accepting complaints, you can notify
					us at
				</p>
				<p>
					<a className="" href="mailto:shehrozm107@gmail.com">shehrozm107@gmail.com</a>
				</p>
			</div>
			<AdsenseCmpnt />
		</>
	);
};

export default Complaints;