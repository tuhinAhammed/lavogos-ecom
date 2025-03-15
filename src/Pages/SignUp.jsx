import { useState } from "react";
import { useNavigate } from "react-router";
import signPic from "../assets/signPic.png";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import toast from "react-hot-toast";

const SignUp = () => {
	const navigate = useNavigate();
	const [signUpUser] = useRegisterMutation();

	const [signUpData, setSignUpData] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
		confirm_password: "",
	});

	const handleChange = (e) => {
		const { id, value } = e.target;
		setSignUpData((prevData) => ({
			...prevData,
			[id]: value,
		}));
	};

	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			const res = await signUpUser({ ...signUpData, role_id: 2 }).unwrap();

			if (res.errors) {
				toast.error("Failed to create account!");
			}
			toast.success("Account created successfully!");
			navigate("/login");
		} catch (err) {
			toast.error("Something went wrong!");
		}
	};

	return (
		<div className="flex h-screen">
			{/* Left Side - Image Section */}
			<div className="hidden lg:flex items-center justify-center w-1/2 ">
				<div className="relative">
					<img
						src={signPic} // Replace with your image URL
						alt="Phone and Cart"
						className="object-contain w-[805px]"
					/>
				</div>
			</div>

			{/* Right Side - Form Section */}
			<div className="flex items-center justify-center w-full lg:w-1/2 px-6 lg:px-20">
				<div className="w-full max-w-md">
					<h2 className="text-3xl font-bold mb-4">Create an account</h2>
					<p className="text-gray-600 mb-6">Enter your details below</p>

					{/* Form */}
					<form onSubmit={handleSignUp} className="space-y-4">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700"
							>
								Name
							</label>
							<input
								type="text"
								id="name"
								value={signUpData.name}
								onChange={handleChange}
								className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
								placeholder="Your Name"
							/>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								value={signUpData.email}
								onChange={handleChange}
								className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
								placeholder="Your Email or Phone Number"
							/>
						</div>

						<div>
							<label
								htmlFor="phone"
								className="block text-sm font-medium text-gray-700"
							>
								Phone Number
							</label>
							<input
								type="text"
								id="phone"
								value={signUpData.phone}
								onChange={handleChange}
								className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
								placeholder="Your Email or Phone Number"
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Password
							</label>
							<input
								type="password"
								id="password"
								value={signUpData.password}
								onChange={handleChange}
								className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
								placeholder="Your Password"
							/>
						</div>

						<div>
							<label
								htmlFor="confirm_password"
								className="block text-sm font-medium text-gray-700"
							>
								Confirm Password
							</label>
							<input
								type="password"
								id="confirm_password"
								value={signUpData.confirm_password}
								onChange={handleChange}
								className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
								placeholder="Your Password"
							/>
						</div>

						<button
							type="submit"
							className="w-full py-2 px-4 bg-red-500 text-white rounded-md font-medium shadow-sm hover:bg-red-600"
						>
							Create Account
						</button>
					</form>

					{/* Divider */}
					<div className="my-6 flex items-center justify-center">
						<span className="w-full h-px bg-gray-300"></span>
						<span className="px-3 text-sm text-gray-500">or</span>
						<span className="w-full h-px bg-gray-300"></span>
					</div>

					{/* Google Sign-up Button */}
					<button className="w-full py-2 px-4 border border-gray-300 rounded-md font-medium shadow-sm flex items-center justify-center hover:bg-gray-100">
						<img
							src="https://www.google.com/favicon.ico" // Replace with Google logo URL
							alt="Google"
							className="w-5 h-5 mr-2"
						/>
						Sign up with Google
					</button>

					{/* Login Link */}
					<p className="mt-6 text-center text-sm text-gray-600">
						Already have an account?{" "}
						<a href="/login" className="text-blue-500 hover:underline">
							Log in
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
