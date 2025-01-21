import React from "react";
import { BiServer } from "react-icons/bi";
import { BsGear } from "react-icons/bs";

function Loader() {
  return (
    <div className=" h-screen w-screen  flex bg-gradient-to-tr from-neutral-800  to-neutral-700">
      <div className="h-max w-max">
        <div className="flex mb-7">
          <BsGear size={30} className=" animate-spin " />
          <span className="h-[2px] w-[80%]  bg-black dark:bg-white animate-pulse"></span>
          <BiServer size={30} />
        </div>
        <span> loading data please wait ...</span>
      </div>
    </div>
  );
}

export default Loader;
