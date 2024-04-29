import React from "react";
import AdsenseCmpnt from "../components/AdsenseCmpnt";

const Aboutus = () => {
	return (
		// <div className="container mx-auto px-4 py-8 w-[95%] max-w-4xl">
		<>
			<div className=" md:mx-auto text-sm md:text-base px-4 md:px-5 py-8 md:w-[95%] max-w-4xl text-justify bg-[#002233] text-white my-0 md:my-8 md:rounded-xl [&>h2]:text-[#A9C5A0] [&>h1]:text[#0066FF]">
				<h1 className="text-3xl font-bold mb-4">About Us</h1>
				<p className="mb-8">
					Welcome to UET Nest Swap, student-driven online marketplace
					created specifically for residents of University of Engineering
					and Technology, Taxila hostelites. We understand the challenges
					faced by students, especially during the hectic final year, when
					it comes to managing their belongings. UET Nest Swap provides a
					convenient platform for you to seamlessly buy, sell, or rent
					various items, making your transition easier within the UET
					Taxila hostel community.
				</p>

				<h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
				<ul className="list-disc ml-8 mb-8">
					<li>
						Empower students to declutter and save money by reselling
						used items.
					</li>
					<li>
						Offer cost-effective options for new residents by connecting
						them with affordable furniture and supplies.
					</li>
					<li>
						Promote a culture of sustainability and resourcefulness
						within the student body.
					</li>
					<li>Reduce waste by helping unwanted items find new homes.</li>
					<li>
						Provide ease to final year students leaving hostels by
						offering a platform to sell their used items.
					</li>
				</ul>

				<h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
				<p className="mb-8">
					For final year students who are preparing to leave the hostel,
					UET Nest Swap offers a platform to sell their used furniture,
					appliances, and other items to incoming students. This not only
					provides a way to earn some extra cash but also helps new
					students furnish their rooms at a lower cost.
				</p>
				<p className="mb-8">
					Students can also post services they offer, such as tutoring,
					cleaning, or event planning, allowing them to earn money while
					helping out their fellow students.
				</p>
				<p className="mb-8">
					Additionally, students can rent out their vehicles to others,
					providing a convenient transportation option for those in need.
				</p>

				<h2 className="text-2xl font-semibold mb-4">Our Community</h2>
				<p className="mb-8">
					At UET Nest Swap, we strive to create a community-driven
					marketplace that fosters a culture of sharing and sustainability
					among students. Whether you're looking to declutter your space,
					find affordable furniture, or offer your skills and services to
					others, UET Nest Swap is the place to be!
				</p>

				<h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
				<p className="mb-8">
					Joining the UET Nest Swap community is easy. Simply create an
					account, browse listings, and start buying, selling, or trading.
					Our platform is designed to be user-friendly and secure,
					ensuring a positive experience for all users.
				</p>

				<h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
				<p className="mb-8">
					Have questions or feedback? We'd love to hear from you! Contact
					us at{" "}
					<a
						className="text-blue-500"
						target="_blank"
						href="https://wa.me/923424295275"
					>
						Whatsapp
					</a>{" "}
					and let us know how we can improve your experience on UET Nest
					Swap.
				</p>

				<p>Join us today and be a part of the UET Nest Swap community!</p>
			</div>
			<AdsenseCmpnt />
		</>
	);
};

export default Aboutus;
