import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponents from "./components/Navbar";
import DataComponent from "./pages/dataComponent";
import MainPage from "./pages/mainPage";
import ProductDetailPage from "./pages/ProductDetail";
import Footer from "./components/Footer";
import ProductList from "./pages/secondPage";

function App() {
  return (
    <>
      <NavbarComponents />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/deals" element={<ProductList />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
