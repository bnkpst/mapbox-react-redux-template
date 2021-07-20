
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

import {useMap} from "../MapContext";
import {useEffect, useLayoutEffect, useState} from "react";

const drawOptions = {
    displayControlsDefault: false,
    // modes: modes,
    // styles: [
    //     {
    //         id: 'gl-draw-polygon-fill-inactive',
    //         type: 'fill',
    //         paint: {
    //             'fill-color': '#d73f3f',
    //             'fill-opacity': 0.3,
    //         },
    //     },
    //     {
    //         id: 'gl-draw-polygon-line-inactive',
    //         type: 'line',
    //         paint: {
    //             'line-color': '#d73f3f',
    //             'line-dasharray': [2, 2],
    //             'line-width': 2,
    //             'line-opacity': 0.7,
    //         },
    //     },
    // ],
};

const Drawing = () => {

    const [map] = useMap();
    const [draw, setDraw] = useState(new MapboxDraw(drawOptions));
    const [clicks, setClicks] = useState(0);

    const [drawing, setDrawing] = useState(false);

    useLayoutEffect(() => {

        console.log('In here');

        map.addControl(draw);

        map.on('draw.create', (e) => {
            console.log(e)
        })
    }, []);

    const handleMouseDown = () => {
        if(drawing) {
            setClicks((prevClicks) => {return prevClicks + 1});
            console.log('A mousedown event has occurred.');

        }


    }

    const loadLine = (data) => {
        console.log(data);

        const ends = data.features[0].geometry.coordinates;

        const points = ends.map(point => {
            return(    {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Point",
                    "coordinates": point,
                }
            })
        });

        data.features.push(points);

        if(map.getSource('track') === undefined) {
            map.addSource('track', {
                'type': 'geojson',
                'data': {type: 'FeatureCollection', features: []},
            });

            map.addLayer({
                'id': 'track',
                'type': 'line',
                'source': 'track',
                'paint': {
                    'line-width': 2,
                    'line-color': '#ea0202'
                },
                // 'filter': ['==', ['get', 'point_type'], 'wpt']
            });

            map.addLayer({
                'id': 'track_touch',
                'type': 'line',
                'source': 'track',
                'paint': {
                    'line-width': 16,
                    'line-color': 'rgba(234,2,2,0)'
                },
                // 'filter': ['==', ['get', 'point_type'], 'wpt']
            });

            map.addLayer({
                'id': 'ends',
                'type': 'circle',
                'source': 'track',
                'paint': {
                    'circle-radius': 10,
                    'circle-color': '#02ea07'
                },
                // 'filter': ['==', ['get', 'point_type'], 'wpt']
            });
        }

        map.getSource('track').setData(data);

        map.on('mouseenter', 'track_touch', () => {
            map.setPaintProperty('track', 'line-color', '#3bb2d0');
            map.getCanvas().style.cursor = 'move';
        });

        map.on('mouseleave', 'track_touch', () => {
            map.setPaintProperty('track', 'line-color', '#ea0202');
            map.getCanvas().style.cursor = '';
        });

        map.on('mouseenter', 'ends', () => {
            map.setPaintProperty('ends', 'circle-color', '#ba3bd0');
            map.getCanvas().style.cursor = 'move';
        });

        map.on('mouseleave', 'ends', () => {
            map.setPaintProperty('ends', 'circle-color', '#02ea07');
            map.getCanvas().style.cursor = '';
        });






    }

    useEffect(() => {

        if(drawing) {
            setClicks(0);
            console.log('Drawing On.')
            draw.changeMode('draw_line_string');
            map.on('click', handleMouseDown);
        }
        else {
            setClicks(0);
            console.log('Drawing off.')
            draw.changeMode('simple_select');
            map.off('mousedown', handleMouseDown);
        }
    }, [drawing]);

    useEffect(() => {
        if(drawing && clicks > 1) {
            console.log('Clicks: ', clicks);

            const points = draw.getAll()

            draw.deleteAll();

            loadLine(points);

            draw.changeMode('simple_select');
            setClicks(0);
            setDrawing(false);
        }
    }, [clicks])


    const handleClick = () => {
        console.log('Drawing!!!');
        setDrawing(!drawing);
    }


    return(
        <div>
            <button className='btn btn--stroke' onClick={handleClick}>{drawing ? 'Clear' : 'Draw'}</button>
        </div>
    )
}

export default Drawing;