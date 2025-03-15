// Contact.js
import React, { useState } from "react";
import Container from "../Layout/Container"; // Assuming Container is in the same directory

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., send data to server
  };

  return (
    <div className="py-[150px]">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start p-8 bg-gray-100 rounded-lg shadow-md">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Call To Us</h2>
            <p className="text-gray-600 mb-2">
              We are available 24/7, 7 days a week.
            </p>
            <p className="text-gray-700">Phone: +8801711207445</p>
            <hr className="my-4" />
            <h2 className="text-2xl font-semibold mb-4">Write To Us</h2>
            <p className="text-gray-600 mb-2">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p className="text-gray-700">Emails: lavogos@gmail.com</p>
          </div>
          <div className="w-full md:w-1/2 mt-6 md:mt-0">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
