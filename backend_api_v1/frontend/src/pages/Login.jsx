import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {

        if (!email || !password) {

            alert("Please fill all fields")

            return
        }

        try {

            setLoading(true)

            const res = await axios.post(
                "http://127.0.0.1:8000/users/login",
                {
                    email,
                    password,
                }
            )

            console.log(res.data)

            // SAVE TOKEN
            localStorage.setItem(
                "token",
                res.data.access_token
            )

            // CHECK TOKEN
            console.log(
                localStorage.getItem("token")
            )

            alert("Login Successful")

            navigate("/")

        } catch (err) {

            console.log(err)

            alert("Invalid Credentials")

        } finally {

            setLoading(false)
        }
    }

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4">

            <div className="bg-white w-full max-w-md rounded-[35px] shadow-2xl p-10">

                {/* LOGO */}
                <div className="text-center mb-10">

                    <h1 className="text-5xl font-bold text-gray-900">
                        APNA PG
                    </h1>

                    <p className="text-gray-500 mt-4 text-lg">
                        Welcome back to your booking platform
                    </p>

                </div>

                {/* EMAIL */}
                <div className="mb-6">

                    <label className="text-sm text-gray-600">
                        Email Address
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border mt-2 p-4 rounded-2xl outline-none focus:border-blue-500"
                    />

                </div>

                {/* PASSWORD */}
                <div className="mb-8">

                    <label className="text-sm text-gray-600">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border mt-2 p-4 rounded-2xl outline-none focus:border-blue-500"
                    />

                </div>

                {/* BUTTON */}
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-2xl text-lg font-semibold"
                >

                    {loading ? "Logging In..." : "Login"}

                </button>

                {/* SIGNUP */}
                <p className="text-center text-gray-500 mt-8">

                    Don’t have an account?

                    <Link
                        to="/signup"
                        className="text-blue-600 font-semibold ml-2"
                    >
                        Signup
                    </Link>

                </p>

            </div>

        </div>
    )
}