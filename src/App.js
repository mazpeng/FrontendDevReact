import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponents from "./components/Navbar";
import DataComponent from "./pages/dataComponent";
import MainPage from "./pages/mainPage";
import Product from "./components/FilterNavigation";
import ProductDetailPage from "./pages/ProductDetail";

function App() {
  return (
    <>
      <NavbarComponents />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/shop" element={<DataComponent />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
