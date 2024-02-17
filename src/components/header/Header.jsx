import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="header bg-gray-800 text-white">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="logo text-xl font-bold">
                    <Link to='/'>Logo</Link>
                </div>
                <div className="nav-links space-x-4">
                    <Link to="/dormdeals" className="text-gray-300 hover:text-white">Deals</Link>
                    <Link to="/rentals" className="text-gray-300 hover:text-white">Rental</Link>
                    <Link to="/services" className="text-gray-300 hover:text-white">Services</Link>
                    <Link to="/user" className="text-gray-300 hover:text-white">User</Link>
                </div>
            </div>
        </div>
    );
}

export default Header;