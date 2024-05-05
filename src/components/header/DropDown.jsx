import React from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ setIsMenuOpen }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleDropdownToggle = () => {
        setIsOpen(!isOpen);
    };

    const dropdownMenu = (
        <ul onClick={() => {
            setIsOpen(false)
            setIsMenuOpen(false);
        }} className=" bg-white mr-5 absolute text-sm text-black " aria-labelledby="dropdownDefaultButton">
            <li>
                <Link to={'/dormform'} className=" hover:text-white transition duration-200 block px-4 py-2 hover:bg-[#0066FF]">Dorm Deal</Link>
            </li>
            <li>
                <Link to={'/rentalform'} className=" hover:text-white transition duration-200 block px-4 py-2 hover:bg-[#0066FF]">Rental</Link>
            </li>
            <li>
                <Link to={'/serviceform'} className=" hover:text-white transition duration-200 block px-4 py-2 hover:bg-[#0066FF]">Service</Link>
            </li>
        </ul>
    );

    return (
        <div>
            <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="inline-block px-6 py-2 duration-200 hover:bg-blue100 hover:text-[#A9C5A0]"
                type="button"
                onClick={handleDropdownToggle}
            >
                Post Ad
            </button>
            {isOpen && dropdownMenu}
        </div>
    );
};

export default Dropdown;