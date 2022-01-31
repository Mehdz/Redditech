import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, List} from 'react-native-paper';
import PropTypes from 'prop-types';

const getAvatar = avatar => {
    if (avatar && avatar.includes('https://')) {
        return avatar;
    } else
        return 'https://www.redditstatic.com/avatars/avatar_default_08_C18D42.png';
};
const AccountListSubreddit = data => {
    return (
        <View>
            {data && data.data && data.data.url && (
                <List.Item
                    title={data.data.url}
                    description={data.data.title}
                    titleStyle={styles.titleStyle}
                    left={props => (
                        <Avatar.Image
                            {...props}
                            size={70}
                            source={{
                                uri: getAvatar(data.data.icon_img),
                            }}
                        />
                    )}
                />
            )}
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

AccountListSubreddit.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountListSubreddit;
