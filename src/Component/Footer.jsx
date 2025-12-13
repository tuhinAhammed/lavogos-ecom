import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa"; // Social media icons
import { Link } from "react-router";
import { useSubscriptionMutation } from "../redux/features/auth/authApi";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribing] = useSubscriptionMutation();

  const handleSendSubscription = async () => {
    if (email === "") {
      toast.error("Please enter your email address");
    } else {
      const isSubscribed = await subscribing(email).unwrap();
      if (isSubscribed.status === 200) {
        toast.success(`Thank you for subscribing to our newsletter!`);
      } else {
        toast.error(`Failed to subscribe to our newsletter!`);
      }
    }
  };

  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          {/* Top Categories */}
          <div>
            <h3 className="font-semibold mb-4 text-yellow-500">
              TOP CATEGORIES
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/category/panjabi"
                  className="hover:text-yellow-500 cursor-pointer"
                >
                  Panjabi
                </Link>
              </li>
              <li>
                <Link
                  to="category/jacket"
                  className="hover:text-yellow-500 cursor-pointer"
                >
                  Jacket
                </Link>
              </li>
              <li>
                <Link
                  to="/category/shirt"
                  className="hover:text-yellow-500 cursor-pointer"
                >
                  Shirt
                </Link>
              </li>
            </ul>
          </div>
          {/* Help */}
          <div>
            <h3 className="font-semibold mb-4 text-yellow-500">HELP</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/delivery"
                  className="hover:text-yellow-500 cursor-pointer"
                >
                  Delivery
                </Link>
              </li>
              <li>
                <Link
                  to="/securePayments"
                  className="hover:text-yellow-500 cursor-pointer"
                >
                  Secure Payments
                </Link>
              </li>
              <li>
                <Link
                  to="/trackanorder"
                  className="hover:text-yellow-500 cursor-pointer"
                >
                  Track an order
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-yellow-500 cursor-pointer"
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
          {/* About Us */}
          <div>
            <h3 className="font-semibold mb-4 text-yellow-500">ABOUT US</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="hover:text-yellow-500 cursor-pointer"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/termsConditions"
                  className="hover:text-yellow-500 cursor-pointer"
                >
                  Terms & Conditions of Sales
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-yellow-500 cursor-pointer"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/responsibility"
                  className="hover:text-yellow-500 cursor-pointer"
                >
                  Responsibility
                </Link>
              </li>
            </ul>
          </div>
          {/* Feedback */}
          <div>
            <h3 className="font-semibold mb-4 text-yellow-500">FEEDBACK</h3>
            <ul className="space-y-2">
              <li className="hover:text-yellow-500 cursor-pointer">
                Leave a feedback
              </li>
            </ul>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 space-y-6 md:space-y-0">
          {/* Find a Store */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-2 text-yellow-500">FIND A STORE</h4>
            <p>Find Timberland® Products Near You</p>
            <Link to={"/contact"}>
              <button className="mt-4 bg-yellow-500 text-black px-4 py-2 font-semibold rounded-md hover:bg-yellow-600">
                STORE LOCATOR
              </button>
            </Link>
          </div>
          {/* Follow Us */}
          <div className="text-center">
            <h4 className="font-bold text-xl mb-4 text-yellow-500">
              FOLLOW US
            </h4>
            <div className="flex space-x-6 justify-center">
              <Link
                to="https://www.tiktok.com/@lavogosbangladesh?_t=8sjCZv9TdTU&_r=1"
                className="text-2xl text-gray-400 hover:text-yellow-500 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok />
              </Link>
              <Link
                to="https://www.facebook.com/share/1GM11Egm8j/?mibextid=wwXIfr"
                className="text-2xl text-gray-400 hover:text-yellow-500 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </Link>
              <Link
                to="https://www.instagram.com/lavogos?igsh=MXZpbGxjaW84cWNyeA%3D%3D&utm_source=qr"
                className="text-2xl text-gray-400 hover:text-yellow-500 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </Link>
              <Link
                to="https://youtube.com/@lavogos?si=mffgTiE-yqS_fu2R"
                className="text-2xl text-gray-400 hover:text-yellow-500 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </Link>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold mb-2 text-yellow-500">
              NEWSLETTER SUBSCRIPTION
            </h4>
            <p>Receive product news and updates in your inbox.</p>
            <div className="flex mt-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full px-4 py-2 rounded-l-md focus:outline-none text-black"
              />
              <button
                className="bg-yellow-500 text-black px-4 py-2 rounded-r-md hover:bg-yellow-600"
                onClick={handleSendSubscription}
              >
                →
              </button>
            </div>
            <div className="mt-2">
              <input type="checkbox" id="privacy" className="mr-2" />
              <label htmlFor="privacy" className="text-xs">
                I've read and accept Timberland's{" "}
                <a href="#" className="text-yellow-500 underline">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        {/* <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                    <div>SECURE ONLINE SHOPPING</div>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <SiVisa className="text-2xl text-gray-400 hover:text-yellow-500" />
                        <SiMastercard className="text-2xl text-gray-400 hover:text-yellow-500" />
                        <SiPaypal className="text-2xl text-gray-400 hover:text-yellow-500" />
                    </div>
                </div> */}
      </div>
    </footer>
  );
};

export default Footer;
