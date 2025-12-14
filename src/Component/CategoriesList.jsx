import React from "react";
import { Link } from "react-router-dom";
import cap from "../assets/cap.png";
import drop from "../assets/drop.png";
import hoddie from "../assets/eid collection.png";
import jaket from "../assets/Jaket.png";
import panjabi from "../assets/panjabi.png";
import pant from "../assets/pant.png";
import shirt from "../assets/shirt.png";
import tshirt from "../assets/tshirt.png";
import women from "../assets/women.jpeg";

const CategoriesList = () => {
  const categoriesListItem = [
    { url: hoddie, name: "Eid Collection", link: "/category/eid collection" },
    { url: panjabi, name: "PANJABI", link: "/category/panjabi" },
    { url: jaket, name: "JACKET", link: "/category/jacket" },
    { url: shirt, name: "SHIRT", link: "/category/shirt" },
    { url: pant, name: "PANT", link: "/category/pant" },
    { url: drop, name: "𝐃𝐑𝐎𝐏", link: "/category/drop" },
    { url: tshirt, name: "𝐓-𝐒𝐇𝐈𝐑𝐓", link: "/category/t_shirt" },
    { url: cap, name: "CAP", link: "/category/cap" },
    { url: women, name: "women", link: "/category/women" },
  ];

  return (
    <div className="mt-10">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoriesListItem.map(({ url, name, link }, index) => (
          <Link
            key={index}
            to={link}
            className="relative group w-full h-[300px] sm:h-[350px] md:h-[400px] border border-gray-300 overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            <img
              src={url}
              alt={name}
              loading="lazy" 
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-base sm:text-lg md:text-xl font-medium text-center">
                {name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
