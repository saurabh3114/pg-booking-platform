import { useEffect, useState, useCallback } from "react"
import Navbar from "../components/Navbar"
import API from "../services/api"

import pg1a from "../assets/pg1a.jpeg"
import pg2a from "../assets/pg2a.jpeg"
import pg3a from "../assets/pg3a.jpeg"

export default function MyBookings() {

    const [bookings, setBookings] = useState([])

    const fetchBookings = useCallback(async () => {

        try {

            const token = localStorage.getItem("token")

            const res = await API.get(
                "/booking/my-bookings",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setBookings(res.data)

        } catch (err) {

            console.log(err)
        }

    }, [])

    useEffect(() => {

        fetchBookings()

    }, [fetchBookings])

    // CANCEL BOOKING
    const cancelBooking = async (id) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel booking?"
        )

        if (!confirmCancel) return

        try {

            const token = localStorage.getItem("token")

            await API.delete(
                `/booking/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            alert("Booking Cancelled")

            fetchBookings()

        } catch (err) {

            console.log(err)

            alert("Cancel Failed")
        }
    }

    const getImage = (id) => {

        if (id === 1) return pg1a

        if (id === 2) return pg2a

        return pg3a
    }

    return (

        <div className="min-h-screen bg-[#f5f7fb] dark:bg-[#0f172a] transition duration-300">

            <Navbar />

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

                {/* TITLE */}
                <div className="mb-10">

                    <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
                        My Bookings
                    </h1>

                    <p className="text-gray-500 dark:text-gray-300 text-lg mt-4">
                        Manage your booked stays and reservations
                    </p>

                </div>

                {/* EMPTY STATE */}
                {bookings.length === 0 ? (

                    <div className="bg-white dark:bg-[#111827] rounded-[32px] p-16 text-center shadow-lg">

                        <h2 className="text-3xl font-bold text-gray-800">
                            No Bookings Yet
                        </h2>

                        <p className="text-gray-500 dark:text-gray-300 mt-4 text-lg">
                            Book your first premium PG stay now.
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {bookings.map((booking) => (

                            <div
                                key={booking.id}
                                className="bg-white dark:bg-[#111827] rounded-[32px] shadow-xl overflow-hidden"
                            >

                                {/* IMAGE */}
                                <img
                                    src={getImage(booking.pg.id)}
                                    alt=""
                                    className="w-full h-[280px] object-cover"
                                />

                                {/* CONTENT */}
                                <div className="p-8">

                                    {/* TOP */}
                                    <div className="flex justify-between items-start">

                                        <div>

                                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                                {booking.pg.name}
                                            </h2>

                                            <p className="text-gray-500 dark:text-gray-300 mt-3 text-lg">
                                                📍 {booking.pg.location}
                                            </p>

                                        </div>

                                        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                                            Confirmed
                                        </div>

                                    </div>

                                    {/* DETAILS */}
                                    <div className="grid grid-cols-2 gap-6 mt-8">

                                        <div className="bg-gray-100 p-5 rounded-2xl">

                                            <p className="text-gray-500 dark:text-gray-300 text-sm">
                                                Check In
                                            </p>

                                            <h3 className="text-xl font-bold mt-2">
                                                {booking.check_in}
                                            </h3>

                                        </div>

                                        <div className="bg-gray-100 p-5 rounded-2xl">

                                            <p className="text-gray-500 dark:text-gray-300 text-sm">
                                                Check Out
                                            </p>

                                            <h3 className="text-xl font-bold mt-2">
                                                {booking.check_out}
                                            </h3>

                                        </div>

                                    </div>

                                    {/* PRICE */}
                                    <div className="mt-8 flex justify-between items-center">

                                        <div>

                                            <p className="text-gray-500 dark:text-gray-300">
                                                Monthly Rent
                                            </p>

                                            <h2 className="text-3xl font-bold text-blue-600 mt-2">
                                                ₹ {booking.pg.price}
                                            </h2>

                                        </div>

                                        <button
                                            onClick={() => cancelBooking(booking.id)}
                                            className="bg-red-500 hover:bg-red-600 transition text-white px-6 py-4 rounded-2xl font-semibold"
                                        >
                                            Cancel Booking
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    )
}