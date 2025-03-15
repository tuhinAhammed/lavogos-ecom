import React from 'react';

const SecurePayments = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 py-[100px]">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-semibold text-gray-800">Secure Payments</h1>
        <p className="text-lg text-gray-600">Your payment information is safe with us</p>
      </header>

      {/* Secure Payment Features Section */}
      <section className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-medium text-gray-800 mb-6">How We Ensure Your Payment Security</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-md">
            <svg
              className="w-16 h-16 text-blue-600 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2v20M4 12l8-8 8 8"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700">Encryption Technology</h3>
            <p className="text-gray-600 text-center mt-2">
              We use advanced encryption to protect your payment information during transactions.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-md">
            <svg
              className="w-16 h-16 text-green-600 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3l-3 3-3-3"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700">Secure Payment Gateways</h3>
            <p className="text-gray-600 text-center mt-2">
              We partner with trusted payment gateways to ensure secure and smooth transactions.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-md">
            <svg
              className="w-16 h-16 text-red-600 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 6l3 12 3-6h12l3-6-3-6H9l-3 6-3 6z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700">Fraud Detection Systems</h3>
            <p className="text-gray-600 text-center mt-2">
              We employ real-time fraud detection systems to prevent unauthorized transactions.
            </p>
          </div>
        </div>
      </section>

      {/* Assurance Section */}
      <section className="text-center mt-12">
        <h2 className="text-2xl font-medium text-gray-800 mb-6">Your Payment Information is Safe</h2>
        <p className="text-lg text-gray-600 mb-4">
          We are committed to ensuring that all your payment details are handled with the highest level of security.
        </p>
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Learn More About Our Security Features
        </button>
      </section>
    </div>
  );
};

export default SecurePayments;
