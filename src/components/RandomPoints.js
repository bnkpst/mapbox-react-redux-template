
import React, {useEffect, useState} from "react";
import {useMap} from "../MapContext";
import {Slider} from "./Slider";

import {makePoints} from "../utility/geo_utility";

const ControlContainer = (props) => {
    return(
        <div className='flex flex--row flex--space-between-main px12 py12 mb6 mx6 txt-s '>
            {props.children}
        </div>)
}

export const RandomPoints = () => {

    const [map] = useMap();
    const [points, setPoints] = useState([]);
    const [numPoints, setNumPoints] = useState(5);


    const clickHandler = () => {
        setPoints(makePoints(numPoints));
    }

    const addToMap = (map, data) => {

        const geo = {
            type: 'FeatureCollection',
            features: [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "LineString",
                        "coordinates": data,
                    }
                }
            ]
        }

        if(map.getSource('points') === undefined) {
            map.addSource('points', {
                'type': 'geojson',
                'data': geo,
            });

            map.addLayer({
                'id': 'point',
                'type': 'circle',
                'source': 'points',
                'paint': {
                    'circle-radius': 3,
                    'circle-color': '#0257ea'
                },
            });

            map.addLayer({
                'id': 'line',
                'type': 'line',
                'source': 'points',
                'paint': {

                    'line-color': '#0257ea'
                },
            });
        }
        else {
            map.getSource('points').setData(geo);
        }
    }

    const sliderCB = (num) => {
        setNumPoints(num);
        setPoints(makePoints(num));
    }


    useEffect(() => {
        console.log(points);

        addToMap(map, points);
    }, [points]);

    return(
        <div>
            <ControlContainer>
                <Slider name='Num points' max={50} min={2} default_num={5} cb={sliderCB} ></Slider>
                <button className='btn btn--stroke mr12' onClick={clickHandler}>New Points</button>
            </ControlContainer>
        </div>
    )
}

export default RandomPoints;
