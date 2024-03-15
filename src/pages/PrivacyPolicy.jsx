import React from "react";

const PrivacyPolicy = () => {
	return (
		<div className="container mx-auto px-4 py-8 w-[95%] max-w-5xl">
			<h1 className="text-3xl font-bold mb-4 text-purple-500">
				UET Nest Swap Privacy Policy
			</h1>
			<p className="mb-4">
				This Privacy Policy describes how UET Nest Swap ("we", "us", or
				"our") collects, uses, and discloses your personal information
				when you use our platform (the "Platform").
			</p>
			<h2 className="text-2xl font-bold">Information We Collect</h2>
			<ul className="list-disc ml-8 mb-4">
				<li>Information you provide directly:</li>
				<ul className="list-disc ml-8">
					<li>Name</li>
					<li>Email address</li>
					<li>Profile picture (optional)</li>
					<li>Listing details (descriptions, images)</li>
					<li>IP addresses, location data, and cookies</li>
				</ul>
				<li>Information collected automatically:</li>
				<ul className="ml-8">
					<li>
						<s className=" text-red-500">
							<span className=" text-black ">
								Device information (type, operating system)
							</span>
						</s>
					</li>
					<li className="">
						<s className=" text-red-500">
							<span className=" text-black ">
								Usage data (browsing activity, search history)
							</span>
						</s>
					</li>
				</ul>
			</ul>
			<h2 className="text-2xl font-bold">How We Use Your Information</h2>
			<ul className="list-disc ml-8 mb-4">
				<li>Provide and improve the Platform</li>
				<li>Facilitate communication between users</li>
				<li>Personalize your experience</li>
				<li>
					Send marketing and promotional communications (with your
					consent)
				</li>
				<li>Comply with legal obligations</li>
			</ul>
			<h2 className="text-2xl font-bold">
				Disclosure of Your Information
			</h2>
			<p className="mb-4">
				We may disclose your information to third-party service
				providers who help us operate the Platform, such as for
				processing payments or providing customer support. We will not
				sell or share your personal information with third parties for
				marketing purposes without your consent.
			</p>
			<h2 className="text-2xl font-bold">Your Rights</h2>
			<ul className="list-disc ml-8 mb-4">
				<li>Access and update your personal information</li>
				<li>Request deletion of your personal information</li>
				<li>Object to the processing of your personal information</li>
			</ul>
			<h2 className="text-2xl font-bold">
				Changes to This Privacy Policy
			</h2>
			<p className="mb-4">
				We may update this Privacy Policy from time to time. We will
				notify you of any changes by posting the new Privacy Policy on
				the Platform or by other means.
			</p>
			<h2 className="text-2xl font-bold">Contact Us</h2>
			<p>
				If you have any questions about this Privacy Policy, please
				contact us at{" "}
				<a
					href="mailto:shehrozm107@gmail.com"
					className="text-blue-500"
				>
					shehrozm107@gmail.com
				</a>
				.
			</p>
		</div>
	);
};

export default PrivacyPolicy;
