import React from 'react';
import ReactDOM from 'react-dom';

import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';

import {MapProvider} from "./MapContext";
import App from './App';


ReactDOM.render(
    <React.StrictMode>
        <MapProvider>
            <App />
        </MapProvider>

    </React.StrictMode>,
    document.getElementById('root')
);