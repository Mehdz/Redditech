import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Title, Caption} from 'react-native-paper';
import {PropTypes} from 'prop-types';

const AccountUserInfo = ({data}) => {
    return (
        <View style={styles.containerUserInfo}>
            <Title style={styles.username}>{data && data.name}</Title>
            <Caption style={styles.bio}>
                {data && data.subreddit && data.subreddit.public_description}
            </Caption>
        </View>
    );
};

const styles = StyleSheet.create({
    containerUserInfo: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
    },
    username: {
        fontSize: 20,
        color: '#fe4500',
    },
    bio: {
        fontSize: 15,
    },
});

AccountUserInfo.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountUserInfo;
