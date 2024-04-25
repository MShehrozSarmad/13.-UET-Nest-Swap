// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useForm } from "react-hook-form";
// import Input from "../components/Input";
// import Button from "../components/Button";

// const Feedback = () => {
// 	const navigate = useNavigate();
// 	const dispatch = useDispatch();
// 	const [error, seterror] = useState("");
// 	const [btnStat, setbtnStat] = useState(false);

// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors }
// 	} = useForm();

// 	const submitfeedback = async (data) => {
// 		console.log('triggered');
// 		// setbtnStat(true);
// 		seterror("");
// 		console.log({data});
// 	};

// 	return (
// 		<div className="container mx-auto px-4 py-8 w-[95%] max-w-4xl [&>h2]:text-[#A9C5A0] text-white [&>h1]:text[#0066FF]">
// 			<h1 className="text-3xl font-bold mb-4">Feedback</h1>
// 			<p className="mb-4">
// 				We value your feedback as it helps us improve UET Nest Swap. Whether you have a suggestion, found a bug, or just want to share your experience, we'd love to hear from you.
// 			</p>
// 			<h2 className="text-2xl font-bold mb-2">How to Provide Feedback</h2>
// 			<p className="mb-4">
// 				You can provide feedback by filling out the form below. Please be as detailed as possible so we can better understand your feedback.
// 			</p>
// 			<form
// 				onSubmit={handleSubmit(submitfeedback)}
// 				className="w-full text-white h-full md:h-auto"
// 			>
// 				<div className="mb-6">
// 					<Input
// 						type="text"
// 						label="Name"
// 						placeholder="Enter your password"
// 						// className="mb-6"
// 						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// 						lblClass="text-sm font-semibold mb-2"
// 						{...register("name")}
// 					/>
// 				</div>

// 				<div className="mb-6">
// 					<Input
// 						type="email"
// 						label="Email"
// 						placeholder="Enter your email"
// 						// className="mb-4"
// 						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// 						lblClass="text-sm font-semibold mb-2"
// 						{...register("email")}
// 					/>
// 					{errors.email && (
// 						<p className="text-red-500 text-xs italic">
// 							{errors.email.message}
// 						</p>
// 					)}
// 				</div>

// 				<div className="mb-6">
// 					<label htmlFor="feedback">Feedback *</label>
// 					<textarea name="feedback" id="feedback" className=" w-full resize-none text-red-500" rows={5} {...register("feedback", { required: true })}>
// 					</textarea>
// 				</div>

// 				{error && (
// 					<p className="text-red-500 text-xs italic mt-4">{error}</p>
// 				)}

// 				<Button
// 					type="submit"
// 					disabled={btnStat}
// 					className={`${btnStat
// 						? "bg-[#788c6e] text-gray-200"
// 						: "bg-blue-500 hover:bg-[#689250] transition duration-300"
// 						} text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
// 				>
// 					Feedback
// 				</Button>
// 			</form>
// 			<p>
// 				Thank you for taking the time to provide your feedback. Your input is valuable to us and will help us continue to improve UET Nest Swap.
// 			</p>
// 		</div>
// 	);
// };

// export default Feedback;

import React from "react";

const Complaints = () => {
	return (
		<div className="w-full h-screen flex flex-col items-center justify-center text-yellow-500 gap-2 text-lg">
			<p className="">
				Oops! we are not currently accepting Feedbacks, you can notify
				us at
			</p>
			<p>
				<a className="" href="mailto:shehrozm107@gmail.com">
					shehrozm107@gmail.com
				</a>
			</p>
		</div>
	);
};

export default Complaints;
