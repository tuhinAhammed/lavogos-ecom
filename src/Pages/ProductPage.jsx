import { motion } from "framer-motion";
import { useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { apiUrl } from "../config";
import useViewProductPixels from "../hooks/useViewProductPixels";
import { removeAllFromCart } from "../redux/features/cart/cartSlice";
import { useGetProductInfoQuery } from "../redux/features/products/productApi";

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <motion.div
      className="w-20 h-20 border-4 border-gray-300 rounded-full"
      style={{ borderTopColor: "#3B82F6" }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    />
  </div>
);

const ProductPage = () => {
  const { product_id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);
  const { data: productData, isLoading } = useGetProductInfoQuery(
    product_id || ""
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setSingleProduct, setCart, setCartTotal } = useCart();
  const product = productData?.product;

  const productInfoForPixel = {
    productName: product?.product_name,
    productId: product?.id,
    productPrice: product?.offer_price,
    productBrand: "",
    productCategory: product?.category_id,
  };

  // Use the custom hook with the product data
  useViewProductPixels(productInfoForPixel);

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity(quantity + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSizeSelection = (size) => {
    if (selectedSize === size) {
      setSelectedSize("");
    } else {
      setSelectedSize(size);
    }
  };

  const handleBuyMore = () => {
    if (!selectedSize) {
      setSizeError("Please select a size before proceeding.");
      return;
    }
    setSizeError("");

    setSingleProduct({
      ...product,
      variant: selectedSize,
      quantity,
    });

    setCart([]);
    setCartTotal({
      total: product?.offer_price || product?.regular_price,
      subtotal: product?.offer_price || product?.regular_price,
      shipping: 0,
    });
    dispatch(removeAllFromCart());
    navigate("/billing");
  };

  const handleThumbnailClick = (index) => {
    setMainImage(index);
  };

  if (isLoading) return <LoadingSpinner />;

  const showOfferPrice = () => {
    if (product?.offer_price) {
      return (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl text-gray-900 font-bold mt-4"
        >
          <span>BDT {product?.offer_price}</span>
          <span className="line-through text-sm text-gray-500 text-normal ml-2">
            {product?.regular_price}
          </span>
        </motion.h2>
      );
    } else {
      return (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl text-gray-900 font-bold mt-4"
        >
          BDT {product?.regular_price}
        </motion.p>
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-6 pt-[100px] lg:pt-[150px]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="border rounded-lg overflow-hidden">
            <InnerImageZoom
              src={`${apiUrl}/${product?.photos[mainImage]?.file_path}/${product?.photos[mainImage]?.file_name}`}
              zoomSrc={`${apiUrl}/${product?.photos[mainImage]?.file_path}/${product?.photos[mainImage]?.file_name}`}
              zoomType="hover"
              zoomPreload={true}
              className="w-full object-cover"
            />
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex gap-2 mt-4"
          >
            {product?.photos?.map((photo, index) => (
              <motion.img
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                src={`${apiUrl}/${photo?.file_path}/${photo?.file_name}`}
                alt={photo?.file_name}
                className={`w-20 h-20 object-cover rounded-lg border mt-2 cursor-pointer ${
                  mainImage === index ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold text-gray-800"
          >
            {product?.product_name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mt-2"
          >
            <span className="text-yellow-500 text-lg font-semibold">★★★★★</span>
            <span className="text-gray-600">({product?.reviews} Reviews)</span>
            <span className="text-green-600 text-sm font-semibold">
              In Stock
            </span>
          </motion.div>

          {showOfferPrice()}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 mt-4"
          >
            {product?.description}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <h3 className="font-semibold text-gray-800 text-lg">Size:</h3>
            <div className="flex gap-4 mt-2">
              {product?.variants?.map((size) => (
                <motion.button
                  key={size}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 border rounded-lg text-sm font-semibold ${
                    selectedSize === size
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-800 hover:bg-gray-100"
                  }`}
                  onClick={() => handleSizeSelection(size)}
                >
                  {size}
                </motion.button>
              ))}
            </div>
            {sizeError && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 mt-2"
              >
                {sizeError}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <h3 className="font-semibold text-gray-800 text-lg">Quantity:</h3>
            <div className="flex items-center gap-4 mt-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="px-4 py-2 border rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
                onClick={() => handleQuantityChange("decrement")}
              >
                -
              </motion.button>
              <span className="text-lg font-semibold">{quantity}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="px-4 py-2 border rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
                onClick={() => handleQuantityChange("increment")}
              >
                +
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-red-500 text-white text-lg font-semibold py-3 rounded-lg hover:bg-red-600 transition duration-300"
              onClick={handleBuyMore}
            >
              Buy Now (কিনুন)
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductPage;
