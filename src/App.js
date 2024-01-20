import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Map from "./components/Map";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAlertContext from "./hooks/useAlertContext";

const App = () => {
  // Your frontend component
  const [messages, setMessages] = useState("");
  const{alert,dispatch}=useAlertContext();
  console.log(alert)

  useEffect(() => {
    const fetchAlert = async () => {
      const response = await fetch("/api/alert", {
        method: "GET",
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_ALERT", payload: json });
        setMessages(json[0].alert);
      }
    };
    fetchAlert();
    notify();
  }, []);
  const notify = () => toast(messages);

  const sendSMS = async () => {
    const response = await fetch("/api/sendSMS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "+9779808846298", // Replace with the recipient's phone number
        message: messages,
      }),
    });

    const data = await response.json();

    if (data.success) {
      console.log("SMS sent successfully");
    } else {
      console.error(`Failed to send SMS: ${data.error}`);
    }
  };
  // const makeCall = async () => {
  //   try {
  //     const response = await fetch('/api/makeCall', {
  //       method: 'POST',
  //     });

  //     const data = await response.json();

  //     if (data.success) {
  //       console.log(`Phone call initiated. Call SID: ${data.callSid}`);
  //     } else {
  //       console.error(`Failed to make phone call: ${data.error}`);
  //     }
  //   } catch (error:any) {
  //     console.error('Failed to make phone call:', error.message);
  //   }
  // };

  return (
    <>
      <div>
        <Navbar  />
        <div className="grid grid-cols-2">
          <Map />
          <div className=" flex flex-col justify-center items-center">
            <h2 className="mb-4 text-5xl font-semibold text-red-800">Warning!!</h2>
            <h1 className="text-4xl bg-red-700 p-10 w-[80%] text-neutral-100 flex justify-center items-center">
              {messages}
            </h1>
            <button onClick={sendSMS} className="mt-4 bg-neutral-900 text-neutral-100 px-6 py-3 rounded-lg">send sms</button>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5001}
        />
      </div>
    </>
  );
};

export default App;
