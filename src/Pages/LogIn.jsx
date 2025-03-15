import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import signPic from "../assets/signPic.png";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import toast from "react-hot-toast";

const LogIn = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [login] = useLoginMutation();

	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const { id, value } = e.target;
		setLoginData((prevData) => ({
			...prevData,
			[id]: value,
		}));
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const res = await login(loginData).unwrap();
			dispatch(setUser({ user: res?.user, token: res?.token }));
			toast.success(res?.message);
			navigate("/");
		} catch (error) {
			toast.error("Failed to login!");
		}
	};

	return (
		<div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
			{/* Left Section */}
			<div className=" flex justify-center items-center">
				<img
					src={signPic}
					alt="Shopping Cart with Phone"
					className="max-w-full"
				/>
			</div>

			{/* Right Section */}
			<div className="flex justify-center items-center bg-white p-8">
				<div className="max-w-sm w-full">
					<h1 className="text-2xl font-bold mb-4">Log in to Exclusive</h1>
					<p className="text-gray-600 mb-6">Enter your details below</p>
					<form onSubmit={handleLogin}>
						<div className="mb-4">
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email
							</label>
							<input
								type="text"
								id="email"
								placeholder="Email or Phone"
								value={loginData.email}
								onChange={handleChange}
								autoComplete="email"
								className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<input
								type="password"
								id="password"
								placeholder="Password"
								value={loginData.password}
								onChange={handleChange}
								autoComplete="current-password"
								className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
							/>
						</div>
						<div className="flex items-center justify-between">
							<button
								type="submit"
								className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
							>
								Log In
							</button>
							<a href="#" className="text-red-500 text-sm">
								Forget Password?
							</a>
						</div>
					</form>
					<p className="mt-6 text-center text-sm text-gray-600">
						Already have an account?{" "}
						<a href="/signup" className="text-blue-500 hover:underline">
							Sign Up
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LogIn;
