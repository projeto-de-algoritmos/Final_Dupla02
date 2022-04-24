import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = (props) => {
    return (
        <MapContainer center={[51.54,-0.118092]} zoom={11} scrollWheelZoom={true}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {props.londonGraph.map(station => (
                <Marker
                    key={station.id}
                    position={[
                        station.latitude,
                        station.longitude
                    ]}
                >
                    <Popup>
                        {station.name}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}

export default Map;