import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { apiUrl } from "../config";
import Container from "../Layout/Container";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { useGetLandingPageProductsQuery } from "../redux/features/products/productApi";

const MonthSellsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { data: landingPageProducts } = useGetLandingPageProductsQuery();
  const products = landingPageProducts?.products?.new;

  const handleAddToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      dispatch(removeFromCart(product.id));
      toast.error("Product removed from cart", {
        duration: 2000,
        position: "top-right",
        style: {
          background: "#F87171",
          color: "#fff",
          padding: "16px",
          borderRadius: "10px",
        },
        icon: "🛒",
      });
    } else {
      dispatch(
        addToCart({ ...product, selectedVariant: product?.variants[0] })
      );
      toast.success("Product added to cart", {
        duration: 2000,
        position: "top-right",
        style: {
          background: "#34D399",
          color: "#fff",
          padding: "16px",
          borderRadius: "10px",
        },
        icon: "✨",
      });

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
      });
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="py-12 bg-gradient-to-b from-gray-50 to-gray-100">
      <Container>
        <div className="mb-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-800 text-center"
          >
            Monthly Best Sellers
          </motion.h2>
        </div>

        <Slider {...settings} className="pb-12">
          {products?.map((product, index) => (
            <div key={product.id} className="px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg group"
              >
                {/* Image Container */}
                <div className="relative h-[400px] overflow-hidden">
                  {product.tag && (
                    <span className="absolute top-4 left-4 z-10 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {product.tag}
                    </span>
                  )}
                  <Link to={`/product/${product.id}`}>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="h-full"
                    >
                      <img
                        src={`${apiUrl}/${product?.photos[0]?.file_path}/${product?.photos[0]?.file_name}`}
                        alt={product.product_name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </Link>
                </div>

                {/* Content Container */}
                <div className="p-6">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-1 hover:text-blue-600 transition-colors">
                      {product.product_name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl font-bold text-blue-600">
                      ৳{product.offer_price ?? product.regular_price}
                    </span>
                    {product?.offer_price && (
                      <span className="text-lg text-red-500 line-through opacity-75">
                        ৳{product.regular_price}
                      </span>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.div className="flex-1" whileTap={{ scale: 0.95 }}>
                      <Link
                        to={`/product/${product.id}`}
                        className="flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                      >
                        <span className="text-base font-semibold">Buy Now</span>
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </motion.div>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(product)}
                      className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl transition-all duration-300 ${
                        cart.some((item) => item.id === product.id)
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white"
                      }`}
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      <span className="text-base font-semibold">
                        {cart.some((item) => item.id === product.id)
                          ? "Remove"
                          : "Add to Cart"}
                      </span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
            >
              <span className="text-lg font-semibold mr-2">
                View All Products
              </span>
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </Link>
        </motion.div>
      </Container>
    </div>
  );
};

export default MonthSellsList;
