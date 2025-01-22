import React, { useContext, useState } from "react";
import { BiMenu, BiMoon } from "react-icons/bi";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { Link } from "react-router-dom";
import { Theme_context } from "../utils/themeContext";
import { BsSun, BsX } from "react-icons/bs";

function Nav() {
  const [isopen, setisopen] = useState(false);
  const { theme, setTheme } = useContext(Theme_context);

  return (
    <nav className="fixed w-full block  md:flex z-50 py-5 justify-around m-0 bg-white dark:bg-black md:bg-transparent dark:md:bg-transparent ">
      <div className=" flex w-full md:w-min justify-between px-8 m-0  ">
        <h1 className="text-2xl font-extrabold text-yellow-600 ">nufy</h1>
        <div
          onClick={() => setisopen((curr) => (curr ? false : true))}
          className=" md:hidden m-0"
        >
          {isopen ? <BsX size={30} /> : <BiMenu size={30} />}
        </div>
      </div>
      <ul
        className={`bg-white dark:bg-black md:bg-transparent dark:md:bg-transparent z-40 flex flex-col md:flex-row md:gap-7 md:h-min transform duration-500 ${
          isopen
            ? " translate-x-0 h-screen"
            : "duration-300 -translate-x-full md:translate-x-0 h-0 "
        }`}
      >
        <li className=" my-5">
          <Link to="/">Home</Link>
        </li>
        <li className="flex my-5"> categories</li>
        <li className=" my-5">genres</li>
        <li className=" my-5">new release</li>
        <li className=" my-5">coming soon</li>
        <li className=" my-5">signin</li>
        <li className=" my-5">
          <span className="bg-orange-600 p-2 rounded-xl">signUp</span>
        </li>
        <li
          className=" text-black dark:text-white my-5"
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
