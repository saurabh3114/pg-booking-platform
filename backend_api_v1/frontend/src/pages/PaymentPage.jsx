import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function PaymentPage() {

    const navigate = useNavigate()

    const [paymentMethod, setPaymentMethod] = useState("UPI")

    const [loading, setLoading] = useState(false)

    const handlePayment = () => {

        setLoading(true)

        setTimeout(() => {

            setLoading(false)

            alert(`Payment Successful via ${paymentMethod}`)

            navigate("/booking-success")

        }, 2500)
    }

    const paymentMethods = [
        "UPI",
        "Cards",
        "Net Banking",
        "Wallet"
    ]

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-4 py-10">

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-[#111827] rounded-[40px] shadow-2xl max-w-2xl w-full overflow-hidden"
            >

                {/* TOP */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-10">

                    <h1 className="text-5xl font-bold">
                        Secure Payment
                    </h1>

                    <p className="text-blue-100 mt-4 text-lg">
                        Fast • Secure • Trusted Payment Experience
                    </p>

                </div>

                {/* CONTENT */}
                <div className="p-10">

                    {/* SUMMARY */}
                    <div className="bg-gray-100 rounded-3xl p-8">

                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                            Booking Summary
                        </h2>

                        <div className="space-y-5">

                            <div className="flex justify-between">
                                <span className="text-gray-600">Property</span>
                                <span className="font-semibold">Premium PG</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">Room Type</span>
                                <span className="font-semibold">Single Room</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">Duration</span>
                                <span className="font-semibold">1 Month</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">Maintenance</span>
                                <span className="font-semibold">₹ 2,000</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">Taxes</span>
                                <span className="font-semibold">₹ 1,000</span>
                            </div>

                            <div className="border-t pt-5 flex justify-between">

                                <span className="text-2xl font-bold">
                                    Total Amount
                                </span>

                                <span className="text-3xl font-bold text-blue-600">
                                    ₹ 18,000
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* PAYMENT METHODS */}
                    <div className="mt-10">

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Choose Payment Method
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                            {paymentMethods.map((method) => (

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    key={method}
                                    onClick={() => setPaymentMethod(method)}
                                    className={`p-5 rounded-2xl text-center font-semibold cursor-pointer transition-all duration-300 ${paymentMethod === method
                                            ? "bg-blue-600 text-white shadow-xl"
                                            : "bg-gray-100 hover:bg-gray-200"
                                        }`}
                                >

                                    {method}

                                </motion.div>

                            ))}

                        </div>

                        {/* SELECTED */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-blue-50 text-blue-700 p-5 rounded-2xl mt-8 text-center font-semibold text-lg"
                        >

                            Selected Payment Method: {paymentMethod}

                        </motion.div>

                    </div>

                    {/* PAY BUTTON */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-5 rounded-2xl mt-10 text-xl font-bold shadow-lg"
                    >

                        {loading
                            ? "Processing Payment..."
                            : `Pay ₹ 18,000`
                        }

                    </motion.button>

                    {/* LOADING */}
                    {loading && (

                        <div className="flex justify-center mt-8">

                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 1,
                                    ease: "linear"
                                }}
                                className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full"
                            />

                        </div>

                    )}

                    <p className="text-center text-gray-400 mt-6">
                        100% Secure Payments Powered by Razorpay
                    </p>

                </div>

            </motion.div>

        </div>
    )
}