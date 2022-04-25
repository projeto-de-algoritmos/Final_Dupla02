import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline } from 'react-leaflet';

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
                        {station.name}<br/>
                        id:{station.id}
                    </Popup>
                </CircleMarker>
            ))}
            {props.pathPairs.map(pair => (
                <Polyline key={pair} positions={[
                        [props.londonGraph[pair[0]].latitude, props.londonGraph[pair[0]].longitude], [props.londonGraph[pair[1]].latitude, props.londonGraph[pair[1]].longitude],
                    ]} color={'#161780'} />

            ))}

        </MapContainer>
    )
}

export default Map;