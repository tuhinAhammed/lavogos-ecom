import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { apiUrl } from "../config";
import Container from "../Layout/Container";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { useGetAllFlashSalesQuery } from "../redux/features/products/productApi";
import FlashSales from "./SalesCounDown";

const CartDiscountProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { data: flashSales } = useGetAllFlashSalesQuery();

  const activeFlashSales = flashSales?.data?.filter(
    (sale) => sale.status === "active"
  );

  const handleAddToCart = (product) => {
    cart.some((item) => item.id === product.id)
      ? dispatch(removeFromCart(product.id))
      : dispatch(
          addToCart({ ...product, selectedVariant: product?.variants[0] })
        );
  };

  const handleImageClick = (product) => {
    navigate("/product/1", { state: { product } });
  };

  const handleEyeClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const settings = {
    dots: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: "CartDiscountProduct",
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  if (activeFlashSales?.length === 0) {
    return null;
  }

  return (
    <Container>
      {activeFlashSales?.map((flash_sale) => {
        const products = flash_sale?.products || [];

        return (
          <div key={flash_sale.id}>
            <div className="flex justify-between">
              <FlashSales expTime={flash_sale?.end_date} />
            </div>
            <div className="pt-2 pb-6">
              {products.length === 1 ? (
                // ✅ Render without Slider if only ONE product
                <div className="bg-white shadow-lg rounded-lg p-4 max-w-sm">
                  {renderProductCard(products[0])}
                </div>
              ) : (
                // ✅ Render Slider if MORE than one product
                <Slider {...settings}>
                  {products.map((product) => (
                    <div key={product.id} className="p-2">
                      {renderProductCard(product)}
                    </div>
                  ))}
                </Slider>
              )}
            </div>

            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="relative bg-white rounded-lg p-4 shadow-lg">
                  <img
                    src={selectedImage}
                    alt="Selected Product"
                    className="w-96 h-96 object-cover rounded-md"
                  />
                  <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 bg-red-500 p-2 rounded-full hover:bg-red-600 text-white"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            <Link to="/products">
              <button className="px-12 py-4 bg-red-600 text-white block mx-auto mt-6 rounded hover:bg-red-700">
                View All Products
              </button>
            </Link>
          </div>
        );
      })}
    </Container>
  );

  // ✅ Reusable Product Card Component
  function renderProductCard(product) {
    return (
      <div className="relative">
        <div className="relative overflow-hidden cursor-pointer">
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <FaHeart className="text-red-500 cursor-pointer" size={20} />
          </div>
          <Link to={`/product/${product.id}`}>
            <img
              src={
                product?.photos?.[0]
                  ? `${apiUrl}/${product.photos[0].file_path}/${product.photos[0].file_name}`
                  : "https://via.placeholder.com/300"
              }
              alt={product.product_name}
              className="w-full h-72 md:h-96 object-cover rounded-md transform transition duration-300 hover:scale-110"
            />
          </Link>
        </div>
        <h3 className="text-sm sm:text-lg font-semibold mt-4">
          {product.product_name}
        </h3>
        <div className="mt-2 flex justify-between items-center">
          <span className="font-bold text-lg">
            BDT {product.offer_price ?? product.regular_price}
          </span>
          {product.offer_price && (
            <span className="text-red-500 line-through text-sm">
              BDT {product.regular_price}
            </span>
          )}
        </div>
        <div className="flex gap-4 mt-4">
          <Link to={`/product/${product.id}`}>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
              Buy Now
            </button>
          </Link>
          <button
            onClick={() => handleAddToCart(product)}
            className={`py-2 px-4 rounded transition ${
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
    );
  }
};

export default CartDiscountProduct;
