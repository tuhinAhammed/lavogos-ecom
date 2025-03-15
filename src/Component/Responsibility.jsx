import React from 'react';

const Responsibility = () => {
  return (
    <div className="bg-gray-50  px-4 sm:px-6 lg:px-8 py-[100px]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Our Commitment to Responsibility</h2>
        <p className="text-lg text-gray-700 mb-8">
          We believe in offering high-quality products with integrity, ensuring customer satisfaction and trust.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Sustainable Products</h3>
            <p className="text-gray-600">
              Our products are carefully sourced and designed with sustainability in mind to help preserve the planet.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Satisfaction</h3>
            <p className="text-gray-600">
              We prioritize our customers' needs and ensure a seamless shopping experience from start to finish.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Assurance</h3>
            <p className="text-gray-600">
              Each product undergoes rigorous quality checks to ensure it meets the highest standards of performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Responsibility;
