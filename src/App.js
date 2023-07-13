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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
