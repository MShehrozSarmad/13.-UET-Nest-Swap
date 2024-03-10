import React from "react";

const Feedback = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Feedback</h1>
            <p className="mb-4">
                We value your feedback as it helps us improve UET Nest Swap. Whether you have a suggestion, found a bug, or just want to share your experience, we'd love to hear from you.
            </p>
            <h2 className="text-2xl font-bold mb-2">How to Provide Feedback</h2>
            <p className="mb-4">
                You can provide feedback by filling out the form below. Please be as detailed as possible so we can better understand your feedback.
            </p>
            <form className="mb-8">
                <label className="block mb-2">Name (optional)</label>
                <input type="text" className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full" placeholder="Enter your name" />
                <label className="block mb-2">Email (optional)</label>
                <input type="email" className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full" placeholder="Enter your email" />
                <label className="block mb-2">Feedback</label>
                <textarea className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full" rows="5" placeholder="Enter your feedback"></textarea>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Submit Feedback</button>
            </form>
            <p>
                Thank you for taking the time to provide your feedback. Your input is valuable to us and will help us continue to improve UET Nest Swap.
            </p>
        </div>
    );
};

export default Feedback;
