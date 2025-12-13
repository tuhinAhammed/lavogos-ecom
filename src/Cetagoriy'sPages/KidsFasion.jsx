// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, removeFromCart } from "../features/cart/cartSlice";
// import { Link } from "react-router";
// import KidsCategoryPic from '../assets/category5.jpg'; // Update with the kids' category image

// const KidsFasion = () => {
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart); // Get cart items from Redux

//   const handleAddToCart = (product) => {
//     if (cart.some((item) => item.id === product.id)) {
//       handleRemoveFromCart(product.id); // If it's in the cart, remove it
//     } else {
//       dispatch(addToCart(product)); // Otherwise, add it to the cart
//     }
//   };

//   const handleRemoveFromCart = (id) => {
//     dispatch(removeFromCart(id)); // Dispatch the action to remove product from cart
//   };

//   const kidsProducts = [
//     { id: 10, title: "Cute T-Shirt", price: 800, tag: "NEW", url: KidsCategoryPic },
//     { id: 11, title: "Kids Jeans", price: 1200, tag: null, url: KidsCategoryPic },
//     { id: 12, title: "Sweater", price: 1500, tag: "TREND", url: KidsCategoryPic },
//   ];

//   return (
//     <div className="bg-gray-100 min-h-screen p-6 pt-[40px] lg:pt-[150px] pb-[70px]">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold">Kids' Collection</h1>
//         <p className="text-gray-600 mt-1">
//           Adorable styles for the little ones.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//         {kidsProducts.map((product) => (
//           <div key={product.id} className="bg-white shadow-lg rounded-lg p-4 relative">
//             {product.tag && (
//               <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold py-1 px-3 rounded">
//                 {product.tag}
//               </span>
//             )}
//             <div className="relative overflow-hidden">
//               <img
//                 src={product.url}
//                 alt={product.title}
//                 className="w-full h-[540px] object-cover rounded-md transform transition-all duration-300 ease-in-out hover:scale-110 cursor-pointer"
//               />
//             </div>
//             <h3 className="text-lg font-bold mt-4">{product.title}</h3>
//             <div className="mt-2">
//               <span className="text-red-500 font-bold text-lg">BDT {product.price}</span>
//             </div>
//             <div className="flex items-center gap-x-4 mt-4">
//               <Link to="/billingDetails" className="w-full inline-block">
//                 <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300 w-full">
//                   Buy Now
//                 </button>
//               </Link>
//               <button
//                 onClick={() => handleAddToCart(product)}
//                 className={`py-2 px-6 w-full rounded-lg transition-colors duration-300 text-[14px] ${cart.some((item) => item.id === product.id)
//                   ? "bg-red-500 hover:bg-red-600 text-white"
//                   : "bg-black hover:bg-gray-800 text-white"
//                   }`}
//               >
//                 {cart.some((item) => item.id === product.id)
//                   ? "Remove from Cart"
//                   : "Add to Cart"}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-center mt-8">
//         <Link to={'/allproduct'}>
//           <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300">
//             See More
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default KidsFasion;
