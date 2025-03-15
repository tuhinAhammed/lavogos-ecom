"use client"

import { motion } from "framer-motion"
import { ShoppingCart, X } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { apiUrl } from "../config"
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice"
import { useGetProductsByCategoryQuery } from "../redux/features/products/productApi"

const SubCategory = () => {
  const { category_name } = useParams()
  const { data, isLoading } = useGetProductsByCategoryQuery(category_name ? category_name : "")
  const products = data?.products
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  const handleAddToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      handleRemoveFromCart(product.id)
      toast.error(
        (t) => (
          <div className="flex items-center gap-2">
            <X className="w-5 h-5" />
            <span>Removed "{product.product_name}" from cart</span>
          </div>
        ),
        {
          style: {
            background: "#EF4444",
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#EF4444",
          },
        },
      )
    } else {
      dispatch(addToCart({ ...product, selectedVariant: product?.variants[0] }))
      toast.success(
        (t) => (
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <span>Added "{product.product_name}" to cart</span>
          </div>
        ),
        {
          style: {
            background: "#10B981",
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#10B981",
          },
        },
      )

      window.dataLayer.push({
        event: "add_to_cart",
        ecommerce: {
          currency: "BDT",
          value: product?.offer_price,
          items: [
            {
              item_name: product?.product_name,
              item_id: product?.id,
              price: product?.offer_price,
              quantity: 1,
            },
          ],
        },
      })
    }
  }

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-16 pb-10">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl sm:text-5xl font-bold mb-3 text-gray-800 capitalize">{category_name}</h1>
          <div className="h-1.5 w-32 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-5 text-gray-600 max-w-2xl mx-auto text-lg">
            Explore our collection of premium products in the {category_name} category
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products?.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={`${apiUrl}/${product?.photos[0]?.file_path}/${product?.photos[0]?.file_name}`}
                  alt={product.product_name}
                  className="w-full aspect-[4/5] object-cover"
                />
              {product?.offer_price && (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    className="absolute bottom-1 sm:bottom-2 md:bottom-4 right-1 sm:right-2 md:right-4 bg-white rounded-sm sm:rounded-md md:rounded-lg px-1 sm:px-2 md:px-4 py-0.5 sm:py-1 md:py-1.5 font-medium sm:font-semibold md:font-bold text-xs sm:text-sm md:text-base scale-75 sm:scale-90 md:scale-100 shadow-sm sm:shadow-md md:shadow-lg"
  >
    {Math.round(
      ((product.regular_price - product.offer_price) /
        product.regular_price) *
        100
    )}
    % OFF
  </motion.div>
)}
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ৳{product.offer_price ?? product.regular_price}
                  </span>
                  {product.offer_price && (
                    <span className="text-red-500 line-through text-lg">৳{product.regular_price}</span>
                  )}
                </div>

                <h3 className="text-xs md:text-xl font-medium text-gray-800 mb-4 line-clamp-2">
                  {product.product_name}
                </h3>

                <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 w-full max-w-lg mx-auto px-4 sm:px-0">
                  <a
                    href={`/product/${product.id}`}
                    className="group relative flex items-center justify-center w-full h-12 sm:h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    <span className="relative font-bold text-sm sm:text-base tracking-wider z-10">BUY NOW</span>
                  </a>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="group relative flex items-center justify-center w-full h-12 sm:h-14 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white rounded-xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    <span className="relative font-bold text-sm sm:text-base tracking-wider z-10">
                      {cart.some((item) => item.id === product.id) ? "REMOVE" : "ADD TO CART"}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {products?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md p-8 text-center mx-auto max-w-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 mx-auto text-gray-400 mb-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">No Products Found</h2>
            <p className="text-gray-600 mb-8">We couldn't find any products in the "{category_name}" category.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium text-sm w-full sm:w-auto"
                >
                  Return Home
                </motion.button>
              </a>
              <a href="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm w-full sm:w-auto"
                >
                  Browse All Products
                </motion.button>
              </a>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-5 mt-16"
        >
          <a href="/" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ x: -3 }}
              whileTap={{ x: 0 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path
                  fillRule="evenodd"
                  d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Home
            </motion.button>
          </a>
          <a href="/products" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ x: 3 }}
              whileTap={{ x: 0 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              View All Products
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          </a>
        </motion.div>

        {/* Scroll to Top Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 h-12 w-12 flex justify-center items-center bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 z-50"
          whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          whileTap={{ y: 0 }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <path
              fillRule="evenodd"
              d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
              clipRule="evenodd"
            />
          </motion.svg>
        </motion.button>
      </div>
    </div>
  )
}

export default SubCategory

