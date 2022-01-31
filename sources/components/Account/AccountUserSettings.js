import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Caption, Switch, Title} from 'react-native-paper';
import {setUserSettings} from '../../reducers/Actions/User.js';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';

const AccountUserSettingsSwitch = props => {
    const dispatch = useDispatch();
    const [isSwitchOn, setIsSwitchOn] = useState(props.value);

    return (
        <View style={styles.container}>
            <View style={styles.containerText}>
                <Title style={styles.text}>{props.text}</Title>
                <Caption style={styles.description}>
                    {props.description}
                </Caption>
            </View>
            <Switch
                value={isSwitchOn}
                onValueChange={() => {
                    dispatch(setUserSettings(props.param, !isSwitchOn));
                    setIsSwitchOn(!isSwitchOn);
                }}
                style={styles.switch}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
    },
    containerText: {
        flex: 1,
    },
    description: {
        paddingRight: 40,
    },
    switch: {
        alignSelf: 'center',
    },
});

AccountUserSettingsSwitch.propTypes = {
    value: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    param: PropTypes.string.isRequired,
};

export default AccountUserSettingsSwitch;
