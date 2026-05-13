import { useState, useEffect, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import API from "../services/api"

import pg1a from "../assets/pg1a.jpeg"
import pg2a from "../assets/pg2a.jpeg"
import pg3a from "../assets/pg3a.jpeg"

export default function BookingPage() {

    const { id } = useParams()

    const navigate = useNavigate()

    const [pg, setPg] = useState(null)

    const [name, setName] = useState("")

    const [phone, setPhone] = useState("")

    const [checkIn, setCheckIn] = useState("")

    const [checkOut, setCheckOut] = useState("")

    const [duration, setDuration] = useState(1)

    const [roomType, setRoomType] = useState("Single Room")

    const fetchPG = useCallback(async () => {

        try {

            const res = await API.get(`/pg/${id}`)

            setPg(res.data)

        } catch (err) {

            console.log(err)
        }

    }, [id])

    useEffect(() => {

        fetchPG()

    }, [fetchPG])

    if (!pg) {

        return (
            <div className="min-h-screen flex items-center justify-center text-2xl">
                Loading...
            </div>
        )
    }

    const selectedImage =
        pg.id === 1
            ? pg1a
            : pg.id === 2
                ? pg2a
                : pg3a

    // ROOM PRICES
    const roomPrices = {
        "Single Room": 15000,
        "Double Sharing": 10000,
        "Triple Sharing": 7000
    }

    const monthlyRent = roomPrices[roomType]

    const subtotal = monthlyRent * duration

    const maintenance = 2000

    const taxes = 1000

    const total = subtotal + maintenance + taxes

    // BOOKING FUNCTION
    const handleBooking = async () => {

        // NAME VALIDATION
        if (name.trim().length < 3) {

            alert("Name must be at least 3 characters")

            return
        }

        // PHONE VALIDATION
        const phoneRegex = /^[0-9]{10}$/

        if (!phoneRegex.test(phone)) {

            alert("Enter valid 10-digit phone number")

            return
        }

        // DATE VALIDATION
        if (!checkIn || !checkOut) {

            alert("Please select check-in and check-out dates")

            return
        }

        // CHECKOUT GREATER THAN CHECKIN
        if (new Date(checkOut) <= new Date(checkIn)) {

            alert("Check-out date must be after check-in")

            return
        }

        // TOKEN VALIDATION
        const token = localStorage.getItem("token")

        if (!token) {

            alert("Please login first")

            navigate("/login")

            return
        }

        try {

            const bookingData = {
                pg_id: Number(pg.id),
                check_in: checkIn,
                check_out: checkOut
            }

            console.log("BOOKING DATA:", bookingData)

            await API.post(
                "/booking/",
                bookingData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            alert("Booking Successful!")

            navigate("/payment")

        } catch (err) {

            console.log(err)

            if (err.response?.status === 401) {

                alert("Session expired. Please login again.")

                navigate("/login")

            } else if (err.response?.data?.detail) {

                alert(JSON.stringify(err.response.data.detail))

            } else {

                alert("Booking Failed")
            }
        }
    }

    return (

        <div className="min-h-screen bg-[#f5f7fb] dark:bg-[#0f172a] transition duration-300">

            <Navbar />

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2">

                        <div className="bg-white dark:bg-[#111827] rounded-[32px] shadow-lg overflow-hidden">

                            <img
                                src={selectedImage}
                                alt=""
                                className="w-full h-[420px] object-cover"
                            />

                            <div className="p-8">

                                <h1 className="text-4xl font-bold text-white-900 dark:text-white">
                                    {pg.name}
                                </h1>

                                <p className="text-gray-500 dark:text-white-300 text-lg mt-3">
                                    📍 {pg.location}
                                </p>

                                <div className="flex items-center gap-4 mt-6">

                                    <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm">
                                        4.5 ★
                                    </span>

                                    <span className="text-gray-500 dark:text-gray-300">
                                        120 Reviews
                                    </span>

                                </div>

                                {/* ROOM OPTIONS */}
                                <div className="mt-10">

                                    <h2 className="text-2xl font-bold mb-6">
                                        Select Room Type
                                    </h2>

                                    <div className="space-y-4">

                                        {Object.keys(roomPrices).map((room) => (

                                            <div
                                                key={room}
                                                onClick={() => setRoomType(room)}
                                                className={`border p-6 rounded-3xl cursor-pointer transition ${roomType === room
                                                        ? "border-blue-600 bg-blue-50"
                                                        : "border-gray-200"
                                                    }`}
                                            >

                                                <div className="flex justify-between items-center">

                                                    <div>

                                                        <h3 className="text-2xl font-bold">
                                                            {room}
                                                        </h3>

                                                        <p className="text-gray-500 dark:text-gray-300 mt-2">
                                                            Premium stay experience
                                                        </p>

                                                    </div>

                                                    <h4 className="text-2xl font-bold text-blue-600">
                                                        ₹ {roomPrices[room].toLocaleString()}
                                                    </h4>

                                                </div>

                                            </div>

                                        ))}

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div>

                        <div className="bg-white dark:bg-[#111827] rounded-[32px] shadow-xl p-8 sticky top-8">

                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Confirm Booking
                            </h2>

                            <div className="mt-8 space-y-5">

                                {/* NAME */}
                                <div>

                                    <label className="text-sm text-gray-600">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full border mt-2 p-4 rounded-2xl outline-none focus:border-blue-500"
                                    />

                                </div>

                                {/* PHONE */}
                                <div>

                                    <label className="text-sm text-gray-600">
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter phone number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full border mt-2 p-4 rounded-2xl outline-none focus:border-blue-500"
                                    />

                                </div>

                                {/* CHECK IN */}
                                <div>

                                    <label className="text-sm text-gray-600">
                                        Check In Date
                                    </label>

                                    <input
                                        type="date"
                                        value={checkIn}
                                        onChange={(e) => setCheckIn(e.target.value)}
                                        className="w-full border mt-2 p-4 rounded-2xl outline-none focus:border-blue-500"
                                    />

                                </div>

                                {/* CHECK OUT */}
                                <div>

                                    <label className="text-sm text-gray-600">
                                        Check Out Date
                                    </label>

                                    <input
                                        type="date"
                                        value={checkOut}
                                        onChange={(e) => setCheckOut(e.target.value)}
                                        className="w-full border mt-2 p-4 rounded-2xl outline-none focus:border-blue-500"
                                    />

                                </div>

                                {/* DURATION */}
                                <div>

                                    <label className="text-sm text-gray-600">
                                        Stay Duration
                                    </label>

                                    <select
                                        value={duration}
                                        onChange={(e) => setDuration(Number(e.target.value))}
                                        className="w-full border mt-2 p-4 rounded-2xl outline-none focus:border-blue-500"
                                    >

                                        <option value={1}>1 Month</option>
                                        <option value={3}>3 Months</option>
                                        <option value={6}>6 Months</option>
                                        <option value={12}>12 Months</option>

                                    </select>

                                </div>

                            </div>

                            {/* SUMMARY */}
                            <div className="bg-gray-100 rounded-3xl p-6 mt-8">

                                <h3 className="text-xl font-bold mb-5">
                                    Price Summary
                                </h3>

                                <div className="space-y-4">

                                    <div className="flex justify-between">
                                        <span>Room Type</span>
                                        <span>{roomType}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Monthly Rent</span>
                                        <span>₹ {monthlyRent.toLocaleString()}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Duration</span>
                                        <span>{duration} Month</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Maintenance</span>
                                        <span>₹ {maintenance.toLocaleString()}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Taxes</span>
                                        <span>₹ {taxes.toLocaleString()}</span>
                                    </div>

                                </div>

                                <div className="border-t mt-5 pt-5 flex justify-between">

                                    <span className="text-2xl font-bold">
                                        Total
                                    </span>

                                    <span className="text-3xl font-bold text-blue-600">
                                        ₹ {total.toLocaleString()}
                                    </span>

                                </div>

                            </div>

                            {/* BUTTON */}
                            <button
                                onClick={handleBooking}
                                className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-5 rounded-2xl mt-8 text-lg font-semibold"
                            >
                                Confirm Booking
                            </button>

                            <p className="text-center text-gray-400 text-sm mt-5">
                                Secure booking • Instant confirmation
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}