import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Container from "../Layout/Container";
import { apiUrl } from "../config";
import {
  removeFromCart,
  updateQuantity,
  updateVariant,
} from "../redux/features/cart/cartSlice";

const SelectedProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const [variantError, setVariantError] = useState(false);
  const { setSingleProduct, setCart, setCartTotal } = useCart();

  // Calculate Subtotal
  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      (item?.offer_price
        ? Number(item?.offer_price)
        : Number(item?.regular_price)) *
        Number(item.quantity),
    0
  );
  const total = subtotal;

  // Remove Product Handler
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  // Update Quantity Handler
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  // Update Variant Handler
  const handleVariantChange = (id, newVariant) => {
    dispatch(updateVariant({ id, variant: newVariant }));
    setVariantError(false);
  };

  // Handle Checkout
  const handleCheckout = () => {
    const allVariantsSelected = cartItems.every((item) => item.selectedVariant);

    if (!allVariantsSelected) {
      setVariantError(true);
      return;
    }

    setCart(cartItems);
    setSingleProduct(null);
    setCartTotal({
      total: subtotal,
      subtotal: subtotal,
      shipping: 0,
    });
    handleBeginCheckoutPixels(cartItems, subtotal);
    navigate("/billing");
  };

  const handleBeginCheckoutPixels = (cartItems, totalValue) => {
    window.dataLayer.push({
      event: "begin_checkout",
      ecommerce: {
        currency: "BDT",
        value: totalValue,
        items: cartItems?.map((item) => ({
          item_name: item?.product_name,
          item_id: item?.id,
          price: item?.offer_price,
          quantity: item?.quantity,
        })),
      },
    });
  };

  return (
    <div className="pt-[150px] pb-[70px] px-4">
      <Container>
        <h1 className="text-2xl font-bold mb-8 text-center md:text-left">
          Selected Products
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="border border-gray-300 w-full p-4 rounded-md mb-4 overflow-x-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center font-semibold text-sm md:text-base">
                <h2>Product</h2>
                <h2>Price</h2>
                <h2>Quantity</h2>
                <h2>Variant</h2>
                <h2>Subtotal</h2>
              </div>
              {cartItems?.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 items-center text-center border-t border-gray-300 py-4 text-sm md:text-base"
                >
                  <div className="flex flex-col md:flex-row gap-x-2 items-center justify-center">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 font-bold ml-2"
                    >
                      ×
                    </button>
                    <img
                      src={`${apiUrl}/${item?.photos[0]?.file_path}/${item?.photos[0]?.file_name}`}
                      alt={item.product_name}
                      className="w-16 h-16 object-cover"
                    />
                  </div>
                  <div>
                    <p>
                      BDT{" "}
                      {item?.offer_price
                        ? item?.offer_price
                        : item.regular_price}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="px-2 py-1 border"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, Number(e.target.value))
                      }
                      className="w-12 text-center border"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="px-2 py-1 border"
                    >
                      +
                    </button>
                  </div>
                  <div className="relative w-full">
                    <select
                      name="variants"
                      value={cartItems[index].variants[item?.variant]}
                      onChange={(e) =>
                        handleVariantChange(item.id, e.target.value)
                      }
                      className="block w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      {item?.variants?.map((variant) => (
                        <option key={variant} value={variant}>
                          {variant}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p>
                    BDT{" "}
                    {(item?.offer_price
                      ? Number(item?.offer_price)
                      : Number(item.regular_price)) * Number(item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
              <Link to={"/"}>
                <button className="text-blue-600 underline">
                  Return To Shop
                </button>
              </Link>
              <Link
                to={"/products"}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Shop more
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              <div className="border border-gray-300 p-4 rounded-md">
                <h3 className="font-bold mb-4 text-center md:text-left">
                  Cart Total
                </h3>
                <div className="flex justify-between mb-2 text-sm md:text-base">
                  <span>Subtotal:</span>
                  <span>BDT {subtotal}</span>
                </div>
                <div className="flex justify-between font-bold mb-4 text-sm md:text-base">
                  <span>Total:</span>
                  <span>BDT {total}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className={`bg-red-500 text-white px-4 py-2 w-full rounded-md ${
                    variantError ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default SelectedProduct;
