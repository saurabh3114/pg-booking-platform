import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import MyBookings from "./pages/MyBookings"
import PGDetails from "./pages/PGDetails"
import BookingPage from "./pages/BookingPage"
import BookingSuccess from "./pages/BookingSuccess"
import PaymentPage from "./pages/PaymentPage"
import Favorites from "./pages/Favorites"

import ChatWidget from "./components/ChatWidget"

function App() {

  return (

    <BrowserRouter>

      <ChatWidget />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="/pg/:id" element={<PGDetails />} />

        <Route path="/booking/:id" element={<BookingPage />} />

        <Route path="/booking-success" element={<BookingSuccess />} />

        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/favorites" element={<Favorites />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App