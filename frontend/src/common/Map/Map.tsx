import { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import { GOOGLE_API_KEY } from "../../constants";
import {
  SuperClusterAlgorithm,
  MarkerClusterer,
} from "@googlemaps/markerclusterer";

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
  publicToiletsMarkers?: MarkerType[];
};

export const Map = ({ handleOnClickMap, publicToiletsMarkers }: MapProps) => {
  const [zoom, setZoom] = useState(12);
  const [marker, setMarker] = useState<MarkerType>();
  const [center, setCenter] = useState(defaultCenter);
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
  });

  const handleMap = (e: google.maps.MapMouseEvent) => {
    if (e && e.latLng) {
      const marker: MarkerType = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      setMarker(marker);
      setCenter(marker);
      handleOnClickMap(marker);
      setZoom(14);
    }
  };
  const tree = [
    { lat: 49.8132793, lng: 19.3885883 },
    { lat: 49.614939, lng: 19.6628451 },
    { lat: 49.7598516, lng: 19.4519336 },
  ];

  const addMarkers = (map: google.maps.Map) => {
    const markers = tree.map(({ lat, lng }) => {
      const marker = new google.maps.Marker({ position: { lat, lng } });
      return marker;
    });

    new MarkerClusterer({
      markers,
      map,
      algorithm: new SuperClusterAlgorithm({ radius: 200 }),
    });
  };

  const onMapLoad = (map: google.maps.Map) => {
    if (publicToiletsMarkers) {
      addMarkers(map);
    }
    //@ts-ignore
    console.log(map.getZoom(), "zoomm");
  };

  return isLoaded ? (
    <GoogleMap
      zoom={zoom}
      center={center}
      mapContainerStyle={{ width: "100%", height: "500px" }}
      onClick={handleMap}
      onZoomChanged={() => {}}
      onLoad={onMapLoad}
    >
      {marker ? <Marker position={marker} /> : null}
    </GoogleMap>
  ) : null;
};
