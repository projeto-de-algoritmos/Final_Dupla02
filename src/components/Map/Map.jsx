import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = (props) => {
    return (
        <MapContainer center={[51.54,-0.18]} zoom={10.8} scrollWheelZoom={true}>
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
                    color="red"
                    // eventHandlers={{ click: () => props.handleStation(station) }}
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