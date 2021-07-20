import React, { useRef, useEffect} from 'react';
import mapboxgl from 'mapbox-gl';

import {useMap} from "./MapContext";

import {aus_states} from "./data/aus_states";
import {MB_KEY} from "./config";

const Map = (props) => {


    const mapContainerRef = useRef(null);
    const [, setMap] = useMap(null);

    // Initialize map when component mounts
    useEffect(() => {

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            accessToken: MB_KEY,
            style: {
                version: 8,
                name: "BlankMap",
                sources: {},
                layers: [],

            },
            center: [147, -34],
            zoom: 5
        });

        map.on('load', () => {

            map.addSource('states', {
                'type': 'geojson',
                'data': aus_states
            });

            map.addLayer({
                'id': 'state_fill',
                'type': 'fill',
                'source': 'states',
                'paint': {
                    'fill-color': 'rgba(119,119,119,0.56)',
                },
                'filter': ['==', ['get', 'name'], 'New South Wales']
            });

            map.addLayer({
                'id': 'state_line',
                'type': 'line',
                'source': 'states',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': 'rgba(119,119,119,0.56)',
                    'line-width': 1
                },
            });

            // Last thing...
            setMap(map);

            props.loaded();
        });

        // Clean up on unmount
        return () => map.remove();
    }, [setMap]);

    return (
        <div>
            <div ref={mapContainerRef} className='map-container' />
        </div>

    );
};

export default Map;
