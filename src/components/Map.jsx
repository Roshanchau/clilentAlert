import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,useMapEvents
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Predict from "../Modal/Predict";
import useAlertContext from "../hooks/useAlertContext";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Map = () => {
  const [latlng ,setLatlng]=useState({lat:0  , lng:0})
  const[data, setData]=useState({})
  const [month , setMonth]=useState("");
  const [day , setDay]=useState("");
  const[result  , setResult]=useState("");
  const {  dispatch } = useAlertContext();
  console.log("last",data[0])
  const{latitude , longitude ,time}=data[0]||{latitude:0 , longitude:0}
  console.log(latitude , longitude ,time)

  useEffect(() => {
    const date = new Date(time);
    const month = date.getMonth() + 1; // getMonth() returns a 0-based month, so we add 1
    const day = date.getDate();
  
    setMonth(month);
    setDay(day);
  },[day , month , time]);

  useEffect(() => {
    const fetchAlert = async () => {
      const response = await fetch("/api/alert", {
        method: "GET",
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_ALERT", payload: json });
        setData(json)
      }
    };
    
    fetchAlert();
  }, [dispatch]);

  const handleLatChange = (e) => {
    setLatlng({ ...latlng, lat: e.target.value });
  };

  const handleLngChange = (e) => {
    setLatlng({ ...latlng, lng: e.target.value });
  };


  const LocationFinderDummy = () => {
    const map = useMapEvents({
        click(e) {
            console.log(e.latlng);
            setLatlng(e.latlng);
        },
    });
    // map.addLayer(TileLayer)
    return null;
};
  const mapStyles = {
    width: "100%",
    height: "500px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  let circleStyles;
let circles;

if (result && result.prediction[0] === 2) {
  // Render red circle
  circles = [{ latitude: latitude, longitude: longitude, radius: 10000 }];
  circleStyles = {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
  };
} else if (result && result.prediction[0] === 1) {
  // Render yellow circle
  circles = [{ latitude: latitude, longitude: longitude, radius: 10000 }];
  circleStyles = {
    color: "yellow",
    fillColor: "yellow",
    fillOpacity: 0.2,
  };
} else {
  // No circle to render
  circles = [];
  circleStyles = {};
}
  
  // Function to handle circle click event
  const handleCircleClick = (e, circleData) => {
    const curPos = e.latlng;
    alert(`Clicked on circle with radius ${circleData.radius} at: ${curPos.lat} : ${curPos.lng}`);
  };

  return (
    <div>
      <MapContainer
        center={ [28.3949, 84.1240]}
        zoom={13}
        scrollWheelZoom={false}
        style={mapStyles}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetmap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup position={[latitude, longitude]}>
            <p>hello</p>
          </Popup>
        </Marker>

        {/* Render circles dynamically */}
        {circles.map((circleData, index) => (
          <Circle
            key={index}
            center={[circleData.latitude, circleData.longitude]}
            pathOptions={circleStyles}
            radius={circleData.radius}
            eventHandlers={{
              click: (e) => handleCircleClick(e, circleData), // Attach click event handler
            }}
          >

          </Circle>
        ))}

<LocationFinderDummy />
      </MapContainer>
      <div className="mt-4 flex justify-evenly p-4 ">
      <div className=" flex flex-col gap-2">
      <label htmlFor="Latitude">Latitude:</label>
      <input
        type="text"
        value={latitude}
        onChange={handleLatChange}
        className="border-2 border-neutral-100 ml-2 text-neutral-800"
      />
      <label htmlFor="longitude" className="">Longitude:</label>
      <input
        type="text"
        value={longitude}
        onChange={handleLngChange}
        className="border-2 border-neutral-100 ml-2 text-neutral-800"
      />
      </div>

      <div className=" flex flex-col gap-2">
      <label htmlFor="month">month:</label>
      <input
        type="number"
        value={month}
        className="border-2 border-neutral-100 ml-2 text-neutral-800"
        onChange={(e)=>setMonth(e.target.value)}
      />
      <label htmlFor="day" className="">day:</label>
      <input
        type="number"
        value={day}
        className="border-2 border-neutral-100 ml-2 text-neutral-800"
        onChange={(e)=>setDay(e.target.value)}

      />
      </div>
      <Predict latitude={latitude} longitude={longitude} month={month} day={day} setResult={setResult}/>
      
      
      </div>

          </div>
  );
};

export default Map;