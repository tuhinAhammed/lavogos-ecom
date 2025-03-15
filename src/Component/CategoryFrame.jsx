import { Link } from "react-router";
import Container from "../Layout/Container";
import CategoryBannerPic from "../assets/catagoryFrame.png";
// import hero1 from "../assets/hero1.jpg";

const CategoryFrame = () => {
	return (
		<div className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 relative px-4" style={{ backgroundImage: `url(${CategoryBannerPic})`,backgroundSize:'cover',backgroundRepeat:'no-repeat', backgroundPosition:'right center' }}>
			<Container>
				<div className="flex flex-col items-start text-left justify-center h-full">
					<p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl">
						Categories
					</p>
					<h1 className="mt-2 text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold">
						Enhance Your <span className="block">Music Experience</span>
					</h1>

					{/* Countdown Circles */}
					<div className="flex gap-4 mt-6 flex-wrap">
						{["Hours", "Minutes", "Seconds"].map((label, index) => (
							<div
								key={index}
								className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-white text-center"
							>
								<h4 className="text-lg font-semibold">23</h4>
								<p className="text-xs sm:text-sm">{label}</p>
							</div>
						))}
					</div>

					{/* Buy Now Button */}
					<Link to={'/category/jacket'}>
						<button
							className="mt-8 px-6 py-2 sm:px-8 sm:py-3 bg-white text-black text-sm sm:text-lg rounded-lg hover:bg-pink-600 transition"
						>
							Buy now
						</button>
					</Link>
				</div>
			</Container>
		</div>
	);
};

export default CategoryFrame;
