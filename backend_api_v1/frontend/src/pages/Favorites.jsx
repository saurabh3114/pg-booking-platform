import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

import pg1a from "../assets/pg1a.jpeg"
import pg2a from "../assets/pg2a.jpeg"
import pg3a from "../assets/pg3a.jpeg"

export default function Favorites() {

    const navigate = useNavigate()

    const [favorites, setFavorites] = useState([])

    useEffect(() => {

        const savedFavorites =
            JSON.parse(localStorage.getItem("favorites")) || []

        setFavorites(savedFavorites)

    }, [])

    const removeFavorite = (id) => {

        const updatedFavorites = favorites.filter(
            (pg) => pg.id !== id
        )

        setFavorites(updatedFavorites)

        localStorage.setItem(
            "favorites",
            JSON.stringify(updatedFavorites)
        )
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
                        Saved Properties ❤️
                    </h1>

                    <p className="text-gray-500 dark:text-gray-300 text-lg mt-4">
                        Your favorite PG stays in one place
                    </p>

                </div>

                {/* EMPTY */}
                {favorites.length === 0 ? (

                    <div className="bg-white dark:bg-[#111827] rounded-[32px] shadow-lg p-16 text-center">

                        <h2 className="text-4xl font-bold text-gray-800">
                            No Favorites Yet
                        </h2>

                        <p className="text-gray-500 dark:text-gray-300 mt-5 text-lg">
                            Save your favorite PGs to access them quickly later.
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {favorites.map((pg) => (

                            <div
                                key={pg.id}
                                className="bg-white dark:bg-[#111827] rounded-[32px] overflow-hidden shadow-xl hover:scale-[1.02] transition duration-300"
                            >

                                {/* IMAGE */}
                                <img
                                    src={getImage(pg.id)}
                                    alt=""
                                    className="w-full h-[260px] object-cover"
                                />

                                {/* CONTENT */}
                                <div className="p-7">

                                    <div className="flex justify-between items-start">

                                        <div>

                                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                                {pg.name}
                                            </h2>

                                            <p className="text-gray-500 dark:text-gray-300 mt-3 text-lg">
                                                📍 {pg.location}
                                            </p>

                                        </div>

                                        <button
                                            onClick={() => removeFavorite(pg.id)}
                                            className="text-3xl"
                                        >
                                            ❤️
                                        </button>

                                    </div>

                                    {/* PRICE */}
                                    <div className="mt-8 flex justify-between items-center">

                                        <div>

                                            <p className="text-gray-500 dark:text-gray-300">
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

                )}

            </div>

        </div>
    )
}