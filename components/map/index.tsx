import { Box } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import { useAppSelector } from "../../redux/hooks";
import { appSelector } from "../../redux/app/app.selectors";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

const icon = L.icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

const Map: FC = () => {
  const { address } = useAppSelector(appSelector);
  const coordinates = address?.coordinates;
  const fullAddress = address?.fullAddress;
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;
    (mapRef.current as any)?.setView(coordinates as any, 20);
  }, [coordinates]);

  return (
    <Box width={800} height={440}>
      <MapContainer
        ref={mapRef}
        center={coordinates as any}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordinates as any} icon={icon}>
          <Popup>{fullAddress}</Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default Map;
