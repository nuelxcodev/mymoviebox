import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Trailerpage from "./pages/movies";
import axios from "axios";

console.log(import.meta.env.VITE_API_URL);
function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [data, setData] = useState({ movies: [], genre: [] });

  const [nextPage, setNextPage] = useState(1);

  async function fetchMovies() {
    const url = `${import.meta.env.VITE_API_URL}/movies`;
    try {
      const response = await axios.post(url, { page: nextPage });
      const { movies, genre } = response.data;
      setData({ movies, genre });
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }
  useEffect(() => {
    fetchMovies();
  }, [nextPage]);

  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  // Router configuration
  const Router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home onNextpage={setNextPage} data={data} nextPage={nextPage} />
      ),
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/movies",
      element: <Trailerpage data={data} />,
    },
  ]);

  // Conditional rendering for offline/online state
  return (
    <div className="m-0">
      {isOnline ? (
        <RouterProvider router={Router} />
      ) : (
        <div className="h-screen w-screen justify-center flex items-center text-center">
          <div>
            <h1>You are offline</h1>
            <p>Please check your internet connection.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
