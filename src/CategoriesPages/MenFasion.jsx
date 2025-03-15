import { useState } from "react";
import { FaEye, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiUrl } from "../config";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";
import { useGetAllProductsQuery } from "../redux/features/products/productApi";

const MenFasion = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { data } = useGetAllProductsQuery();
  const products = data?.data;

  const handleAddToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      handleRemoveFromCart(product.id);
    } else {
      dispatch(
        addToCart({ ...product, selectedVariant: product?.variants[0] })
      );
    }
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // const mensProducts = [
  // 	{
  // 		id: 1,
  // 		title: "Formal Shirt",
  // 		price: 2200,
  // 		tag: "NEW",
  // 		url: MenCategoryPic,
  // 	},
  // 	{
  // 		id: 2,
  // 		title: "Casual Trousers",
  // 		price: 1800,
  // 		tag: null,
  // 		url: MenCategoryPic,
  // 	},
  // 	{ id: 3, title: "Jacket", price: 3000, tag: "TREND", url: MenCategoryPic },
  // ];

  return (
    <div className="bg-gray-100 min-h-screen p-6 pt-[40px] lg:pt-[150px] pb-[70px]">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Men&apos;s Collection</h1>
        <p className="text-gray-600 mt-1">
          Explore the latest styles in men&apos;s fashion.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {products?.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-lg p-4 relative"
          >
            {product?.tag && (
              <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold py-1 px-3 rounded">
                {product?.tag}
              </span>
            )}
            <div className="relative overflow-hidden cursor-pointer">
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <FaHeart className="text-red-500 cursor-pointer" size={20} />
                <FaEye
                  className="text-white cursor-pointer"
                  size={20}
                  onClick={() =>
                    handleImageClick(
                      `${apiUrl}/${product?.photo[0]?.file_path}`
                    )
                  }
                />
              </div>
              <img
                src={`${apiUrl}/${product?.photo[0]?.file_path}`}
                alt={product?.product_name}
                className="w-full h-[540px] object-cover rounded-md transform transition-all duration-300 ease-in-out hover:scale-110"
              />
            </div>
            <h3 className="text-lg font-bold mt-4">{product?.product_name}</h3>
            <div className="mt-2">
              <span className="text-red-500 font-bold text-lg">
                BDT {product?.regular_price}
              </span>
            </div>
            <div className="flex items-center gap-x-4 mt-4">
              <Link to="/billingDetails" className="w-full inline-block">
                <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300 w-full">
                  Buy Now
                </button>
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                className={`py-2 px-6 w-full rounded-lg transition-colors duration-300 text-[14px] ${
                  cart.some((item) => item.id === product.id)
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-black hover:bg-gray-800 text-white"
                }`}
              >
                {cart.some((item) => item.id === product.id)
                  ? "Remove from Cart"
                  : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-4 shadow-lg">
            <img
              src={selectedImage}
              alt="Selected Product"
              className="w-[500px] h-[500px] object-cover rounded-md"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded-full hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-8">
        <Link to={"/products"}>
          <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300">
            See More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MenFasion;
