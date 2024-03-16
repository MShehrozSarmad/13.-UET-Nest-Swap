import React from "react";

const Help = () => {
    return (
        <div className=" md:mx-auto text-sm md:text-base px-2 md:px-5 py-8 md:w-[95%] max-w-4xl text-justify bg-[#002233] text-white my-8 md:rounded-xl [&>div>h2]:text-[#A9C5A0] [&>h1]:text-[#0066FF]">
            <h1 className="text-3xl font-bold mb-4">Welcome to UET Nest Swap Help Center</h1>
            <p className="mb-8">Find answers to commonly asked questions and learn how to make the most of your UET Nest Swap experience.</p>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Viewing Listings</h2>
                <p>You can browse through listings of items without signing in or signing up. Simply explore the categories to find what you're looking for.</p>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Posting Items</h2>
                <p>To post items, you need to sign up with your University of Engineering and Technology, Taxila assigned email. Click on the "Post Ad" button and provide the required details.</p>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Making Offers</h2>
                <p>If you're interested in an item, use the "Make an Offer" button to contact the owner via WhatsApp. Discuss and finalize the deal there, as there is no chat option available on the platform.</p>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Payment Methods</h2>
                <p>There are no integrated payment methods on the platform. It's up to you and the other party to decide how to make and fulfill deals.</p>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Categories</h2>
                <p>UET Nest Swap offers three categories: Dorm Deals for buying and selling used items, Rentals for hiring or renting vehicles, and Services for offering any service.</p>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Current Status</h2>
                <p>Each deal has a current status option (available or sold). If your item is sold, edit the deal and change its status to sold. It will then be hidden from public listings but can still be accessed via its URL.</p>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Deleting Items</h2>
                <p>You can delete your posted items if needed. Simply go to your profile and select the item you want to delete.</p>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Additional Details</h2>
                <p>When posting a deal, provide additional details related to the item in the description field for better clarity.</p>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Featured Items</h2>
                <p>Three selected items from each category are featured on the home page under Dorm Deals, Rentals, and Services sections.</p>
            </div>
        </div>
    );
};

export default Help;
