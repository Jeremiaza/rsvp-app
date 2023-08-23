import React from "react";
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@mui/icons-material/Room';
import './LocationMap.css';

const Marker = ({ text }) => <div>
  <RoomIcon style={{
    transform: 'translate(-50%, -50%)'
  }} color={'success'} fontSize={'large'}/>
  <div id={'location_marker-text'}>{text}</div>
  </div>;

export default function LocationMap(){
    //TODO: Parametrisoi koordinaatit
  const defaultProps = {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 14
  };
  return (
    <div id={'wedding_location'}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "INSERT KEY HERE" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker
          lat={defaultProps.center.lat}
          lng={defaultProps.center.lng}
          text="Kuninkaankartanontie 31"
        />
      </GoogleMapReact>
    </div>
  );
}