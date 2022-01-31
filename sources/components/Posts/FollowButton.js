import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Button} from 'react-native-paper';
import {getSubredditPosts} from '../../reducers/Actions/Posts';
import PropTypes from 'prop-types';
import {setUserSubscribe} from '../../reducers/Actions/User';

const FollowButton = props => {
    const dispatch = useDispatch();
    const [isFollower, setIsFollower] = useState(
        props.isFollower ? true : false,
    );
    const iconStyle = isFollower ? 'heart' : 'heart-outline';

    const params =
        '?action=' +
        (isFollower ? 'unsub' : 'sub') +
        '&skip_initial_defaults=' +
        (isFollower ? false : true) +
        '&sr=' +
        props.name;

    return (
        <Button
            icon={iconStyle}
            mode="contained"
            onPress={() => {
                setIsFollower(!isFollower);
                dispatch(setUserSubscribe(params));
                dispatch(getSubredditPosts(props.url, null, null, 25));
            }}>
            {isFollower ? 'Subscribed' : 'Subscribe'}
        </Button>
    );
};

FollowButton.propTypes = {
    isFollower: PropTypes.bool,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

export default FollowButton;
