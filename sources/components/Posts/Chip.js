import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Chip} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {
    getFilteredSubredditData,
    getSubredditPosts,
    resetData,
    setSubredditFilter,
} from '../../reducers/Actions/Posts';
import PropTypes from 'prop-types';

const setFilter = ({subreddit}, filter, dispatch) => {
    dispatch(resetData());
    dispatch(setSubredditFilter(filter));
    if (subreddit === null)
        return dispatch(getFilteredSubredditData(filter, null, null, 10));
    else if (subreddit !== null)
        return dispatch(getSubredditPosts(subreddit, filter, null, null, 10));
};

const ChipFilters = subreddit => {
    const dispatch = useDispatch();
    const [isSelected, setIsSelected] = useState([true, false, false, false]);

    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                paddingBottom: 10,
            }}>
            <Chip
                style={styles.chip}
                icon="fire"
                mode="outlined"
                selected={isSelected[0]}
                onPress={() => {
                    setFilter(subreddit, 'hot', dispatch);
                    setIsSelected([true, false, false, false]);
                }}>
                Hot
            </Chip>
            <Chip
                style={styles.chip}
                icon="medal-outline"
                mode="outlined"
                selected={isSelected[1]}
                onPress={() => {
                    setFilter(subreddit, 'best', dispatch);
                    setIsSelected([false, true, false, false]);
                }}>
                Best
            </Chip>
            <Chip
                style={styles.chip}
                icon="alert-decagram-outline"
                mode="outlined"
                selected={isSelected[2]}
                onPress={() => {
                    setFilter(subreddit, 'new', dispatch);
                    setIsSelected([false, false, true, false]);
                }}>
                New
            </Chip>
            <Chip
                style={styles.chip}
                icon="trending-up"
                mode="outlined"
                selected={isSelected[3]}
                onPress={() => {
                    setFilter(subreddit, 'rising', dispatch);
                    setIsSelected([false, false, false, true]);
                }}>
                Rising
            </Chip>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    chip: {
        alignSelf: 'center',
        marginRight: 10,
    },
});

Chip.propTypes = {
    subreddit: PropTypes.string,
};

export default ChipFilters;
