import React from "react";
import { IoIosNotificationsOutline } from "react-icons/io";

const Navbar = ({count}) => {
  return (
    <>
      <header>
        <nav className="flex flex-row items-center  justify-between p-8">
          {/* logo */}
          <div>
            <h1 className="text-2xl">Alert</h1>
          </div>
          {/* list */}
          <div className="flex flex-row items-center justify-center">
            <ul className="flex flex-row gap-6 mr-4">
              <li>Map</li>
              <li>
                <div className="relative">
                <IoIosNotificationsOutline className="text-5xl text-red-600"/>
                <div className="absolute left-7 top-0 text-lg h-6 w-6 justify-center items-center flex rounded-full bg-black text-neutral-100">{count}</div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
