import { useEffect, useRef, useState } from "react";
import "./index.css";
import { Button } from "./components/ui/button";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import StickyHeaderTableDemo from "./components/shadcn-studio/table/table-10";
import ContactUSFormDemo from "./components/shadcn-studio/form/form-10";
import { Toaster } from "./components/ui/sonner";
import IncidentForm from "./components/shadcn-studio/dialog/dialog-24";
function PageHeader({ setIsOpen }) {
  return (
    <div className="flex justify-between px-4 py-4">
      <div className="flex items-center">
        <img src="src/assets/hararehub-logo.png" className="w-10" />
        <h1 className="text-white text-lg font-semibold">HarareHub</h1>
      </div>
      <IncidentForm />
    </div>
  );
}

function MapAndRecents() {
  return (
    <div className="px-4 flex gap-4 h-[50vh]">
      <div className="bg-white/15 w-1/3 px-5 py-5 rounded-sm backdrop-blur-lg border border-white/20 shadow-lg">
        <h2 className=" text-white">Recent Incidents</h2>
      </div>
      <MapContainer
        center={[-17.8248, 31.053]}
        zoom={12}
        scrollWheelZoom={false}
        className="h-full w-2/3 z-[0]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[-17.8248, 31.053]}></Marker>
      </MapContainer>
    </div>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);

  return (
    <div className="bg-gradient-to-b from-custom-blue-gray to-gray-300 h-fit">
      <PageHeader />
      <MapAndRecents />
      <div className="w-full px-4 py-4 flex gap-4">
        <div className="w-1/3 grid grid-cols-2 gap-4 justify-center items-center *:px-4 *:py-4">
          <div className="w-full aspect-3/2 bg-white/15 rounded-sm backdrop-blur-lg border border-white/20 shadow-lg ">
            <h3>High Severity incidents</h3>
          </div>
          <div className="w-full aspect-3/2 bg-white/15 rounded-sm backdrop-blur-lg border border-white/20 shadow-lg">
            <h3>Total Incidents (24h)</h3>
          </div>
          <div className="w-full aspect-3/2 bg-white/15 rounded-sm backdrop-blur-lg border border-white/20 shadow-lg">
            <h3>Incidents Resolved</h3>
          </div>
          <div className="w-full aspect-3/2 bg-white/15 rounded-sm backdrop-blur-lg border border-white/20 shadow-lg">
            <h3>Top Incident Category</h3>
          </div>
        </div>
        <div className="w-2/3 bg-white/15 rounded-sm backdrop-blur-lg border border-white/20 shadow-lg h-full">
          <StickyHeaderTableDemo />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
