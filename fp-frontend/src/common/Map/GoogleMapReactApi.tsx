import { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import { GOOGLE_API_KEY } from "../../constants";

export type MarkerType = {
  lat: number;
  lng: number;
};

const defaultCenter: MarkerType = {
  lat: 49.8132793,
  lng: 19.3885883,
};

type MapProps = {
  handleOnClickMap: (e: MarkerType) => void;
};

export const GoogleMapReactApi = ({ handleOnClickMap }: MapProps) => {
  const [marker, setMarker] = useState<MarkerType>();
  const [center, setCenter] = useState(defaultCenter);
  const [mapContainer, setMapContainer] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
  });

  const handleMap = (e: google.maps.MapMouseEvent) => {
    if (e && e.latLng) {
      const marker: MarkerType = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      setMarker(marker);
      setCenter(marker);
      handleOnClickMap(marker);
      if (mapContainer) {
        //@ts-ignore
        mapContainer.setZoom(14);
      }
    }
  };

  const onLoadMap = (e: google.maps.Map) => {
    //@ts-ignore
    setMapContainer(e);
  };

  return isLoaded ? (
    <GoogleMap
      zoom={12}
      center={center}
      mapContainerStyle={{ width: "100%", height: "500px" }}
      onClick={handleMap}
      onLoad={onLoadMap}
    >
      {marker ? <Marker position={marker} /> : null}
    </GoogleMap>
  ) : null;
};
