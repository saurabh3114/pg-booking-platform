import { useState } from "react"
import axios from "axios"

export default function Signup() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignup = async () => {

        try {

            await axios.post(
                "http://127.0.0.1:8000/users/signup",
                {
                    name,
                    email,
                    password,
                }
            )

            alert("Signup Successful")

            window.location.href = "/login"

        } catch (err) {

            alert("Signup Failed")
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">

            <div className="bg-white p-8 rounded-3xl shadow-xl w-96">

                <h1 className="text-4xl font-bold mb-6 text-center">
                    Signup
                </h1>

                <input
                    type="text"
                    placeholder="Name"
                    className="w-full border p-3 rounded-xl mb-4"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 rounded-xl mb-4"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded-xl mb-4"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleSignup}
                    className="w-full bg-blue-600 text-white p-3 rounded-xl"
                >
                    Signup
                </button>

            </div>

        </div>
    )
}