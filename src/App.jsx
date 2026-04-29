import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import ProductsList from "./pages/ProductsList"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import Wishlist from "./pages/Wishlist"
import Account from "./pages/Account"
import NotFound from "./pages/NotFound"
import Register from "./pages/Register"
import Login from "./pages/Login"
import ContactUs from "./pages/ContactUs"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"          element={<ProtectedRoute><ProductsList /></ProtectedRoute>} />
          <Route path="/products/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
          <Route path="/cart"      element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/wishlist"  element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/account"   element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/contact"   element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
          <Route path="/register"  element={<Register />} />
          <Route path="/login"     element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App