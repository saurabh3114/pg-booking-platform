import axios from "axios"

const API = axios.create({
    baseURL: "https://pg-booking-backend-ux91.onrender.com"
})

export default API