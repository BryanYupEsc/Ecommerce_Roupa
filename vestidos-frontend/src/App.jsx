import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'
import DashboardPage from './pages/admin/DashboardPage'
import ProductsAdminPage from './pages/admin/ProductAdminPage'
import ProductDetailPage from './pages/ProductDetailPage'

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<DashboardPage />} />
      <Route path="/admin/products" element={<ProductsAdminPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
    </Routes>
    </>
  )
}

export default App