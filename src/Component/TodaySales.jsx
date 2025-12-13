import Container from "../Layout/Container";
import Flex from "../Layout/Flex";
import commonImg from "../assets/commonImg.png";

const TodaySales = ({ title, className }) => {
  return (
    <div>
      <Container>
        <Flex>
          <div className="flex  sm:flex-row justify-center items-center gap-4 px-4 sm:px-6 lg:px-8">
            <img
              src={commonImg}
              alt="Today Sales"
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain"
            />
            <h4 className={`text-base sm:text-lg lg:text-xl font-semibold ${className}`}>
              {title}
            </h4>
          </div>
        </Flex>
      </Container>
    </div>
  );
};

export default TodaySales;
