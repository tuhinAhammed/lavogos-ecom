// import React, { useEffect, useState } from "react";
// import Container from "../Layout/Container";
// import { Link, useLocation } from "react-router-dom";
// import productMenImg1 from '../assets/ProductImages/1.jpg';
// import productMenImg2 from '../assets/ProductImages/2.jpg';
// import productMenImg3 from '../assets/ProductImages/3.jpg';
// import categoryWomenImg from '../assets/Category4.jpg';
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, removeFromCart } from "../features/cart/cartSlice";

// // const categories = ["Kids", "Mens", "Womens", "Clothes", "New Arrival"];
// const products = [
//     { id: 1, name: "AK-900 Wired Keyboard", price: 1160, discount: 35,   reviews: 64, url: productMenImg1 },
//     { id: 2, name: "IPS LCD Gaming Monitor", price: 400, discount: 30,  reviews: 58, url: categoryWomenImg },
//     { id: 3, name: "ASUS FHD Gaming Laptop", price: 700, discount: 0,  reviews: 49, url: categoryWomenImg },
//     { id: 4, name: "CANON EOS DSLR Camera", price: 360, discount: 0,  reviews: 13, url: productMenImg1 },
//     { id: 5, name: "RGB Liquid CPU Cooler", price: 150, discount: 40,  reviews: 9, url: categoryWomenImg },
//     { id: 6, name: "Gaming Chair", price: 250, discount: 15,  reviews: 25, url: productMenImg3 },
// ];

// const BrouserByCetagory = () => {
//     const dispatch = useDispatch();
//     const cart = useSelector((state) => state.cart);
//     const [selectedCategory, setSelectedCategory] = useState("All");
//     const location = useLocation();

//     const handleAddToCart = (product) => {
//         if (cart.some((item) => item.id === product.id)) {
//             handleRemoveFromCart(product.id);
//         } else {
//             dispatch(addToCart(product));
//         }
//     };

//     const handleRemoveFromCart = (id) => {
//         dispatch(removeFromCart(id));
//     };

//     const filteredProducts =
//         selectedCategory === "All"
//             ? products
//             : products.filter((product) => product.category === selectedCategory);

//     useEffect(() => {
//         window.scrollTo({
//             top: 0,
//             behavior: "smooth",
//         });
//     }, [location]);

//     const handleScrollToTop = () => {
//         window.scrollTo({
//             top: 0,
//             behavior: "smooth",
//         });
//     };

//     return (
//         <div className="py-16 relative">
//             <Container>
//                 <h2 className="text-center text-3xl md:text-5xl font-bold mb-10">Explore By Category</h2>

//                 {/* Dropdown */}
//                 {/* <div className="flex justify-center mb-12">
//                     <select
//                         className="bg-red-500 text-white py-2 px-4 rounded focus:outline-none"
//                         onChange={(e) => setSelectedCategory(e.target.value)}
//                     >
//                         <option value="All">Choose By Category</option>
//                         {categories.map((cat, index) => (
//                             <option key={index} value={cat}>
//                                 {cat}
//                             </option>
//                         ))}
//                     </select>
//                 </div> */}

//                 {/* Products */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {filteredProducts.map((product) => (
//                         <div key={product.id} className="border p-4 rounded-lg shadow transition-transform hover:scale-105">
//                             <div className="flex justify-between items-center mb-2">
//                                 <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
//                                     -{product.discount}%
//                                 </span>
//                                 <button className="text-gray-400 hover:text-red-500">
//                                     ♥
//                                 </button>
//                             </div>

//                             {/* Wrap the image inside a Link to the Buy Now page */}
//                             <Link
//                                 to={`/showsProduct`}
//                                 state={{ product: product }}
//                             >
//                                 <img
//                                     src={product.url}
//                                     alt={product.name}
//                                     className="w-full h-64 object-cover rounded-lg"
//                                 />
//                             </Link>

//                             <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
//                             <p className="text-sm text-gray-600 mt-1">
//                                 <span className="text-red-500">${product.price}</span>
//                                 <span className="line-through text-gray-400 ml-2">
//                                     ${product.price + (product.discount / 100) * product.price}
//                                 </span>
//                             </p>
//                             <p className="text-sm text-gray-500 mt-1">Reviews: {product.reviews}</p>
//                             <button
//                                 onClick={() => handleAddToCart(product)}
//                                 className={`py-2 px-4 w-full mt-4 rounded-lg text-sm transition-colors duration-300 ${cart.some((item) => item.id === product.id)
//                                     ? "bg-red-500 hover:bg-red-600 text-white"
//                                     : "bg-black hover:bg-gray-800 text-white"
//                                     }`}
//                             >
//                                 {cart.some((item) => item.id === product.id)
//                                     ? "Remove from Cart"
//                                     : "Add to Cart"}
//                             </button>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Navigation Buttons */}
//                 <div className="flex justify-between mt-12">
//                     <Link
//                         to="/"
//                         className="bg-gray-200 px-4 py-2 rounded shadow hover:bg-gray-300"
//                     >
//                         Back to Home Page
//                     </Link>
//                     <Link
//                         to="/allproduct"
//                         className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
//                     >
//                         View All Products
//                     </Link>
//                 </div>
//             </Container>

//             {/* Scroll to Top Button */}
//             <button
//                 onClick={handleScrollToTop}
//                 className="fixed bottom-6 right-6 h-12 w-12 flex justify-center items-center bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
//             >
//                 ↑
//             </button>
//         </div>
//     );
// };

// export default BrouserByCetagory;
