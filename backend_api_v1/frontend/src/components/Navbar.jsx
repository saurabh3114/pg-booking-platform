import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {

    const navigate = useNavigate()

    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {

        const savedTheme =
            localStorage.getItem("theme")

        if (savedTheme === "dark") {

            setDarkMode(true)

            document.documentElement.classList.add("dark")
        }

    }, [])

    const toggleDarkMode = () => {

        const newTheme = !darkMode

        setDarkMode(newTheme)

        if (newTheme) {

            document.documentElement.classList.add("dark")

            localStorage.setItem("theme", "dark")

        } else {

            document.documentElement.classList.remove("dark")

            localStorage.setItem("theme", "light")
        }
    }

    const logout = () => {

        localStorage.removeItem("token")

        navigate("/login")
    }

    return (

        <nav className="bg-white dark:bg-[#111827] shadow-lg px-6 md:px-10 py-5 transition duration-300">

            <div className="max-w-7xl mx-auto flex justify-between items-center">

                {/* LOGO */}
                <Link
                    to="/"
                    className="text-3xl font-bold text-blue-600"
                >
                    APNA PG
                </Link>

                {/* NAV LINKS */}
                <div className="flex items-center gap-4 md:gap-6">

                    <Link
                        to="/"
                        className="text-gray-700 dark:text-white hover:text-blue-600 font-medium transition"
                    >
                        Home
                    </Link>

                    <Link
                        to="/favorites"
                        className="text-gray-700 dark:text-white hover:text-blue-600 font-medium transition"
                    >
                        Favorites
                    </Link>

                    <Link
                        to="/my-bookings"
                        className="text-gray-700 dark:text-white hover:text-blue-600 font-medium transition"
                    >
                        My Bookings
                    </Link>

                    {/* DARK MODE BUTTON */}
                    <button
                        onClick={toggleDarkMode}
                        className="bg-gray-100 dark:bg-gray-700 text-xl px-4 py-2 rounded-full transition"
                    >

                        {darkMode ? "☀️" : "🌙"}

                    </button>

                    {/* LOGIN / LOGOUT */}
                    {localStorage.getItem("token") ? (

                        <button
                            onClick={logout}
                            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-2xl transition"
                        >
                            Logout
                        </button>

                    ) : (

                        <Link
                            to="/login"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-2xl transition"
                        >
                            Login
                        </Link>

                    )}

                </div>

            </div>

        </nav>
    )
}