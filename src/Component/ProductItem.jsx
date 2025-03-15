import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../config";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { useGetAllProductsQuery } from "../redux/features/products/productApi";

const ProductItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useGetAllProductsQuery();
  const products = data?.data;
  const displayedProducts = products?.slice(0, 8);
  const cart = useSelector((state) => state.cart);

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

  const handleImageClick = (product) => {
    navigate("/", { state: { product } });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -5,
      transition: { duration: 0.3 },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="bg-gray-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {displayedProducts?.map((product, index) => (
          <motion.div
            key={product?.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            custom={index}
            className="bg-white rounded-xl overflow-hidden shadow-lg"
          >
            <div className="relative">
              <Link to={`/product/${product.id}`}>
                <motion.div
                  variants={imageVariants}
                  className="overflow-hidden"
                >
                  <motion.img
                    src={`${apiUrl}/${product?.photos[0]?.file_path}/${product?.photos[0]?.file_name}`}
                    alt={product?.product_name}
                    className="w-full aspect-[4/5] object-cover"
                    onClick={() => handleImageClick(product)}
                  />
                </motion.div>
              </Link>
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

            <div className="p-4 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2"
              >
                <span className="text-xl sm:text-2xl font-bold text-gray-900">
                  ৳{product?.offer_price ?? product?.regular_price}
                </span>
                {product?.offer_price && (
                  <span className="text-red-500 line-through text-base sm:text-lg">
                    ৳{product?.regular_price}
                  </span>
                )}
              </motion.div>

              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xs md:text-lg font-medium text-gray-800 line-clamp-2"
              >
                {product?.product_name}
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-3"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                >
                  <Link
                    to={`/product/${product?.id}`}
                    className="flex h-11 sm:h-12 items-center justify-center px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
                  >
                    BUY NOW
                  </Link>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAddToCart(product)}
                  className="w-full h-11 sm:h-12 flex items-center justify-center px-4 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
                >
                  {cart.some((item) => item.id === product.id)
                    ? "REMOVE"
                    : "ADD TO CART"}
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center mt-12 sm:mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/products">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span className="text-base sm:text-lg font-semibold">
              See All Products
            </span>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ProductItem;
