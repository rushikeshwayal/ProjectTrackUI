// import React from "react";
// import DropDown from "./DropDown";
// import LogOutBtn from "./LogOutBtn";
// import UserPng from '../../assets/User.png'


function NavBar() {
    return (
        <div className="flex flex-wrap h-20 items-center z-20 text-white px-2 sm:px-20 ">
            {/* Logo Section */}
            <div className="mr-auto sm:w-auto w-full text-center text-green-400">
    <a href="/home" className="font-bold text-sm sm:text-lg whitespace-nowrap">
        <img 
            src="\src\assets\Logotype Boutique Fashion Neon - Copy.png" 
            alt="DriveLicence Logo" 
            className="h-8 sm:h-12 w-auto  rounded-md inline"
        />
    </a>
</div>
        

            {/* Navigation Links */}
            <div className="flex justify-around items-center text-center space-x-2 sm:space-x-6 md:space-x-8 text-xs sm:text-sm md:text-base">
                <a
                    href="/"
                    className="hover:bg-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:text-black transition duration-300 ease-in-out"
                >
                    Home
                </a>
                <a
                    href="#about"
                    className="hover:bg-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:text-black transition duration-300 ease-in-out"
                >
                    About-us
                </a>
               
                <a
                    href="#features"
                    className="hover:bg-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:text-black transition duration-300 ease-in-out"
                >
                    Services
                </a>
                <a
                    href="/contact-us"
                    className="hover:bg-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:text-black transition duration-300 ease-in-out"
                >
                    Connect-us
                </a>
                <a
                    href="/login"
                    className="hover:bg-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:text-black transition duration-300 ease-in-out"
                >
                   Login
                </a>
                <a
                    href="/admin/register"
                    className="hover:bg-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:text-black transition duration-300 ease-in-out"
                >
                   Register
                </a>
            </div>
        </div>
    );
}

export default NavBar;

{/* <img src="https://websitedemos.net/plant-shop-04/wp-content/uploads/sites/160/2020/07/grow-plant-store-logo-white.svg" alt="Grow"/> */}