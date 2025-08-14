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
        const status = error.response?.status;

        // Backend message (can be string or object depending on API)
        const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        null;

        // Fallback to friendly messages if no backend message
        const friendlyMessage =
        status && ErrorMessages[status]
            ? ErrorMessages[status]
            : "An unknown error occurred";

        // Decide final message (backend > friendly > network)
        const finalMessage = backendMessage || friendlyMessage || "Network error";

        console.log("Api Error:", finalMessage);

        return Promise.reject(new Error(finalMessage));
    }
)

export default api