import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Container from "../Layout/Container";
import { motion } from "framer-motion";
import { usePlaceOrderMutation } from "../redux/features/orders/OrderApi";
import { useGetProductInfoQuery } from "../redux/features/products/productApi";
import { ShoppingBag, Truck, CreditCard } from "lucide-react";

function BillingDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const product_id = searchParams.get("product_id");
  const { data: productData, isLoading: isProductInfoLoading } = useGetProductInfoQuery(product_id ? product_id : "", {
    skip: !product_id,
  });
  const { singleProduct, cart, cartTotal } = useCart();
  const products = singleProduct ? [singleProduct] : cart;

  const [formData, setFormData] = useState({
    recipient_name: "",
    recipient_address: "",
    recipient_email: "user@email.com",
    recipient_phone: "",
    city: "",
    delivery_option: "",
    shipping_cost: 0,
    coupon_code: "",
    subtotal: 0,
    vat: 0,
    total: 0,
    products: [],
  });

  const calculateOrderTotals = (products, deliveryOption) => {
    const subtotal = products.reduce((acc, product) => {
      const price = Number(product.offer_price || product.regular_price);
      return acc + (price * product.quantity);
    }, 0);

    const shippingCost = deliveryOption === "insideDhaka" ? 80 : 
                        deliveryOption === "outsideDhaka" ? 130 : 0;

    const vatRate = 0;
    const vat = subtotal * vatRate;

    const total = subtotal + shippingCost + vat;

    return {
      subtotal,
      shipping_cost: shippingCost,
      vat,
      total
    };
  };

  const [errors, setErrors] = useState({});
  const [placeOrder, { isLoading }] = usePlaceOrderMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [name]: value,
      };

      if (name === 'delivery_option') {
        const totals = calculateOrderTotals(updatedFormData.products, value);
        return {
          ...updatedFormData,
          ...totals
        };
      }

      return updatedFormData;
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateBangladeshiPhone = (phone) => {
    const phoneRegex = /^(\+880|0)(1[3-9]\d{8})$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const errorMessages = {};
    if (!formData.recipient_name) errorMessages.recipient_name = "Name is required.";
    if (!formData.recipient_address) errorMessages.recipient_address = "Address is required.";
    if (!formData.city) errorMessages.city = "City is required.";
    if (!formData.recipient_phone) errorMessages.recipient_phone = "Phone number is required.";
    else if (!validateBangladeshiPhone(formData.recipient_phone))
      errorMessages.recipient_phone = "Please enter a valid Bangladeshi phone number (11 digits)";
    if (!formData.delivery_option) errorMessages.delivery_option = "Delivery option is required.";

    setErrors(errorMessages);
    return Object.keys(errorMessages).length === 0;
  };

  const generateInvoiceNumber = () => {
    const prefix = "INV";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    return `${prefix}-${timestamp}-${random}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const invoiceNumber = generateInvoiceNumber();
    
    const finalTotals = calculateOrderTotals(formData.products, formData.delivery_option);

    const orderData = {
      ...formData,
      ...finalTotals,
      invoice_number: invoiceNumber,
      order_date: new Date().toISOString(),
    };

    try {
      const isPlacedOrder = await placeOrder(orderData).unwrap();
      if (isPlacedOrder?.status === 200) {
        localStorage.setItem('orderData', JSON.stringify(orderData));
        navigate('/invoice');
      } else {
        alert("দুঃখিত! আপনার অর্ডারটি ব্যর্থ হয়েছে। দয়া করে আবার চেষ্টা করুন।");
      }
    } catch (error) {
      alert("An error occurred while placing your order. Please try again.");
    }
  };

  useEffect(() => {
    let updatedProducts = [];

    if (singleProduct) {
      updatedProducts = [{
        product_id: String(singleProduct.id),
        product_name: singleProduct.product_name,
        product_photo: singleProduct?.photos?.length > 0
          ? `https://api.lavogos.com/${singleProduct?.photos[0]?.file_path}/${singleProduct?.photos[0]?.file_name}`
          : "",
        variants: singleProduct.variant,
        quantity: singleProduct.quantity,
        unit_price: Number(singleProduct.offer_price ? singleProduct.offer_price : singleProduct.regular_price),
        offer_price: Number(singleProduct.offer_price || 0),
        regular_price: Number(singleProduct.regular_price || 0)
      }];
    } else if (cart?.length > 0) {
      updatedProducts = cart?.map((item) => ({
        product_id: String(item.id),
        product_name: item?.product_name,
        product_photo: item?.photos?.length > 0
          ? `https://api.lavogos.com/${item?.photos[0]?.file_path}/${item?.photos[0]?.file_name}`
          : "",
        variants: item?.selectedVariant,
        quantity: item?.quantity,
        unit_price: Number(item?.offer_price ? item?.offer_price : item?.regular_price),
        offer_price: Number(item?.offer_price || 0),
        regular_price: Number(item?.regular_price || 0)
      }));
    }

    const initialTotals = calculateOrderTotals(updatedProducts, formData.delivery_option);

    setFormData((prev) => ({
      ...prev,
      products: updatedProducts,
      ...initialTotals
    }));
  }, [cart, singleProduct]);

  if (isProductInfoLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <p className="text-xl text-gray-600 mb-4">No products to show. Please return to the shop.</p>
        <button 
          onClick={() => navigate('/shop')}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Shop now
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gradient-to-br from-gray-50 to-gray-100 py-12 pt-[40px] lg:pt-[150px] pb-[70px] min-h-screen"
    >
      <Container>
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4 flex items-center">
              <ShoppingBag className="w-8 h-8 mr-3 text-indigo-600" />
              Billing Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="recipient_name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name (নাম) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="recipient_name"
                    name="recipient_name"
                    value={formData.recipient_name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.recipient_name ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors`}
                    placeholder="Enter your full name"
                  />
                  {errors.recipient_name && <p className="mt-1 text-sm text-red-500">{errors.recipient_name}</p>}
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="recipient_phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone (মোবাইল নাম্বার) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="recipient_phone"
                    name="recipient_phone"
                    value={formData.recipient_phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.recipient_phone ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors`}
                    placeholder="01XXXXXXXXX"
                  />
                  {errors.recipient_phone && <p className="mt-1 text-sm text-red-500">{errors.recipient_phone}</p>}
                </div>

                {/* Address Field */}
                <div className="md:col-span-2">
                  <label htmlFor="recipient_address" className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address (ঠিকানা) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="recipient_address"
                    name="recipient_address"
                    value={formData.recipient_address}
                    onChange={handleChange}
                    rows="3"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.recipient_address ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors`}
                    placeholder="Enter your complete address"
                  />
                  {errors.recipient_address && <p className="mt-1 text-sm text-red-500">{errors.recipient_address}</p>}
                </div>

                {/* City Field */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    Town / City (শহর) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors`}
                    placeholder="Enter your city"
                  />
                  {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                </div>

                {/* Delivery Options */}
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Select Delivery Option (নির্বাচন করুন)
                    <span className="text-red-500 ml-1">*</span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label
                      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.delivery_option === "insideDhaka"
                          ? "bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500"
                          : "border-gray-300 hover:border-indigo-300"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="delivery_option"
                          value="insideDhaka"
                          checked={formData.delivery_option === "insideDhaka"}
                          onChange={handleChange}
                          className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="ml-3">
                          <span className="block text-sm font-medium">Inside Dhaka</span>
                          <span className="block text-sm text-gray-500">BDT 80</span>
                        </span>
                      </div>
                      <Truck className="w-6 h-6 text-gray-400" />
                    </label>

                    <label
                      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.delivery_option === "outsideDhaka"
                          ? "bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500"
                          : "border-gray-300 hover:border-indigo-300"
                      }`}
                    >
                      <div className="flex items-center">
                      <input
                          type="radio"
                          name="delivery_option"
                          value="outsideDhaka"
                          checked={formData.delivery_option === "outsideDhaka"}
                          onChange={handleChange}
                          className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="ml-3">
                          <span className="block text-sm font-medium">Outside Dhaka</span>
                          <span className="block text-sm text-gray-500">BDT 130</span>
                        </span>
                      </div>
                      <Truck className="w-6 h-6 text-gray-400" />
                    </label>
                  </div>
                  {errors.delivery_option && <p className="mt-1 text-sm text-red-500">{errors.delivery_option}</p>}
                </div>
              </div>

              {/* Order Summary */}
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <CreditCard className="w-6 h-6 mr-2 text-indigo-600" />
                  Order Summary
                </h3>
                <div className="space-y-3">
                  {formData.products.map((product, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-16 h-16 rounded-lg overflow-hidden">
                          <img
                            src={product.product_photo || "/placeholder.svg?height=64&width=64"}
                            alt={product.product_name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <p className="font-medium">{product.product_name}</p>
                          <p className="text-sm text-gray-500">
                            Quantity: {product.quantity} × ৳{product.unit_price}
                          </p>
                          {product.variants && (
                            <p className="text-sm text-gray-500">
                              Variant: {product.variants}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="font-medium">৳{(product.unit_price * product.quantity).toFixed(2)}</p>
                    </div>
                  ))}

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>৳{formData.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>৳{formData.shipping_cost.toFixed(2)}</span>
                    </div>
                    {formData.vat > 0 && (
                      <div className="flex justify-between">
                        <span>VAT</span>
                        <span>৳{formData.vat.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span>৳{formData.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                className="w-full mt-8 px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    Processing Order...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 mr-2" />
                    Place Order (অর্ডার করুন)
                  </div>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </Container>
    </motion.div>
  );
}

export default BillingDetails;