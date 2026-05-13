import Navbar from "../components/Navbar"

export default function Home() {

    return (
        <div className="min-h-screen bg-[#f5f7fb] dark:bg-[#0f172a] transition duration-300">

            <Navbar />

            <div className="p-10">

                <h1 className="text-5xl font-bold mb-8 text-gray-900 dark:text-white">
                    PG Booking Dashboard
                </h1>

            </div>

        </div>
    )
}