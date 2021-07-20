import React from 'react';

import Map from './Map';
import Sidebar from "./components/Sidebar";

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

    return (
        <div>
            <div className='lr-container'>
                <div className='left-side'>
                    <Sidebar title='TSP'>
                        {/*{sample_div_list(9)}*/}
                    </Sidebar>
                </div>
                <div className='right-side'>
                    <Map></Map>
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
