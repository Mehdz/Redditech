import React from 'react';
import {
    Dimensions,
    ImageBackground,
    Platform,
    View,
    StyleSheet,
} from 'react-native';
import {Appbar, Avatar, Caption, Title} from 'react-native-paper';
import PropTypes from 'prop-types';
import FollowButton from './FollowButton';
import {useSelector} from 'react-redux';

const getAvatar = avatar => {
    if (avatar && avatar.includes('https://')) {
        return avatar;
    } else
        return 'https://www.redditstatic.com/avatars/avatar_default_08_C18D42.png';
};

const getBanner = avatar => {
    if (avatar && avatar.includes('https://')) {
        return avatar;
    } else
        return 'https://www.redditstatic.com/avatars/avatar_default_08_C18D42.png';
};

const SubredditProfileHeader = ({data, navigation}) => {
    const {isLogged} = useSelector(state => state.authReducer);

    return (
        <View>
            <ImageBackground
                style={styles.containerBanner}
                blurRadius={15}
                source={{
                    uri: getBanner(data.banner_img),
                }}
                resizeMode="cover">
                <View style={styles.BannerFilter}>
                    <Appbar.Header
                        style={{
                            backgroundColor: 'rgba(255, 0, 0, 0)',
                            elevation: 0,
                        }}>
                        <Appbar.BackAction
                            onPress={() => {
                                navigation.goBack();
                            }}
                        />
                        <Appbar.Content
                            title={data.display_name}
                            // eslint-disable-next-line quotes
                            subtitle={data.display_name + "'s profile"}
                        />
                    </Appbar.Header>
                    <View style={styles.BannerItems}>
                        <Avatar.Image
                            size={100}
                            style={styles.containerAvatar}
                            source={{uri: getAvatar(data.icon_img)}}
                        />
                        <Title style={styles.username}>
                            {data.display_name}
                        </Title>
                        <Title style={styles.subscribersNb}>
                            {data.subscribers}
                        </Title>
                        <Caption style={styles.subscribersCaption}>
                            Subscribers
                        </Caption>
                        {data && data.name && isLogged && (
                            <FollowButton
                                isFollower={data.user_is_subscriber}
                                url={data.url}
                                name={data.name}
                            />
                        )}
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    containerBanner: {
        flex: Platform.OS === 'ios' ? 0.5 : 0.4,
    },
    BannerFilter: {
        flex: 1,
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
    },
    BannerItems: {
        padding: 40,
        alignItems: 'center',
    },
    containerAvatar: {
        justifyContent: 'center',
        marginTop: Platform.OS === 'ios' ? 30 : 0,
    },
    username: {
        fontSize: 0.07 * Dimensions.get('window').width,
        color: 'white',
        textShadowColor: '#585858',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 15,
        textTransform: 'uppercase',
        marginTop: 30,
        paddingBottom: 10,
    },
    captionPosts: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        textShadowColor: '#585858',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 15,
    },
    subscribersCaption: {
        fontSize: 15,
        color: 'white',
        marginTop: -5,
        paddingBottom: 10,
        textShadowColor: '#585858',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 15,
    },
    subscribersNb: {
        textShadowColor: '#585858',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 15,
        fontSize: 20,
        color: 'white',
    },
});

SubredditProfileHeader.propTypes = {
    data: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};

export default SubredditProfileHeader;
