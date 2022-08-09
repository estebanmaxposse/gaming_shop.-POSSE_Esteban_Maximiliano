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
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Account from "./components/Account";
import "./App.scss";
import { AuthContextProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Favicon url="https://i.imgur.com/y61iWez.png" />
      <BrowserRouter>
        <AuthContextProvider>
          <CartProvider>
            <NavBar />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/category/:categoryID" element={<Categories />} />
              <Route
                path="/detail/:itemDetailID"
                element={<ItemDetailContainer />}
              />
              <Route path="*" element={<NoMatch />} />
            </Routes>
            <Footer />
          </CartProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
