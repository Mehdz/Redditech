import React from 'react';
import Navigation from './sources/screens/Navigation';
import {Provider} from 'react-redux';
import {Store} from './sources/reducers/Store';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#fe4500',
        accent: '#fe4500',
    },
};

function App() {
    return (
        <Provider store={Store}>
            <PaperProvider theme={theme}>
                <Navigation />
            </PaperProvider>
        </Provider>
    );
}

export default App;
