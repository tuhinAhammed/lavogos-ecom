import React, { useState, useRef } from "react";
import Container from "../Layout/Container";
import Flex from "../Layout/Flex";

const Sidebar = () => {
    const [activeCategory, setActiveCategory] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const categoryRefs = useRef([]);

    const sidebarList = [
        {
            category: "Woman’s Fashion",
            icon: "👗",
            subcategories: [
                { name: "Dresses", icon: "👗", link: "/womans-fashion" },
                { name: "Tops", icon: "👚", link: "/womans-fashion" },
                { name: "Skirts", icon: "🩳", link: "/womans-fashion" },
                { name: "Shoes", icon: "👠", link: "/womans-fashion" },
            ],
        },
        {
            category: "Men’s Fashion",
            icon: "👔",
            subcategories: [
                { name: "Shirts", icon: "👕", link: "/mens-fashion" },
                { name: "Pants", icon: "👖", link: "/mens-fashion" },
                { name: "Suits", icon: "🤵", link: "/mens-fashion" },
                { name: "Shoes", icon: "👞", link: "/mens-fashion" },
            ],
        },
        {
            category: "Kid's Fashion",
            icon: "👕",
            subcategories: [
                { name: "Clothing", icon: "👗", link: "/kids-fashion" },
                { name: "Shoes", icon: "👟", link: "/kids-fashion" },
                { name: "Accessories", icon: "🎀", link: "/kids-fashion" },
                { name: "Toys", icon: "🧸", link: "/kids-fashion" },
            ],
        },
        // {
        //     category: "Home & Lifestyle",
        //     icon: "🏠",
        //     subcategories: [
        //         { name: "Furniture", icon: "🪑", link: "/home-lifestyle/furniture" },
        //         { name: "Kitchenware", icon: "🍴", link: "/home-lifestyle/kitchenware" },
        //         { name: "Decor", icon: "🖼️", link: "/home-lifestyle/decor" },
        //         { name: "Bedding", icon: "🛏️", link: "/home-lifestyle/bedding" },
        //     ],
        // },
        // {
        //     category: "Sports & Outdoor",
        //     icon: "⚽",
        //     subcategories: [
        //         { name: "Sportswear", icon: "👟", link: "/sports-outdoor/sportswear" },
        //         { name: "Equipment", icon: "🏋️", link: "/sports-outdoor/equipment" },
        //         { name: "Outdoor Gear", icon: "🧗", link: "/sports-outdoor/outdoor-gear" },
        //         { name: "Footwear", icon: "🥾", link: "/sports-outdoor/footwear" },
        //     ],
        // },
    ];

    const openPopup = (index) => {
        setActiveCategory(index);
        setIsPopupOpen(true);

        const categoryElement = categoryRefs.current[index];
        if (categoryElement) {
            const rect = categoryElement.getBoundingClientRect();
            setPopupPosition({
                top: rect.bottom,
                left: rect.right,
            });
        }
    };

    const closePopup = () => {
        setActiveCategory(null);
        setIsPopupOpen(false);
    };

    return (
        <Container>
            <div className="pt-12 px-4  border-r-2 border-gray-200 w-[240px] bg-gray-50">
                <h2 className="text-xl font-bold text-gray-800 mb-6 border border-red-600 text-center bg-green-500">Categories</h2>
                <Flex className="flex-col gap-y-4">
                    {sidebarList.map(({ category, icon }, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between px-4 py-2 rounded-md hover:bg-blue-100 cursor-pointer transition-all duration-300"
                            onClick={() => openPopup(index)}
                            ref={(el) => (categoryRefs.current[index] = el)}
                        >
                            <h3 className="text-[15px] font-medium text-gray-700">{category}</h3>
                            <span className="text-lg text-gray-500">{icon}</span>
                        </div>
                    ))}
                </Flex>
            </div>

            {/* Popup Modal */}
            {isPopupOpen && activeCategory !== null && (
                <div
                    className="absolute bg-white rounded-lg shadow-lg p-4 w-[200px] border border-gray-200 z-50"
                    style={{ top: `${popupPosition.top}px`, left: `${popupPosition.left}px` }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-md font-bold text-gray-800">
                            {sidebarList[activeCategory].category}
                        </h3>
                        <button
                            className="text-gray-500 hover:text-red-500 transition duration-200"
                            onClick={closePopup}
                        >
                            ✖
                        </button>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        {sidebarList[activeCategory].subcategories.map(({ name, icon, link }, subIndex) => (
                            <a
                                key={subIndex}
                                href={link || "#"}
                                className="flex items-center gap-x-3 py-1 hover:text-blue-500 transition-all duration-200 cursor-pointer"
                            >
                                <span className="text-gray-500 text-lg">{icon}</span>
                                <span className="text-[14px] text-gray-600">{name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </Container>
    );
};

export default Sidebar;
