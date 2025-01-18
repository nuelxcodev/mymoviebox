import React, { useContext, useState } from "react";
import { BiMenu, BiMoon } from "react-icons/bi";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { Link } from "react-router-dom";
import { Theme_context } from "../utils/themeContext";
import { BsSun } from "react-icons/bs";

function Nav() {
  const [isopen, setisopen] = useState(false);
  const { theme, setTheme } = useContext(Theme_context);

  return (
    <nav className="flex justify-around bg-transparent fixed z-50 w-full border-opacity-25 text-white py-6 m-0">
      <h1 className="text-2xl font-extrabold text-orange-600">nufy</h1>

      <BiMenu size={30} className=" md:hidden m-0" />
      <ul className="hidden md:flex  justify-around w-1/2">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li
          className="flex"
          onClick={() => setisopen((curr) => (curr ? false : true))}
        >
          categories {isopen ? <GoChevronUp /> : <GoChevronDown />}{" "}
        </li>
        <li>genres</li>
        <li>new release</li>
        <li>coming soon</li>
        <li>signin</li>
        <li>
          <span className="bg-orange-600 p-2 rounded-xl">signUp</span>
        </li>
        <li
          className=" text-black dark:text-white"
          onClick={() =>
            setTheme((curr) => (curr === "light" ? "dark" : "light"))
          }
        >
          {theme === "light" ? <BsSun size={20} /> : <BiMoon size={20} />}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
