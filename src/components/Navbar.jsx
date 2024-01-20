import React from "react";
import { IoIosNotificationsOutline } from "react-icons/io";

const Navbar = ({count ,alert , sendSMS}) => {
  console.log(alert)
  return (
    <>
    <div className="justify-center items-center col-span-3 h-screen">
    <header className="">
        <nav className="flex flex-row  justify-between  p-10  ">
          {/* logo */}
          <div className="">
            <h1 className="text-2xl">Alert</h1>
          </div>
          {/* list */}
          <div className="flex flex-row  justify-center">
                <div className="relative">
                <IoIosNotificationsOutline className="text-5xl text-red-600"/>
                <div className="absolute left-7 top-0 text-lg h-6 w-6 justify-center items-center flex rounded-full bg-black text-neutral-100">
                  {count}
                </div>
                </div>
          </div>
        </nav>
      </header>
      <div className=" p-10">
        {alert.map((item)=>{
          return(
            <div index={item.div} className="border-2 border-slate-700 border-opacity-50 mt-4 flex justify-center items-center rounded-lg ">
              {item.alert}
            </div>
          )
        })}
      </div>
      <button onClick={sendSMS}>Send SMS</button>
    </div>
     
    </>
  );
};

export default Navbar;
