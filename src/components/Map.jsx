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
  const [month , setMonth]=useState("");
  const [day , setDay]=useState("");
  const[result  , setResult]=useState("");
  const { alert, dispatch } = useAlertContext();
  const{latitude , longitude , time}=alert&&alert[0]

  console.log("this is alert", latitude , longitude , time);

  useEffect(() => {
    const fetchAlert = async () => {
      const response = await fetch("/api/alert", {
        method: "GET",
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_ALERT", payload: json });
      }
    };
    fetchAlert();

    const date = new Date(time);
  const month = date.getMonth() + 1; // getMonth() returns a 0-based month, so we add 1
  const day = date.getDate();

  setMonth(month);
  setDay(day);
  }, []);

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
        center={ [latitude, longitude]}
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
      <div className="mt-4 flex-col p-4">
      <div>
      <label htmlFor="Latitude">Latitude</label>
      <input
        type="text"
        value={latitude}
        className="border-2 border-neutral-700 ml-2"
      />
      <label htmlFor="longitude" className="ml-2">Longitude</label>
      <input
        type="text"
        value={longitude}
        className="border-2 border-neutral-700 ml-2"
      />
      </div>

      <div className="mt-4">
      <label htmlFor="month">month</label>
      <input
        type="number"
        value={month}
        className="border-2 border-neutral-700 ml-2"
        onChange={(e)=>setMonth(e.target.value)}
      />
      <label htmlFor="day" className="ml-2">day</label>
      <input
        type="number"
        value={day}
        className="border-2 border-neutral-700 ml-2"
        onChange={(e)=>setDay(e.target.value)}

      />
      </div>
      
      
      </div>

      <Predict latitude={latitude} longitude={longitude} month={month} day={day} setResult={setResult}/>
          </div>
  );
};

export default Map;