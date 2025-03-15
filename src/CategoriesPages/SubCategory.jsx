// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import productMenImg1 from "../assets/ProductImages/1.jpg";
// import productMenImg2 from "../assets/ProductImages/2.jpg";
// import productMenImg3 from "../assets/ProductImages/3.jpg";
// import { addToCart, removeFromCart } from "../features/cart/cartSlice";

// const products = [
//   {
//     id: 1,
//     name: "Leather Jacket",
//     price: 2000,
//     discount: 20,
//     reviews: 45,
//     category: "jacket",
//     url: productMenImg1,
//   },
//   {
//     id: 2,
//     name: "Denim Shirt",
//     price: 1500,
//     discount: 10,
//     reviews: 30,
//     category: "shirt",
//     url: productMenImg2,
//   },
//   {
//     id: 3,
//     name: "Baseball Cap",
//     price: 500,
//     discount: 5,
//     reviews: 20,
//     category: "cap",
//     url: productMenImg3,
//   },
//   {
//     id: 4,
//     name: "Rain Drop",
//     price: 2500,
//     discount: 25,
//     reviews: 10,
//     category: "drop",
//     url: productMenImg1,
//   },
//   {
//     id: 5,
//     name: "Cotton Hoodie",
//     price: 1800,
//     discount: 15,
//     reviews: 40,
//     category: "hoodie",
//     url: productMenImg2,
//   },
//   {
//     id: 6,
//     name: "Silk Panjabi",
//     price: 3000,
//     discount: 5,
//     reviews: 50,
//     category: "panjabi",
//     url: productMenImg3,
//   },
//   {
//     id: 7,
//     name: "Jeans Pant",
//     price: 2200,
//     discount: 20,
//     reviews: 35,
//     category: "pant",
//     url: productMenImg1,
//   },
//   {
//     id: 8,
//     name: "Graphic T-shirt",
//     price: 1200,
//     discount: 10,
//     reviews: 25,
//     category: "t-shirt",
//     url: productMenImg2,
//   },
// ];

// const SubCategory = () => {
//   const { categoryName } = useParams();
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);

//   const handleAddToCart = (product) => {
//     if (cart.some((item) => item.id === product.id)) {
//       handleRemoveFromCart(product.id);
//     } else {
//       dispatch(addToCart(product));
//     }
//   };

//   const handleRemoveFromCart = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   const filteredProducts = products.filter(
//     (product) => product.category.toLowerCase() === categoryName.toLowerCase()
//   );

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [categoryName]);

//   return (
//     <div className="py-16 relative">
//       <div className="container mx-auto px-6">
//         <h1 className="text-3xl font-bold text-center mb-6">
//           Category: {categoryName}
//         </h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredProducts.map((product) => (
//             <div
//               key={product.id}
//               className="border p-4 rounded-lg shadow transition-transform hover:scale-105"
//             >
//               <div className="flex justify-between items-center mb-2">
//                 {product.discount > 0 && (
//                   <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
//                     -{product.discount}%
//                   </span>
//                 )}
//                 <button className="text-gray-400 hover:text-red-500">♥</button>
//               </div>

//               <img
//                 src={product.url}
//                 alt={product.name}
//                 className="w-full h-64 object-cover rounded-lg"
//               />

//               <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 <span className="text-red-500">
//                   BDT{" "}
//                   {(
//                     product.price -
//                     (product.discount / 100) * product.price
//                   ).toFixed(2)}
//                 </span>
//                 {product.discount > 0 && (
//                   <span className="line-through text-gray-400 ml-2">
//                     BDT {product.price}
//                   </span>
//                 )}
//               </p>
//               <p className="text-sm text-gray-500 mt-1">
//                 Reviews: {product.reviews}
//               </p>
//               <button
//                 onClick={() => handleAddToCart(product)}
//                 className={`py-2 px-4 w-full mt-4 rounded-lg text-sm transition-colors duration-300 ${
//                   cart.some((item) => item.id === product.id)
//                     ? "bg-red-500 hover:bg-red-600 text-white"
//                     : "bg-black hover:bg-gray-800 text-white"
//                 }`}
//               >
//                 {cart.some((item) => item.id === product.id)
//                   ? "Remove from Cart"
//                   : "Add to Cart"}
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Navigation Buttons */}
//         <div className="flex justify-between mt-12">
//           <Link
//             to="/"
//             className="bg-gray-200 px-4 py-2 rounded shadow hover:bg-gray-300"
//           >
//             Back to Home Page
//           </Link>
//           <Link
//             to="/products"
//             className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
//           >
//             View All Products
//           </Link>
//         </div>

//         {/* Scroll to Top Button */}
//         <button
//           onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//           className="fixed bottom-6 right-6 h-12 w-12 flex justify-center items-center bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
//         >
//           ↑
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SubCategory;
