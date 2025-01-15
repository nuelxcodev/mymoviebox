import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { FcDown } from "react-icons/fc";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { Link } from "react-router-dom";

function Nav() {
  const [isopen, setisopen] = useState(false);

  return (
    <nav className="flex justify-around bg-transparent fixed z-50 w-full border-opacity-25 text-white py-6 m-0">
      <h1 className="text-2xl font-extrabold text-orange-600">nufy</h1>

      <BiMenu size={30} className=" md:hidden m-0"/>
      <ul className="hidden md:flex  justify-around w-1/2">
        <li>
          <Link to='/'>Home</Link>
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
      </ul>
    </nav>
  );
}

export default Nav;
