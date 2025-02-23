import axios from "axios";
import { useUser } from "../context/UserContext"; // Assuming you have a UserContext for managing the login state

const api = axios.create({
  baseURL: "https://your-api.com",
  withCredentials: true, // Ensures cookies are included with requests
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => response, // Return the response if it is successful
  (error) => {
    // Check for expired session (401 Unauthorized)
    if (error.response?.status === 401) {
      console.warn("Session expired. Logging out...");

      const { setIsSignedIn } = useUser(); // Assuming you're using a context to manage auth state
      setIsSignedIn(false); // Update the state to reflect the logged-out status

      // Optionally redirect to login page
      window.location.href = "/signin"; // or use react-router-dom to redirect
    }

    return Promise.reject(error); // Propagate the error if it wasn't due to 401
  }
);

export default api;
