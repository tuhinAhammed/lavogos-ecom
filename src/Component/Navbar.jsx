import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/logo 02.png";
import { logOut, useCurrentToken } from "../redux/features/auth/authSlice";
import toast from "react-hot-toast";

function Navbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const token = useSelector(useCurrentToken);

	const cartItems = useSelector((state) => state.cart);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isAuthOpen, setIsAuthOpen] = useState(false); // Added this state

	const handleLogout = () => {
		dispatch(logOut());
		toast.success("Logged out successfully!");
		navigate("/login");
	};

	return (
		<nav className="bg-black text-white shadow-md fixed top-0 z-50 w-full">
			<div className="container mx-auto px-4 py-2 flex justify-between items-center">
				{/* Logo */}
				<div className="text-white font-bold text-2xl">
					<Link to="/">
						<img src={logo} width="110px" alt="Logo" />
					</Link>
				</div>

				{/* Menu */}
				<ul
					className={`lg:flex flex-col lg:flex-row lg:space-x-8 space-y-4 lg:space-y-0 items-center absolute lg:static bg-black w-full lg:w-auto transition-all duration-300 ${
						isMenuOpen ? "top-[46px] left-0" : "-top-96"
					} menu`}
				>
					<li className="px-4 py-2 text-center">
						<Link
							to="/"
							className="hover:text-gray-300"
							onClick={() => setIsMenuOpen(false)}
						>
							HOME
						</Link>
					</li>

					<li className="mt-2 px-4 py-2 text-center">
						<Link
							to="/products"
							className="hover:text-gray-300"
							onClick={() => setIsMenuOpen(false)}
						>
							PRODUCTS
						</Link>
					</li>
					{/* 
          <li className="mt-2 px-4 py-2 text-center">
            <Link to="/womans-fashion" className="hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
              WOMEN
            </Link>
          </li> */}

					{/* <li className="mt-2 px-4 py-2 text-center">
            <Link to="/kids-fashion" className="hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
              KIDS
            </Link>
          </li> */}

					<li className="mt-2 px-4 py-2 text-center">
						<Link
							to="/about"
							className="hover:text-gray-300"
							onClick={() => setIsMenuOpen(false)}
						>
							ABOUT US
						</Link>
					</li>

					<li className="mt-2 px-4 py-2 text-center">
						<Link
							to="/contact"
							className="hover:text-gray-300"
							onClick={() => setIsMenuOpen(false)}
						>
							CONTACT
						</Link>
					</li>
				</ul>

				<div className="flex gap-x-4">
					{/* Icons */}
					<div className="flex items-center space-x-4">
						{/* Cart */}
						<div className="relative">
							<Link to="/cart">
								<FiShoppingCart className="text-xl hover:text-blue-500 cursor-pointer" />
								{cartItems.length > 0 && (
									<span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2">
										{cartItems.length}
									</span>
								)}
							</Link>
						</div>
						{token ? (
							<button
								onClick={handleLogout}
								className="bg-white px-5 py-2 rounded-md text-gray-900 font-semibold"
							>
								Logout
							</button>
						) : (
							<button
								onClick={() => navigate("/login")}
								className="bg-white px-5 py-2 rounded-md text-gray-900 font-semibold"
							>
								Login
							</button>
						)}
					</div>

					{/* Hamburger Icon for Mobile */}
					<button
						className="text-white lg:hidden text-2xl focus:outline-none"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						☰
					</button>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
