import React, {useEffect, useState} from 'react';
import {Searchbar} from 'react-native-paper';
import {
    StyleSheet,
    SafeAreaView,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {userSearchQuery} from '../reducers/Actions/User';
import {getTrendingSubreddit, resetData} from '../reducers/Actions/Posts';
import AccountListSubreddit from '../components/Account/AccountListSubreddit';
import Loading from '../components/Loading';
import PropTypes from 'prop-types';

const checkLastSubreddit = (after, lastSubreddit, {nativeEvent}) => {
    const maxHeight = nativeEvent.contentSize.height;
    const contentHeight = nativeEvent.contentOffset.y;

    if (maxHeight - 1000 <= contentHeight && maxHeight - 800 >= contentHeight)
        if (lastSubreddit !== after) {
            return true;
        }
    return false;
};

const Search = ({navigation}) => {
    const {data} = useSelector(state => state.dataReducer);
    const dispatch = useDispatch();
    const onChangeSearch = query => setSearchQuery(query);
    const [lastSubreddit, setlastSubreddit] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const refreshOnFocus = navigation.addListener('focus', () => {
            dispatch(resetData());
            dispatch(getTrendingSubreddit());
            setSearchQuery('');
            setlastSubreddit('');
        });

        return refreshOnFocus;
    }, [dispatch]);

    const subredditData = data.subredditData && data.subredditData;
    const after =
        subredditData[subredditData.length - 1] &&
        subredditData[subredditData.length - 1].data.name;

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Searchbar
                    style={styles.searchbar}
                    fontSize={15}
                    iconColor="#fe4500"
                    placeholder="Are you looking for a subreddit ? 😇"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    onSubmitEditing={() => {
                        dispatch(resetData());
                        dispatch(userSearchQuery(searchQuery, null));
                    }}
                />
            </View>
            <ScrollView
                style={styles.containerList}
                onScroll={nativeEvent => {
                    if (
                        searchQuery &&
                        checkLastSubreddit(after, lastSubreddit, nativeEvent)
                    ) {
                        setlastSubreddit(after);
                        dispatch(userSearchQuery(searchQuery, after));
                    }
                }}
                scrollEventThrottle={16}>
                {(data &&
                    data.subredditData[0] &&
                    data.subredditData[0].data.description &&
                    data.subredditData.map((item, key) => (
                        <TouchableOpacity
                            key={key}
                            style={styles.container}
                            onPress={() => {
                                navigation.navigate('SubredditDetails', {
                                    data: item,
                                });
                            }}>
                            <AccountListSubreddit data={item.data} />
                        </TouchableOpacity>
                    ))) || <Loading />}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    containerList: {
        paddingLeft: 5,
        paddingRight: 5,
    },
    desc: {
        fontSize: 16,
        color: 'grey',
        paddingBottom: 10,
    },
});

Search.propTypes = {
    navigation: PropTypes.object.isRequired,
};
export default Search;
