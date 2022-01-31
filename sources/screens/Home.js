import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar, Headline} from 'react-native-paper';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {getFilteredSubredditData, resetData} from '../reducers/Actions/Posts';
import ContentPost from '../components/Posts/ContentPost';
import ChipFilters from '../components/Posts/Chip';
import Loading from '../components/Loading';
import PropTypes from 'prop-types';

const checkLastPost = (after, lastPost, {nativeEvent}) => {
    const maxHeight = nativeEvent.contentSize.height;
    const contentHeight = nativeEvent.contentOffset.y;

    if (maxHeight - 3000 <= contentHeight && maxHeight - 2000 >= contentHeight)
        if (lastPost !== after) {
            return true;
        }
    return false;
};

const Home = ({navigation}) => {
    const {data} = useSelector(state => state.dataReducer);
    const dispatch = useDispatch();
    const [lastPost, setLastPost] = useState('');
    const filter = data.subredditFilter && data.subredditFilter;

    useEffect(() => {
        const refreshOnFocus = navigation.addListener('focus', () => {
            dispatch(resetData());
            dispatch(getFilteredSubredditData(filter, null, null, 10));
        });

        return refreshOnFocus;
    }, [dispatch]);

    const subredditData = data.subredditData && data.subredditData;
    const after =
        subredditData[subredditData.length - 1] &&
        subredditData[subredditData.length - 1].data.name;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={nativeEvent => {
                    if (checkLastPost(after, lastPost, nativeEvent)) {
                        setLastPost(after);
                        dispatch(
                            getFilteredSubredditData(filter, null, after, 10),
                        );
                    }
                }}
                scrollEventThrottle={16}>
                <View style={styles.searchContainer}>
                    <Avatar.Icon icon="reddit" />
                    <Headline>ReadIt</Headline>
                </View>
                <ChipFilters subreddit={null} />
                {(subredditData[0] &&
                    subredditData.map((item, key) => (
                        <ContentPost key={key} data={item.data} />
                    ))) || <Loading />}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    searchContainer: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    containerActIndicator: {
        marginTop: 50,
        flex: 1,
    },
});

Home.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Home;
