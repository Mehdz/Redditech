import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {clearToken, setUserLoggedOut} from '../../reducers/Actions/Auth';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

const AccountButton = props => {
    const dispatch = useDispatch();

    return (
        <View style={styles.containerUserSettings}>
            <Button
                icon="account-cog"
                mode="outlined"
                style={{flex: 0.95}}
                onPress={() => {
                    props.navigation.navigate('Settings');
                }}>
                Settings
            </Button>
            <Button
                icon="logout"
                mode="outlined"
                onPress={() => {
                    dispatch(clearToken());
                    dispatch(setUserLoggedOut());
                }}>
                Logout
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    containerUserSettings: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between',
    },
});

AccountButton.propTypes = {
    data: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};

export default AccountButton;
