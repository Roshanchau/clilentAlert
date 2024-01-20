import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Map from "./components/Map";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAlertContext from "./hooks/useAlertContext";

const App = () => {
  // Your frontend component
  const [messages, setMessages] = useState("");
  const { alert, dispatch } = useAlertContext();
  console.log(alert);
  const count = alert.length;
  console.log(count)

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
      <div className="grid main grid-cols-10 h-screen">
        <Navbar count={count} alert={alert} sendSMS={sendSMS} />
        <div className="col-span-7 h-screen">
          <Map />
        </div>
        <ToastContainer position="top-center" />
      </div>
    </>
  );
};

export default App;
