import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponents from "./components/Navbar";
import MainPage from "./pages/mainPage";
import ProductDetailPage from "./pages/ProductDetail";
import Footer from "./components/Footer";
import ProductList from "./pages/secondPage";
import { Register } from "./pages/RegisterPage";
import ContentLogin from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import { ContentProfile } from "./pages/Profile";
import { ContentProfileEdit } from "./pages/ProfileEdit";

function App() {
  return (
    <>
      <NavbarComponents />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/deals" element={<ProductList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<ContentLogin />} />
        <Route path="/getPassword" element={<ForgotPassword />} />
        <Route path="/profile" element={<ContentProfile />} />
        <Route path="/profileEdit" element={<ContentProfileEdit />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
