import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Trailerpage from "./pages/movies";

function App() {
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/movies",
      element: <Trailerpage />,
    },
  ]);

  return (
    <div className=" m-0">
      <RouterProvider router={Router}></RouterProvider>
    </div>
  );
}

export default App;
