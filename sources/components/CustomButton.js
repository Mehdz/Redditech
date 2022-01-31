import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';

const CustomButton = props => {
    return (
        <View style={[styles.container, props.style]}>
            <TouchableOpacity style={styles.button} onPress={props.onPress}>
                <LinearGradient
                    colors={['#FFA900', '#FF7600', '#CD113B']}
                    style={styles.gradient}>
                    <Text style={styles.text}>{props.title}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    button: {
        width: '90%',
        height: 45,
    },
    text: {
        color: 'white',
        fontSize: 16,
        textTransform: 'uppercase',
    },
});

CustomButton.propTypes = {
    title: PropTypes.string.isRequired,
    style: PropTypes.object,
    onPress: PropTypes.func,
};

export default CustomButton;
