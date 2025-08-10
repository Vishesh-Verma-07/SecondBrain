import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api/v1',
    withCredentials: true,
    timeout: 10000, 
})


const ErrorMessages: Record<number, string> = {
    401: 'Unauthorized access - please log in',
    403: 'Forbidden - you do not have permission to access this resource',
    404: 'Resource not found',
    500: 'Internal server error - please try again later',
}

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status
        const message = status ? ErrorMessages[status] || 'An unknown error occurred' : "Network error";
        // Handle the error (e.g., show a notification)
        console.log("Api Error:", message)
        return Promise.reject(new Error(message))
    }
)

export default api