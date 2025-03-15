import React from 'react';

const OrderTracking = () => {
  const trackingData = [
    { step: 'Order Placed', date: '2025-01-05', status: 'completed' },
    { step: 'Processing', date: '2025-01-06', status: 'completed' },
    { step: 'Shipped', date: '2025-01-07', status: 'current' },
    { step: 'Out for Delivery', date: '', status: 'upcoming' },
    { step: 'Delivered', date: '', status: 'upcoming' },
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'current':
        return 'bg-blue-500 text-white';
      case 'upcoming':
        return 'bg-gray-300 text-gray-600';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 py-[100px]">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Tracking</h2>
        <div className="relative">
          <div className="absolute w-1 bg-gray-300 h-full left-4 top-0"></div>
          {trackingData.map((item, index) => (
            <div key={index} className="flex items-start mb-8">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusStyles(
                  item.status
                )}`}
              >
                {item.status === 'completed' && <span>&#10003;</span>} {/* Checkmark */}
                {item.status === 'current' && <span>&#9679;</span>} {/* Current dot */}
              </div>
              <div className="ml-8">
                <h3 className="text-lg font-semibold text-gray-800">{item.step}</h3>
                {item.date && <p className="text-sm text-gray-500">{item.date}</p>}
              </div>
            </div>
          ))}
        </div>
        <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          View Order Details
        </button>
      </div>
    </div>
  );
};

export default OrderTracking;
