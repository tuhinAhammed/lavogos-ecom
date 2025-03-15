import { motion } from "framer-motion";
import { ShoppingCart, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { apiUrl } from "../config";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { useGetAllProductsQuery } from "../redux/features/products/productApi";

const AllProduct = () => {
  const { data, isLoading } = useGetAllProductsQuery();
  const products = data?.data;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleAddToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      handleRemoveFromCart(product.id);
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
        }
      );
    } else {
      dispatch(
        addToCart({ ...product, selectedVariant: product?.variants[0] })
      );
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
        }
      );

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

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-16 pb-12">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <span className="text-red-500 line-through text-lg">
                      ৳{product.regular_price}
                    </span>
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
                    <span className="relative font-bold text-sm sm:text-base tracking-wider z-10">
                      BUY NOW
                    </span>
                  </a>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="group relative flex items-center justify-center w-full h-12 sm:h-14 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white rounded-xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    <span className="relative font-bold text-sm sm:text-base tracking-wider z-10">
                      {cart.some((item) => item.id === product.id)
                        ? "REMOVE"
                        : "ADD TO CART"}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
