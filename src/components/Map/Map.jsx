import React, { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';

const Map = (props) => {
    return (
        <MapContainer center={[51.54,-0.18]} zoom={10.8} scrollWheelZoom={true}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {props.londonGraph.map(station => (
                <CircleMarker
                    key={station.id}
                    center={[
                        station.latitude,
                        station.longitude
                    ]}
                    radius={7}
                    color="blue"
                    className="markers"
                    // eventHandlers={{ click: () => props.handleStation(station) }}
                >
                    <Popup>
                        {station.name}
                    </Popup>
                </CircleMarker>
            ))}
        </MapContainer>
    )
}

export default Map;