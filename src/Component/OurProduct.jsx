import Container from "../Layout/Container";
import ProductItem from "./ProductItem";
import TodaySales from "./TodaySales";

const OurProduct = () => {
  return (
    <div className="pb-[20px] sm:pb-[140px]">
      <Container>
        <TodaySales title={"Our Products"} className="py-10" />
      </Container>
      <ProductItem />
    </div> 
  );
};

export default OurProduct;
