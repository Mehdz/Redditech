import React, {useEffect, useState} from 'react';
import {
    Dimensions,
    ImageBackground,
    Platform,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Appbar, Avatar, Caption, Title} from 'react-native-paper';
import {
    getFilteredSubredditData,
    getSubredditPosts,
    resetData,
} from '../../reducers/Actions/Posts';
import PropTypes from 'prop-types';
import SubredditStats from './SubredditStats';
import ContentPost from './ContentPost';
import Loading from '../Loading';
import FollowButton from './FollowButton';

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

const checkLastPost = (after, lastPost, {nativeEvent}) => {
    const maxHeight = nativeEvent.contentSize.height;
    const contentHeight = nativeEvent.contentOffset.y;

    if (maxHeight - 3000 <= contentHeight && maxHeight - 2000 >= contentHeight)
        if (lastPost !== after) {
            return true;
        }
    return false;
};

const SubredditProfile = ({navigation, route}) => {
    const subredditInfo = route.params.data.data;
    const {data} = useSelector(state => state.dataReducer);
    const {isLogged} = useSelector(state => state.authReducer);
    const [lastPost, setLastPost] = useState('');
    const dispatch = useDispatch();
    const filter = data.subredditFilter && data.subredditFilter;
    const subredditData = data.subredditData && data.subredditData;
    const after =
        subredditData[subredditData.length - 1] &&
        subredditData[subredditData.length - 1].data.name;

    useEffect(() => {
        const refreshOnFocus = navigation.addListener('focus', () => {
            dispatch(resetData());
            dispatch(
                getSubredditPosts(subredditInfo.url, filter, null, null, 25),
            );
        });

        return refreshOnFocus;
    }, [dispatch]);

    return (
        <ScrollView
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            onScroll={nativeEvent => {
                if (checkLastPost(after, lastPost, nativeEvent)) {
                    setLastPost(after);
                    dispatch(
                        getSubredditPosts(
                            subredditInfo.url,
                            filter,
                            null,
                            after,
                            10,
                        ),
                    );
                }
            }}
            scrollEventThrottle={16}>
            <ImageBackground
                style={styles.containerBanner}
                blurRadius={15}
                source={{
                    uri: getBanner(subredditInfo.banner_img),
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
                            title={subredditInfo.display_name}
                            // eslint-disable-next-line quotes
                            subtitle={subredditInfo.display_name + "'s profile"}
                        />
                    </Appbar.Header>
                    <View style={styles.BannerItems}>
                        <Avatar.Image
                            size={100}
                            style={styles.containerAvatar}
                            source={{uri: getAvatar(subredditInfo.icon_img)}}
                        />
                        <Title style={styles.username}>
                            {subredditInfo.display_name}
                        </Title>
                        <Title style={styles.subscribersNb}>
                            {subredditInfo.subscribers}
                        </Title>
                        <Caption style={styles.subscribersCaption}>
                            Subscribers
                        </Caption>
                        {subredditInfo && subredditInfo.name && isLogged && (
                            <FollowButton
                                isFollower={subredditInfo.user_is_subscriber}
                                url={subredditInfo.url}
                                name={subredditInfo.name}
                            />
                        )}
                    </View>
                </View>
            </ImageBackground>
            <SubredditStats data={subredditInfo} />
            <View style={{padding: 10}}>
                {(data &&
                    data.subredditData[0] &&
                    data.subredditData.map((item, key) => (
                        <ContentPost key={key} data={item.data} />
                    ))) || <Loading />}
            </View>
        </ScrollView>
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

SubredditProfile.propTypes = {
    route: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};

export default SubredditProfile;
