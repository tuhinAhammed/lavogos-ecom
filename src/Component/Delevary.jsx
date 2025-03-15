import React from "react";
import Container from "../Layout/Container";

const DeliveryProcessBlog = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-[100px]">
      <Container>
        {/* Header Section */}
        <header className="bg-indigo-600 text-white py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Our Delivery Process</h1>
            <p className="mt-2 text-lg">
              Learn about how we ensure your products reach you safely and quickly.
            </p>
          </div>
        </header>

        {/* Blog Content Section */}
        <main className="container mx-auto px-4 py-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Step-by-Step Delivery Process
            </h2>

            <ol className="list-decimal list-inside space-y-6">
              <li>
                <h3 className="text-lg font-medium text-indigo-600">
                  Order Placement
                </h3>
                <p className="text-gray-600">
                  Once you place an order, our system confirms the order and sends you an email or SMS notification with the details.
                </p>
              </li>

              <li>
                <h3 className="text-lg font-medium text-indigo-600">Order Processing</h3>
                <p className="text-gray-600">
                  Our team begins packing your order with care, ensuring all items are accurate and secure.
                </p>
              </li>

              <li>
                <h3 className="text-lg font-medium text-indigo-600">Dispatch</h3>
                <p className="text-gray-600">
                  Your order is handed over to our trusted delivery partners, and you receive tracking information to monitor its journey.
                </p>
              </li>

              <li>
                <h3 className="text-lg font-medium text-indigo-600">Out for Delivery</h3>
                <p className="text-gray-600">
                  The delivery agent will contact you to confirm your availability and ensure a smooth handover.
                </p>
              </li>

              <li>
                <h3 className="text-lg font-medium text-indigo-600">Delivered</h3>
                <p className="text-gray-600">
                  Your order is successfully delivered to your doorstep. Enjoy your purchase!
                </p>
              </li>
            </ol>
          </div>

          {/* Additional Info */}
          <div className="bg-indigo-50 shadow-md rounded-lg p-6 mt-8">
            <h3 className="text-xl font-semibold text-indigo-600">
              Why Choose Us?
            </h3>
            <p className="text-gray-600 mt-2">
              We prioritize customer satisfaction by ensuring timely deliveries, safe packaging, and excellent communication throughout the process.
            </p>
          </div>
        </main>


      </Container>
    </div>
  );
};

export default DeliveryProcessBlog;