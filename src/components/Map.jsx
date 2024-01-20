import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Predict from "../Modal/Predict";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Map = () => {
  const [latlng, setLatlng] = useState({ lat: 0, lng: 0 });
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [result, setResult] = useState("");

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
    height: "100vh",
  };

  let circleStyles;
  let circles;

  if (result === "2") {
    circles = [{ latitude: latlng.lat, longitude: latlng.lng, radius: 10000 }];

    circleStyles = {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
    };
  } else if (result === "1") {
    circles = [{ latitude: latlng.lat, longitude: latlng.lng, radius: 10000 }];
    circleStyles = {
      color: "yellow",
      fillColor: "yellow", // Set to yellow color
      fillOpacity: 0.2,
    };
  } else {
    circles = [];
    circleStyles = {};
  }

  // Function to handle circle click event
  const handleCircleClick = (e, circleData) => {
    const curPos = e.latlng;
    alert(
      `Clicked on circle with radius ${circleData.radius} at: ${curPos.lat} : ${curPos.lng}`
    );
  };

  return (
    <div>
      <MapContainer
        center={[28.3949, 84.124]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ mapStyles}}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetmap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latlng.lat, latlng.lng]}>
          <Popup position={[latlng.lat, latlng.lng]}>
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
          ></Circle>
        ))}

        <LocationFinderDummy />
      </MapContainer>
      {/* <div className="mt-4 flex-col p-4">
      <div>
      <label htmlFor="Latitude">Latitude</label>
      <input
        type="text"
        value={latlng.lat}
        className="border-2 border-neutral-700 ml-2"
      />
      <label htmlFor="longitude" className="ml-2">Longitude</label>
      <input
        type="text"
        value={latlng.lng}
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
      
      
      </div> */}

      <Predict
        latitude={latlng.lat}
        longitude={latlng.lng}
        month={month}
        day={day}
        setResult={setResult}
      />
    </div>
  );
};

export default Map;
