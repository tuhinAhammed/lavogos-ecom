import MainImage from "../src/assets/ProductImages/1.jpg";
import GalleryImage1 from "../src/assets/ProductImages/2.jpg";
import GalleryImage2 from "../src/assets/ProductImages/3.jpg";

const productData = {
  name: "Product Name",
  img: MainImage,
  gallery: [GalleryImage1, GalleryImage2, MainImage],
  colors: ["blue", "red", "green"],
  reviews: 120,
  price: 150,
  description: "Product description here",
};

export default productData;
