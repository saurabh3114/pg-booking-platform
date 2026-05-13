import { useNavigate } from "react-router-dom"

export default function BookingSuccess() {

    const navigate = useNavigate()

    return (

        <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-4">

            <div className="bg-white shadow-2xl rounded-[40px] p-10 md:p-14 max-w-2xl w-full text-center">

                {/* SUCCESS ICON */}
                <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mx-auto">

                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-5xl">
                        ✓
                    </div>

                </div>

                {/* TITLE */}
                <h1 className="text-5xl font-bold text-gray-900 mt-8">
                    Booking Confirmed
                </h1>

                <p className="text-gray-500 text-lg mt-5 leading-8">
                    Your PG booking has been successfully confirmed.
                    You will receive booking details and confirmation shortly.
                </p>

                {/* BOOKING CARD */}
                <div className="bg-gray-100 rounded-3xl p-8 mt-10 text-left">

                    <h2 className="text-2xl font-bold mb-6">
                        Booking Summary
                    </h2>

                    <div className="space-y-5">

                        <div className="flex justify-between">

                            <span className="text-gray-600">
                                Booking ID
                            </span>

                            <span className="font-semibold">
                                PG2026A12
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-gray-600">
                                Property
                            </span>

                            <span className="font-semibold">
                                Premium PG
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-gray-600">
                                Room Type
                            </span>

                            <span className="font-semibold">
                                Single Room
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-gray-600">
                                Payment Status
                            </span>

                            <span className="text-green-600 font-bold">
                                Paid
                            </span>

                        </div>

                        <div className="border-t pt-5 flex justify-between">

                            <span className="text-xl font-bold">
                                Total Paid
                            </span>

                            <span className="text-2xl font-bold text-blue-600">
                                ₹ 15,000
                            </span>

                        </div>

                    </div>

                </div>

                {/* BUTTONS */}
                <div className="flex flex-col md:flex-row gap-4 mt-10">

                    <button
                        onClick={() => navigate("/")}
                        className="flex-1 border border-gray-300 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-100 transition"
                    >
                        Back To Home
                    </button>

                    <button
                        onClick={() => navigate("/my-bookings")}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold transition"
                    >
                        My Bookings
                    </button>

                </div>

            </div>

        </div>
    )
}