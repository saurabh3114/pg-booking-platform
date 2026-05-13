import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import API from "../services/api"

import pg1a from "../assets/pg1a.jpeg"
import pg2a from "../assets/pg2a.jpeg"
import pg3a from "../assets/pg3a.jpeg"

export default function Home() {

    const navigate = useNavigate()

    const [pgData, setPgData] = useState([])

    const [filteredPGs, setFilteredPGs] = useState([])

    const [search, setSearch] = useState("")

    const [maxPrice, setMaxPrice] = useState(20000)

    const [sortBy, setSortBy] = useState("")

    const [showAvailable, setShowAvailable] = useState(false)

    const [roomType, setRoomType] = useState("All")

    useEffect(() => {

        fetchPGs()

    }, [])

    const fetchPGs = async () => {

        try {

            const res = await API.get("/pg/")

            setPgData(res.data)

            setFilteredPGs(res.data)

        } catch (err) {

            console.log(err)
        }
    }

    useEffect(() => {

        let filtered = [...pgData]

        // SEARCH
        filtered = filtered.filter((pg) =>

            pg.name.toLowerCase().includes(search.toLowerCase()) ||

            pg.location.toLowerCase().includes(search.toLowerCase())

        )

        // PRICE FILTER
        filtered = filtered.filter(
            (pg) => pg.price <= maxPrice
        )

        // AVAILABLE ONLY
        if (showAvailable) {

            filtered = filtered.filter(
                (pg) => pg.available_rooms > 0
            )
        }

        // ROOM TYPE FILTER
        if (roomType !== "All") {

            filtered = filtered.filter((pg) => {

                if (roomType === "Single")
                    return pg.price >= 14000

                if (roomType === "Double")
                    return pg.price >= 9000 && pg.price < 14000

                if (roomType === "Triple")
                    return pg.price < 9000

                return true
            })
        }

        // SORTING
        if (sortBy === "low-high") {

            filtered.sort((a, b) => a.price - b.price)

        } else if (sortBy === "high-low") {

            filtered.sort((a, b) => b.price - a.price)
        }

        setFilteredPGs(filtered)

    }, [search, maxPrice, pgData, sortBy, showAvailable, roomType])

    const getImage = (id) => {

        if (id === 1) return pg1a

        if (id === 2) return pg2a

        return pg3a
    }

    // FAVORITES
    const saveFavorite = (pg) => {

        const existing =
            JSON.parse(localStorage.getItem("favorites")) || []

        const alreadySaved =
            existing.find((item) => item.id === pg.id)

        let updatedFavorites

        if (alreadySaved) {

            updatedFavorites = existing.filter(
                (item) => item.id !== pg.id
            )

        } else {

            updatedFavorites = [...existing, pg]
        }

        localStorage.setItem(
            "favorites",
            JSON.stringify(updatedFavorites)
        )

        // FORCE UI UPDATE
        setFilteredPGs([...filteredPGs])
    }

    const isFavorite = (id) => {

        const favorites =
            JSON.parse(localStorage.getItem("favorites")) || []

        return favorites.find((item) => item.id === id)
    }

    return (

        <div className="min-h-screen bg-[#f5f7fb] dark:bg-[#0f172a] transition duration-300">

            <Navbar />

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

                {/* HERO */}
                <div className="mb-12">

                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                        Find Your Perfect PG Stay
                    </h1>

                    <p className="text-gray-500 dark:text-gray-300 text-xl mt-5">
                        Premium rooms for students and professionals
                    </p>

                </div>

                {/* FILTER SECTION */}
                <div className="bg-white p-8 rounded-[32px] shadow-lg mb-12">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

                        {/* SEARCH */}
                        <input
                            type="text"
                            placeholder="Search by name or location"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border p-4 rounded-2xl outline-none focus:border-blue-500"
                        />

                        {/* SORT */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border p-4 rounded-2xl outline-none focus:border-blue-500"
                        >

                            <option value="">
                                Sort By
                            </option>

                            <option value="low-high">
                                Price Low to High
                            </option>

                            <option value="high-low">
                                Price High to Low
                            </option>

                        </select>

                        {/* ROOM TYPE */}
                        <select
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                            className="border p-4 rounded-2xl outline-none focus:border-blue-500"
                        >

                            <option value="All">
                                All Room Types
                            </option>

                            <option value="Single">
                                Single Room
                            </option>

                            <option value="Double">
                                Double Sharing
                            </option>

                            <option value="Triple">
                                Triple Sharing
                            </option>

                        </select>

                        {/* AVAILABLE */}
                        <div className="flex items-center justify-between border p-4 rounded-2xl">

                            <span className="text-gray-600">
                                Available Only
                            </span>

                            <input
                                type="checkbox"
                                checked={showAvailable}
                                onChange={() => setShowAvailable(!showAvailable)}
                                className="w-5 h-5"
                            />

                        </div>

                    </div>

                    {/* PRICE */}
                    <div className="mt-8">

                        <div className="flex justify-between mb-3">

                            <span className="text-gray-600">
                                Max Price
                            </span>

                            <span className="font-bold text-blue-600">
                                ₹ {maxPrice}
                            </span>

                        </div>

                        <input
                            type="range"
                            min="5000"
                            max="20000"
                            step="1000"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="w-full"
                        />

                    </div>

                </div>

                {/* RESULTS */}
                <div className="flex justify-between items-center mb-8">

                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Available PGs
                    </h2>

                    <p className="text-gray-500 dark:text-gray-300">
                        {filteredPGs.length} Results Found
                    </p>

                </div>

                {/* PG CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {filteredPGs.map((pg) => (

                        <div
                            key={pg.id}
                            className="bg-white dark:bg-[#111827]dark:bg-[#111827] rounded-[32px] overflow-hidden shadow-xl hover:scale-[1.02] transition duration-300"
                        >

                            {/* IMAGE */}
                            
                            <img
                                src={getImage(pg.id)}
                                alt=""
                                className="w-full h-[260px] object-cover"
                            />

                            {/* CONTENT */}
                            <div className="p-7">

                                {/* TOP */}
                                <div className="flex justify-between items-start">

                                    <div>

                                        <h2 className="text-3xl font-bold text-gray-900 dark:text-black">
                                            {pg.name}
                                        </h2>

                                        <p className="text-gray-500 dark:text-black-900 mt-3 text-lg">
                                            📍 {pg.location}
                                        </p>

                                    </div>

                                    {/* FAVORITE BUTTON */}
                                    <button
                                        onClick={() => saveFavorite(pg)}
                                        className={`text-3xl transition duration-300 hover:scale-125 ${isFavorite(pg.id)
                                            ? "text-red-500"
                                            : "text-gray-300"
                                            }`}
                                    >
                                        ♥
                                    </button>

                                </div>

                                {/* DETAILS */}
                                <div className="flex justify-between items-center mt-8">

                                    <div>

                                        <p className="text-gray-500 dark:text-black-300">
                                            Starting From
                                        </p>

                                        <h3 className="text-3xl font-bold text-blue-600 mt-2">
                                            ₹ {pg.price}
                                        </h3>

                                    </div>

                                    <div className="text-right">

                                        <p className="text-green-600 font-semibold">
                                            {pg.available_rooms} Rooms Left
                                        </p>

                                    </div>

                                </div>

                                {/* BUTTON */}
                                <button
                                    onClick={() => navigate(`/pg/${pg.id}`)}
                                    className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-2xl mt-8 text-lg font-semibold"
                                >
                                    View Details
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    )
}