import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const Loading = () => {
    return (
        <ActivityIndicator
            style={styles.containerActIndicator}
            size={45}
            animating={true}
        />
    );
};

const styles = StyleSheet.create({
    containerActIndicator: {
        marginTop: 50,
        flex: 1,
    },
});

export default Loading;
