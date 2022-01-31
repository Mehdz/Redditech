import React from 'react';
import {Image, StyleSheet, Text, SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';
import CustomButton from '../components/CustomButton';
import {setAccessToken} from '../reducers/Actions/Auth';

const Login = () => {
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.desc}>
                Sign in to access your Reddit account, vote on posts, save
                posts, comment and much more !
            </Text>
            <CustomButton
                title="Log with reddit"
                onPress={() => dispatch(setAccessToken())}
                style={styles.button}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    desc: {
        fontSize: 20,
        color: 'grey',
        textAlign: 'center',
        padding: 10,
        paddingTop: 0,
    },
    logo: {
        alignSelf: 'center',
        width: 200,
        height: 300,
    },
    link: {
        fontSize: 20,
        color: '#F74402',
        textAlign: 'center',
    },
    button: {
        paddingBottom: 10,
        paddingTop: 50,
    },
    username: {
        fontSize: 20,
        color: 'grey',
        textAlign: 'center',
        padding: 10,
        paddingTop: 0,
        justifyContent: 'flex-end',
    },
});

export default Login;
