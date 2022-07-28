import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import Categories from "./components/Categories";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Cart from "./components/Cart";
import Favicon from "react-favicon";
import NoMatch from "./components/NoMatch";
import CartProvider from "./contexts/CartContext";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Favicon url="https://i.imgur.com/y61iWez.png" />
      <BrowserRouter>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/category/:categoryID" element={<Categories />} />
            <Route path="/detail/:itemDetailID" element={<ItemDetailContainer />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
