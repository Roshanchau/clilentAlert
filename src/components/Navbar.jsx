import React from "react";
import { IoMdNotifications } from "react-icons/io";

const Navbar = ({count ,alert }) => {
  console.log(alert)
  return (
    <>
    <div className="justify-center items-center col-span-3 ">
    <header className="">
        <nav className="flex flex-row  justify-between  p-6  ">
          {/* logo */}
          <div className="">
            <h1 className="text-2xl">Alert</h1>
          </div>
          {/* list */}
          <div className="flex flex-row  justify-center">
                <div className="relative">
                <IoMdNotifications className="text-4xl text-yellow-400"/>
                <div className="absolute left-5 -top-2 text-sm h-6 w-6 justify-center items-center flex rounded-full bg-black text-neutral-100">
                  {count}
                </div>
                </div>
          </div>
        </nav>
      </header>
      <div className=" p-8 border-r-2 m-3 ">
        {alert?.slice(0, 7).map((item)=>{
            const contansFire = item.alert.includes('fire');
            const containsAnimal = item.alert.includes('animal');
            const containsDef = item.alert.includes('deforestation');
          return(
            <div index={item.div} className=" mt-4 flex flex-col justify-center items-center rounded-lg ">
              <div className="flex justify-center items-center gap-4">
              {contansFire&& <span>🔥</span>}
              {containsAnimal&& <span>🐼</span>}
              {containsDef&& <span>🪓</span>}
              {item.alert}
              </div>
              <hr className="border-b-1 text-neutral-900 w-[90%] mt-4" />
            </div>
          )
        })}
      </div>
    </div>
     
    </>
  );
};

export default Navbar;
