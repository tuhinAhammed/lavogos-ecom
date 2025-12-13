import React from 'react';
import Container from '../Layout/Container';
import Flex from '../Layout/Flex';
import TodaySales from './TodaySales';
import CategoriesList from './CategoriesList';

const Category = () => {
  return (
    <div className="">
      {/* Header Section */}
      <div className="flex justify-center items-center mt-[-50px]">
        <h2 className="mt-5 text-2xl md:text-3xl font-bold text-gray-800 text-center">
          Browse By Category
        </h2>
      </div>

      {/* Categories Section */}
      <Container>
        <div className=" shadow-md rounded-lg p-6  sm:mt-8 lg:mt-[-10px] mt-[-45px]">
          <CategoriesList />
        </div>
      </Container>
    </div>
  );
};

export default Category;
