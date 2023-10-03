import React, { useCallback } from "react";
import * as Styled from "./styles";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import isMobile from "is-mobile";
import { TLatLon } from "../../service/module/login";
interface Props {
  localization: TLatLon;
  setLocalization: Function;
}
const MapComponent: React.FC<Props> = ({ localization, setLocalization }) => {
  const center = { lat: -16.70815152031995, lng: -49.28054981412227 };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY!,
  });

  const onLoad = useCallback(
    (map: any) => {
      map?.setZoom(localization.lat === 0 ? 5 : 6);
      new window.google.maps.LatLngBounds(
        localization.lat === 0 ? center : localization
      );
      let infoWindow = new google.maps.InfoWindow();
      map.addListener("click", (e: google.maps.MapMouseEvent) => {
        infoWindow.close();
        infoWindow = new google.maps.InfoWindow({
          position: e.latLng,
        });
        const { lat, lng } = e.latLng!.toJSON();
        setLocalization({ lat, lng });
        infoWindow.setContent("É aqui?");
        infoWindow.open(map);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <Styled.PlansDetailModal>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          Clique no mapa para salvar onde é a localização.
          <div className="map-container">
            {isLoaded && (
              <GoogleMap
                onClick={(e) => {
                  const { lat, lng } = e.latLng!.toJSON();
                  setLocalization({ lat, lng });
                }}
                mapContainerStyle={{
                  height: isMobile() ? 800 : 400,
                  width: isMobile() ? 400 : 700,
                }}
                center={localization}
                onLoad={onLoad}
              />
            )}
          </div>
        </div>
      </Styled.PlansDetailModal>
    </>
  );
};

export default MapComponent;
