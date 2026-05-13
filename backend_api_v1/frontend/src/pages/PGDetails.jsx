import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import API from "../services/api"

import pg1a from "../assets/pg1a.jpeg"
import pg1b from "../assets/pg1b.jpeg"
import pg1c from "../assets/pg1c.jpeg"
import pg1d from "../assets/pg1d.jpeg"

import pg2a from "../assets/pg2a.jpeg"
import pg2b from "../assets/pg2b.jpeg"
import pg2c from "../assets/pg2c.jpeg"
import pg2d from "../assets/pg2d.jpeg"

import pg3a from "../assets/pg3a.jpeg"
import pg3b from "../assets/pg3b.jpeg"
import pg3c from "../assets/pg3c.jpeg"
import pg3d from "../assets/pg3d.jpeg"

export default function PGDetails() {

    const { id } = useParams()

    const navigate = useNavigate()

    const [pg, setPg] = useState(null)

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

    const galleryImages =
        pg.id === 1
            ? [pg1a, pg1b, pg1c, pg1d]
            : pg.id === 2
                ? [pg2a, pg2b, pg2c, pg2d]
                : [pg3a, pg3b, pg3c, pg3d]

    return (

        <div className="min-h-screen bg-[#f5f7fb] dark:bg-[#0f172a] transition duration-300">

            <Navbar />

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

                {/* TOP SECTION */}
                <div className="mb-8">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                        <div>

                            <h1 className="text-4xl md:text-5xl font-bold tex900t-gray-">
                                {pg.name}
                            </h1>

                            <div className="flex flex-wrap items-center gap-3 mt-4">

                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    4.5 ★
                                </span>

                                <span className="text-gray-500 dark:text-gray-300">
                                    120 Reviews
                                </span>

                                <span className="text-gray-400">
                                    •
                                </span>

                                <span className="text-gray-600">
                                    📍 {pg.location},India
                                </span>

                            </div>

                        </div>

                        <div className="bg-white dark:bg-[#111827] shadow-md rounded-3xl px-6 py-5">

                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                Starting From
                            </p>

                            <h2 className="text-3xl font-bold text-blue-600 mt-1">
                                ₹ {pg.price}
                            </h2>

                        </div>

                    </div>

                </div>

                {/* IMAGE GALLERY */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

                    {/* MAIN IMAGE */}
                    <div className="lg:col-span-2">

                        <img
                            src={galleryImages[0]}
                            alt=""
                            className="w-full h-[520px] object-cover rounded-[32px] shadow-lg"
                        />

                    </div>

                    {/* SIDE GALLERY */}
                    <div className="grid grid-cols-2 gap-4 lg:col-span-2">

                        {galleryImages.slice(1).map((img, index) => (

                            <img
                                key={index}
                                src={img}
                                alt=""
                                className="w-full h-[250px] object-cover rounded-[28px] shadow-md hover:scale-[1.02] transition duration-300"
                            />

                        ))}

                    </div>

                </div>

                {/* MAIN CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">

                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* LOCATION MAP */}
                        <div className="bg-white dark:bg-[#111827] p-8 rounded-[30px] shadow-md">

                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                Location
                            </h2>

                            <p className="text-gray-500 dark:text-gray-300 text-lg mt-3">
                                📍 {pg.location}, India
                            </p>

                            <p className="text-red-500">
                                {pg.location}
                            </p>
                            <p className="text-gray-500 dark:text-gray-300 text-lg mb-6">
                                📍 {pg.location}
                            </p>

                            <div className="overflow-hidden rounded-3xl">

                                <iframe
                                    title="map"
                                    src={`https://www.google.com/maps?q=${pg.location}, India&output=embed`}
                                    width="100%"
                                    height="350"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="rounded-3xl"
                                />

                            </div>

                        </div>
                        {/* ABOUT */}
                        <div className="bg-white dark:bg-[#111827] p-8 rounded-[32px] shadow-md">

                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                About this property
                            </h2>

                            <p className="text-lg text-gray-600 leading-9">
                                Experience premium PG living with fully furnished
                                modern rooms, delicious food service, laundry,
                                WiFi, CCTV security, housekeeping, and a peaceful
                                environment designed for students and professionals.
                            </p>

                        </div>

                        {/* AMENITIES */}
                        <div className="bg-white dark:bg-[#111827] p-8 rounded-[32px] shadow-md">

                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                                Amenities
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

                                <div className="bg-gray-100 p-5 rounded-2xl font-medium">
                                    📶 High-Speed WiFi
                                </div>

                                <div className="bg-gray-100 p-5 rounded-2xl font-medium">
                                    ❄️ AC Rooms
                                </div>

                                <div className="bg-gray-100 p-5 rounded-2xl font-medium">
                                    🍽 Food Included
                                </div>

                                <div className="bg-gray-100 p-5 rounded-2xl font-medium">
                                    🧺 Laundry
                                </div>

                                <div className="bg-gray-100 p-5 rounded-2xl font-medium">
                                    🚗 Parking
                                </div>

                                <div className="bg-gray-100 p-5 rounded-2xl font-medium">
                                    🔐 CCTV Security
                                </div>

                            </div>

                        </div>

                        {/* ROOM OPTIONS */}
                        <div className="bg-white dark:bg-[#111827] p-8 rounded-[32px] shadow-md">

                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                                Room Options
                            </h2>

                            <div className="space-y-5">

                                <div className="border border-gray-200 hover:border-blue-500 transition p-6 rounded-3xl">

                                    <div className="flex justify-between items-center">

                                        <div>

                                            <h3 className="text-2xl font-bold">
                                                Single Room
                                            </h3>

                                            <p className="text-gray-500 dark:text-gray-300 mt-2">
                                                Private room with attached washroom
                                            </p>

                                        </div>

                                        <div className="text-right">

                                            <h4 className="text-2xl font-bold text-blue-600">
                                                ₹ 15,000
                                            </h4>

                                            <p className="text-gray-500 dark:text-gray-300">
                                                / month
                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <div className="border border-gray-200 hover:border-blue-500 transition p-6 rounded-3xl">

                                    <div className="flex justify-between items-center">

                                        <div>

                                            <h3 className="text-2xl font-bold">
                                                Double Sharing
                                            </h3>

                                            <p className="text-gray-500 dark:text-gray-300 mt-2">
                                                Shared premium room with storage
                                            </p>

                                        </div>

                                        <div className="text-right">

                                            <h4 className="text-2xl font-bold text-blue-600">
                                                ₹ 10,000
                                            </h4>

                                            <p className="text-gray-500 dark:text-gray-300">
                                                / month
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* BOOKING CARD */}
                    <div>

                        <div className="bg-white dark:bg-[#111827] rounded-[32px] shadow-xl p-8 sticky top-8">

                            <div className="flex items-center justify-between">

                                <div>

                                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                                        ₹ {pg.price}
                                    </h2>

                                    <p className="text-gray-500 dark:text-gray-300 mt-1">
                                        per month
                                    </p>

                                </div>

                                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                                    {pg.available_rooms} Left
                                </div>

                            </div>

                            {/* FORM */}
                            <div className="mt-8 space-y-5">

                                <div>

                                    <label className="text-sm text-gray-600">
                                        Check In
                                    </label>

                                    <input
                                        type="date"
                                        className="w-full border mt-2 p-4 rounded-2xl outline-none focus:border-blue-500"
                                    />

                                </div>

                                <div>

                                    <label className="text-sm text-gray-600">
                                        Stay Duration
                                    </label>

                                    <select
                                        className="w-full border mt-2 p-4 rounded-2xl outline-none focus:border-blue-500"
                                    >

                                        <option>1 Month</option>
                                        <option>3 Months</option>
                                        <option>6 Months</option>
                                        <option>12 Months</option>

                                    </select>

                                </div>

                            </div>

                            {/* BUTTON */}
                            <button
                                onClick={() => navigate(`/booking/${pg.id}`)}
                                className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-5 rounded-2xl mt-8 text-lg font-semibold shadow-lg"
                            >
                                Continue Booking
                            </button>

                            <p className="text-center text-gray-400 text-sm mt-5">
                                No brokerage • Instant booking • Secure payment
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}