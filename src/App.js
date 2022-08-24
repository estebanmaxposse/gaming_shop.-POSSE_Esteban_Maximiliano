import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
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
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.scss";
import AuthContext from "./contexts/AuthContext";
import UserContext from "./contexts/UserContext";
import { ToastContainer } from "react-bootstrap";
import LoadingBackdrop from "./components/LoadingBackdrop";

function App() {
  return (
    <div className="App">
      <Favicon url="https://i.imgur.com/y61iWez.png" />
      <BrowserRouter>
        <AuthContext>
          <UserContext>
            <CartProvider>
              <ToastContainer />
              <LoadingBackdrop />
              <NavBar />
              <Routes>
                <Route path="/" index element={<Homepage />} />
                <Route path="/cart" element={<Cart />} />
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
                <Route path="/category/:categoryID" element={<Categories />} />
                <Route
                  path="/detail/:itemDetailID"
                  element={<ItemDetailContainer />}
                />
                <Route path="/*" element={<NoMatch />} />
              </Routes>
              <Footer />
            </CartProvider>
          </UserContext>
        </AuthContext>
      </BrowserRouter>
    </div>
  );
}

export default App;
