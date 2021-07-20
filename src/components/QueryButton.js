
import {useMap} from "../MapContext";

const QueryButton = () => {

    const [map] = useMap();

    const handleClick = () => {

        console.log('Click');

        const point = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    149.1943359375,
                    -33.35806161277886
                ]
            }
        }


        if(!map){
            console.log('Map not init in Query??!!');
            return
        }

        if(map.getSource('query') === undefined) {
            map.addSource('query', {
                'type': 'geojson',
                'data': {type: 'FeatureCollection', features: []},
            });

            map.addLayer({
                'id': 'query',
                'type': 'circle',
                'source': 'query',
                'paint': {
                    'circle-radius': 4,
                    'circle-color': '#02ea07'
                },
                // 'filter': ['==', ['get', 'point_type'], 'wpt']
            });
        }

        map.getSource('query').setData(point);

        console.log(map.queryRenderedFeatures({layers: ['query']}));

    }

    return(
        <button className='btn btn--stroke' onClick={handleClick}>Query</button>
    )
}

export default QueryButton;
