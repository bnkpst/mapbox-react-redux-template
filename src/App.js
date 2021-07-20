import React, {useState} from 'react';

import Map from './Map';
import Sidebar from "./components/Sidebar";
import RandomPoints from "./components/RandomPoints";
import QueryButton from "./components/QueryButton";
import Drawing from "./components/Drawing";
// import {sample_div_list} from "./utility";

// import { Provider } from 'react-redux';
// import { store } from './redux/store';
// import { connect } from 'react-redux';

// const ConnectedMap = connect(mapStateToProps)(Map);

// function mapStateToProps(state) {
//     return {
//         data: state.data,
//         active: state.active
//     };
// }

const App = () => {

    const [mapReady, setMapReady] = useState(false);

    const mapLoaded = () => {
        console.log('We are ready');
        setMapReady(true);
    }

    return (
        <div>
            <div className='lr-container'>
                <div className='left-side'>
                    <Sidebar title='TSP'>
                        {
                            mapReady ?
                                // <QueryButton></QueryButton>
                                // <Drawing></Drawing>
                                <RandomPoints></RandomPoints>
                            :
                            <div>Loading...</div>
                        }

                    </Sidebar>
                </div>
                <div className='right-side'>
                    <Map loaded={mapLoaded}></Map>
                </div>
            </div>
        </div>
        // <Provider store={store}>
        //     <div>
        //         <ConnectedMap />
        //     </div>
        // </Provider>
    );
}

export default App;
