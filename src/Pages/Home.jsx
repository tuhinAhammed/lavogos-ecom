import Banner from "../Component/Banner";
import CartDiscountProduct from "../Component/CartDiscountProduct";
import Category from "../Component/Category";
import CategoryFrame from "../Component/CategoryFrame";
import FloatingContact from "../Component/ContactInfo";
import ContactWidget from "../Component/ContactInfo";
import Featured from "../Component/Featured";
import MonthSells from "../Component/MonthSells";
import OurProduct from "../Component/OurProduct";

const Home = () => {
  // useEffect(() => {
  // 	// Scroll to the top when Home is rendered
  // 	window.scrollTo({
  // 		top: 0,
  // 		behavior: "smooth",
  // 	});
  // }, []);

  return (
    <>
      <Banner />
      <Category />
      <CartDiscountProduct />
      <MonthSells />
      <CategoryFrame />
      <OurProduct />
      <Featured />
      <FloatingContact></FloatingContact>
    </>
  );
}; 

export default Home;
