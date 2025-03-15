import React from 'react';
import Container from '../Layout/Container';
import OurProduct from '../Component/OurProduct';
import Featured from '../Component/Featured';
import Delevary from '../Component/Delevary';

const About = () => {
  return (
    <div className='pt-[120px] pb-[120px] bg-gray-50'>
      <Container>
        <div className="text-center mb-[80px]">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Story</h1>
          <p className="text-lg text-gray-600 mx-auto max-w-3xl">
            Discover the passion and vision that drive La Vogos, a brand that celebrates bold style and the art of making a statement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-[60px]">
          {/* Left Section: About Us */}
          <div className="bg-white shadow-lg rounded-lg p-[40px]">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">About Us</h2>
            <p className="text-base text-gray-700 leading-relaxed">
              La Vogos is more than just a clothing brand. It’s a lifestyle, an attitude, and a way to express individuality. 
              Our collection is made with care and attention to detail, using high-quality materials sourced locally in Bangladesh. 
              From streetwear to high fashion, our pieces are designed to make you feel confident and empowered. 
            </p>
          </div>

          {/* Right Section: Our Values */}
          <div className="bg-white shadow-lg rounded-lg p-[40px]">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Values</h2>
            <p className="text-base text-gray-700 leading-relaxed">
              At La Vogos, we believe in quality, sustainability, and making a positive impact. We are committed to creating products that not only look great but also respect the environment. 
              Our designs are timeless, and our production process ensures fair wages and ethical practices.
            </p>
          </div>
        </div>

      </Container>
    </div>
  );
};

export default About;
