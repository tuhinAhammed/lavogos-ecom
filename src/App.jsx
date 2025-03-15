import { Route, BrowserRouter as Router, Routes } from "react-router";
import { CartProvider } from "../context/CartContext";
import SubCategory from "./Cetagoriy'sPages/SubCategory";
import Delevary from "./Component/Delevary";
import Policy from "./Component/Policy";
import Responsibility from "./Component/Responsibility";
import SecurePayments from "./Component/SecurePayments";
import TermsAndCondition from "./Component/TermsAndCondition";
import TrackOrder from "./Component/TrackOrder";
import About from "./Pages/About";
import AllProduct from "./Pages/AllProduct";
import BillingDetails from "./Pages/BillingDetails";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import Invoice from "./Pages/Invoice";
import LogIn from "./Pages/LogIn";
import Productpage from "./Pages/ProductPage";
import SelectedProduct from "./Pages/SelectedProduct";
import SignUp from "./Pages/SignUp";
import RootLayOut from "./RootLayOut/RootLayOut";

function App() {
  window.dataLayer = window.dataLayer || [];

  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route element={<RootLayOut />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/cart" element={<SelectedProduct />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/products" element={<AllProduct />} />
              <Route path="/billing" element={<BillingDetails />} />
              <Route path="/product/:product_id" element={<Productpage />} />
              <Route path="/delivery" element={<Delevary />} />
              <Route path="/securePayments" element={<SecurePayments />} />
              <Route path="/trackanorder" element={<TrackOrder />} />
              <Route path="/privacy-policy" element={<Policy />} />
              <Route path="/termsConditions" element={<TermsAndCondition />} />
              <Route path="/responsibility" element={<Responsibility />} />
              <Route
                path="/category/:category_name"
                element={<SubCategory />}
              />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
