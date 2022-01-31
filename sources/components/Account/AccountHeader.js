import React from 'react';
import {ImageBackground, Platform, StyleSheet, View} from 'react-native';
import {Avatar, Caption, Title} from 'react-native-paper';
import {PropTypes} from 'prop-types';

const AccountHeader = ({data}) => {
    return (
        <ImageBackground
            style={styles.containerBanner}
            blurRadius={15}
            source={{
                uri:
                    data &&
                    data.subreddit &&
                    data.subreddit.banner_img &&
                    data.subreddit.banner_img.split('?')[0],
            }}
            resizeMode="cover">
            <View style={styles.BannerFilter}>
                <Avatar.Image
                    size={100}
                    style={styles.containerAvatar}
                    source={{
                        uri:
                            data &&
                            data.icon_img &&
                            data.icon_img.split('?')[0],
                    }}
                />
                <View>
                    <Title style={styles.titlePosts}>
                        {data && data.comment_karma}
                    </Title>
                    <Caption style={styles.captionPosts}>
                        Comment{'\n'}Karma
                    </Caption>
                </View>
                <View>
                    <Title style={styles.titlePosts}>
                        {data && data.link_karma}
                    </Title>
                    <Caption style={styles.captionPosts}>
                        Posts{'\n'}Karma
                    </Caption>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    containerBanner: {
        flex: Platform.OS === 'ios' ? 0.5 : 0.4,
    },
    BannerFilter: {
        flex: 1,
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        alignItems: 'center',
        padding: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    containerAvatar: {
        marginTop: Platform.OS === 'ios' ? 30 : 0,
    },
    titlePosts: {
        fontSize: 30,
        textAlign: 'center',
        color: 'white',
        textShadowColor: '#585858',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 15,
        marginTop: Platform.OS === 'ios' ? 50 : 0,
    },
    captionPosts: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        textShadowColor: '#585858',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 15,
    },
});

AccountHeader.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountHeader;
