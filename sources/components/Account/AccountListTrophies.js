import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, List} from 'react-native-paper';
import PropTypes from 'prop-types';

const AccountListTrophies = data => {
    return (
        <View style={styles.container}>
            <List.Item
                title={data.data.name}
                description={data.data.description}
                titleStyle={styles.titleStyle}
                left={props => (
                    <Avatar.Image
                        {...props}
                        size={70}
                        source={{uri: data.data.icon_70}}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 25,
    },
});

AccountListTrophies.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountListTrophies;
