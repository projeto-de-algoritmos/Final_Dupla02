import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline } from 'react-leaflet';

const londonLines = require("../../data/londonLines.json");


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
                >
                    <Popup>
                        {station.name}
                    </Popup>
                </CircleMarker>
            ))}
            {props.pathPairs.map(pair => (
                <Polyline key={pair} positions={[
                    [props.londonGraph[pair[0]].latitude, props.londonGraph[pair[0]].longitude], [props.londonGraph[pair[1]].latitude, props.londonGraph[pair[1]].longitude],
                ]} color={'#161780'}>
                    <Popup>
                        {londonLines[londonLines.findIndex(x => 
                            x.line === props.londonGraph[pair[0]].destinations[props.londonGraph[pair[0]].destinations.findIndex(x => 
                            x.destinationStationId === pair[1])].line)].name}
                    </Popup>
                </Polyline>

            ))}

        </MapContainer>
    )
}

export default Map;