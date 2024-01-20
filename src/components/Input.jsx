// import React, { useEffect ,useState } from "react";
// import useAlertContext from "../hooks/useAlertContext";

// const Input = () => {
//     const [month , setMonth]=useState("");
//     const [day , setDay]=useState("");
//   const { alert, dispatch } = useAlertContext();
//     console.log(alert)
//   useEffect(() => { 
//     let latitude, longitude, time;

// if (alert && alert.length > 0) {
//   ({ latitude, longitude, time } = alert[0]);
// }
// console.log("this is alert", latitude, longitude, time);
// },[])


//   useEffect(() => {
//     const fetchAlert = async () => {
//       const response = await fetch("/api/alert", {
//         method: "GET",
//       });
//       const json = await response.json();
//       console.log(json);
//       if (response.ok) {
//         dispatch({ type: "SET_ALERT", payload: json });
//       }
//     };
//     fetchAlert();

//     const date = new Date(time);
//     const month = date.getMonth() + 1; // getMonth() returns a 0-based month, so we add 1
//     const day = date.getDate();

//     setMonth(month);
//     setDay(day);
//   }, [month, day, time, dispatch]);
//   return (
//     <>
//       <div className=" flex p-4">
//         <div className="flex flex-col justify-center items-start gap-2">
//           <label htmlFor="Latitude">Latitude:</label>
//           <input
//             type="text"
//             value={latitude}
//             className="border-2 border-neutral-700 ml-2 text-center"
//           />
//           <label htmlFor="longitude" className="">
//             Longitude:
//           </label>
//           <input
//             type="text"
//             value={longitude}
//             className="border-2 border-neutral-700 ml-2 text-center"
//           />
//         </div>

//         <div className="flex flex-col ml-4 justify-center items-start gap-2">
//           <label htmlFor="month">month:</label>
//           <input
//             type="number"
//             value={month}
//             className="border-2 border-neutral-700 ml-2 text-center"
//             onChange={(e) => setMonth(e.target.value)}
//           />
//           <label htmlFor="day" className="">
//             day:
//           </label>
//           <input
//             type="number"
//             value={day}
//             className="border-2 border-neutral-700 ml-2 text-center"
//             onChange={(e) => setDay(e.target.value)}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Input;
