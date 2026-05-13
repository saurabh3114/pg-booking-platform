import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ChatWidget() {

    const [open, setOpen] = useState(false)

    const [message, setMessage] = useState("")

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hi 👋 Welcome to APNA PG support!"
        }
    ])

    const handleSend = () => {

        if (!message.trim()) return

        const userMessage = {
            sender: "user",
            text: message
        }

        setMessages((prev) => [...prev, userMessage])

        const userText = message.toLowerCase()

        setMessage("")

        setTimeout(() => {

            let botReply = "Our support team will contact you shortly."

            if (userText.includes("price")) {

                botReply =
                    "Prices depend on room type and location."

            } else if (userText.includes("wifi")) {

                botReply =
                    "Yes, all premium PGs include high-speed WiFi."

            } else if (userText.includes("food")) {

                botReply =
                    "Most PGs provide breakfast and dinner."

            } else if (userText.includes("booking")) {

                botReply =
                    "You can book rooms directly from the property page."

            }

            const botMessage = {
                sender: "bot",
                text: botReply
            }

            setMessages((prev) => [...prev, botMessage])

        }, 1000)
    }

    return (

        <>

            {/* FLOAT BUTTON */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white w-16 h-16 rounded-full shadow-2xl text-3xl z-50"
            >
                💬
            </motion.button>

            {/* CHAT BOX */}
            <AnimatePresence>

                {open && (

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-28 right-6 w-[360px] h-[550px] bg-white rounded-[32px] shadow-2xl overflow-hidden z-50 border border-gray-200"
                    >

                        {/* TOP */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">

                            <h2 className="text-2xl font-bold">
                                APNA PG Support
                            </h2>

                            <p className="text-blue-100 mt-2">
                                We usually reply instantly
                            </p>

                        </div>

                        {/* MESSAGES */}
                        <div className="h-[370px] overflow-y-auto p-5 space-y-4 bg-[#f7f9fc]">

                            {messages.map((msg, index) => (

                                <div
                                    key={index}
                                    className={`flex ${
                                        msg.sender === "user"
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >

                                    <div
                                        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm shadow ${
                                            msg.sender === "user"
                                                ? "bg-blue-600 text-white"
                                                : "bg-white text-gray-700"
                                        }`}
                                    >

                                        {msg.text}

                                    </div>

                                </div>

                            ))}

                        </div>

                        {/* INPUT */}
                        <div className="p-4 border-t flex gap-3">

                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => {

                                    if (e.key === "Enter") {

                                        handleSend()
                                    }
                                }}
                                className="flex-1 border rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
                            />

                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={handleSend}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-2xl"
                            >
                                ➤
                            </motion.button>

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

        </>
    )
}