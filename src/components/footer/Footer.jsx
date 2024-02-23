import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto py-4 px-6 flex flex-wrap items-center justify-between">
                <div className="flex items-center">
                    <img src="logo.png" alt="Logo" className="w-8 h-8 mr-2" />
                    <span className="font-bold">Logo</span>
                    <span className="mr-4">© <a href="https://wa.me/923424295275" target='_blank'>Muhammad Shehroz Sarmad</a> </span>
                </div>
                <div className="flex flex-wrap items-center">
                    <Link to="#" className="mr-4">About Us</Link>
                    <Link to="#" className="mr-4">Complaints</Link>
                    <Link to="#" className="mr-4">Terms and Conditions</Link>
                </div>
                <div className="flex flex-wrap items-center">
                    <Link to="#" className="mr-4">Help</Link>
                    <Link to="#" className="mr-4">Contact Us</Link>
                    <Link to="#" className="mr-4">Contribute</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;