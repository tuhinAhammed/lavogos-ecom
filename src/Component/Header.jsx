import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router";
import Container from "../Layout/Container";
import Flex from "../Layout/Flex";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <header className="py-[12px] bg-black text-center w-full fixed top-0 z-50">
      <Container>
        <Flex className="justify-center items-center relative">
          {/* Summer Sale Text */}
          <div className="w-full">
            <h4 className="text-white">
              Summer Sale For All Swim Suits And Free Express Delivery - OFF
              50%!{" "}
              <span className="underline cursor-pointer ml-3">
                <Link to={"/products"}>ShopNow</Link>
              </span>
            </h4>
          </div>

          {/* Language Dropdown */}
          <div className="flex justify-center items-center absolute top-0 right-0">
            <div
              className="relative cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <h4 className="text-white flex items-center">
                {selectedLanguage}
                <MdKeyboardArrowDown className="text-white ml-2" />
              </h4>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute bg-white text-black right-0 mt-2 py-2 rounded shadow-lg">
                  <div
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleLanguageChange("English")}
                  >
                    English
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleLanguageChange("Bangla")}
                  >
                    Bangla
                  </div>
                </div>
              )}
            </div>
          </div>
        </Flex>
      </Container>
    </header>
  );
};

export default Header;
