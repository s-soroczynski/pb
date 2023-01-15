import { Box } from "@mui/material";
import { memo, ReactNode } from "react";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import { leafletStyles } from "./styles";

type LeafletMapProps = {
  center?: LatLngExpression[];
  children: ReactNode;
};

export const LeafletMap = memo((props: LeafletMapProps) => {
  const defaultCenter: LatLngExpression = [49.8132793, 19.3885883];
  return (
    <Box sx={leafletStyles.box}>
      <MapContainer
        style={{ width: "900px", height: "450px" }}
        center={defaultCenter}
        zoom={14}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
        />
        {props.children}
      </MapContainer>
    </Box>
  );
});
