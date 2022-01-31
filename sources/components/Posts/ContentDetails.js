import React, {useState} from 'react';
import {View} from 'react-native';
import {Caption, ToggleButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import {setVote} from '../../reducers/Actions/Posts';
import {useDispatch} from 'react-redux';

const getDateTime = timestamp => {
    var date = new Date(timestamp * 1000);

    date = date.toString().split('GMT')[0];
    date = date.substr(date.indexOf(' ') + 1);
    date = date.slice(0, -4);
    return date;
};

const setVoted = (setVotedValue, value, id, dispatch) => {
    let params = '';
    if (value === 'right') {
        setVotedValue(-1);
        params = '?dir=-1&id=' + id;
    } else if (value === 'left') {
        setVotedValue(1);
        params = '?dir=1&id=' + id;
    } else {
        setVotedValue(0);
        params = '?dir=0&id=' + id;
    }
    dispatch(setVote(params));
};

const getUserVote = data => {
    if (data === null) {
        return '';
    } else if (data === true) {
        return 'left';
    } else {
        return 'right';
    }
};

const ContentDetails = props => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(getUserVote(props.data.likes));
    const [votedValue, setVotedValue] = useState(0);

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
                <Caption>
                    <Icon name="arrow-up" size={13} />
                    {props.data.ups + votedValue}
                </Caption>
                <Caption>
                    <Icon name="forum-outline" size={13} />
                    {props.data.ups}
                </Caption>
                <Caption>
                    <Icon name="clock-outline" size={13} />
                    {getDateTime(props.data.created)}
                </Caption>
            </View>
            {props.isLogged && (
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: -10,
                    }}>
                    <ToggleButton.Row
                        onValueChange={value => {
                            setVoted(
                                setVotedValue,
                                value,
                                props.data.name,
                                dispatch,
                            );
                            setValue(value);
                        }}
                        value={value}>
                        <ToggleButton
                            icon="arrow-up-bold-outline"
                            value="left"
                        />
                        <ToggleButton
                            icon="arrow-down-bold-outline"
                            value="right"
                        />
                    </ToggleButton.Row>
                </View>
            )}
        </View>
    );
};

ContentDetails.propTypes = {
    data: PropTypes.object.isRequired,
    isLogged: PropTypes.bool.isRequired,
};

export default ContentDetails;
