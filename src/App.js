import React from 'react';
// import Map from './Map';
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
        <div className='app-container'>
            <div className='lr-container'>
                <div className='left-side'>
                    Left
                </div>
                <div className='right-side'>
                    Right
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
