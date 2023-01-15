import { useState } from "react";
import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";

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

export const GoogleMapsProviderUbilabs = ({
  handleOnClickMap,
  publicToiletsMarkers,
}: MapProps) => {
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);

  const addMarkers = (map: google.maps.Map) => {
    const tree = [
      { lat: 49.8132793, lng: 19.3885883 },
      { lat: 49.614939, lng: 19.6628451 },
      { lat: 49.7598516, lng: 19.4519336 },
    ];
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
    console.log(publicToiletsMarkers, "publicToiletsMarkers");
    if (publicToiletsMarkers) {
      addMarkers(map);
    }
  };

  return (
    <GoogleMapsProvider
      googleMapsAPIKey={GOOGLE_API_KEY}
      mapOptions={{ zoom: 12, center: defaultCenter }}
      mapContainer={mapContainer}
      onLoadMap={onMapLoad}
    >
      <div ref={(node) => setMapContainer(node)} style={{ height: "500px" }} />
    </GoogleMapsProvider>
  );
};
