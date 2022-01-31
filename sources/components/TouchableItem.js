import React from 'react';
import {TouchableOpacity} from 'react-native';
import {List} from 'react-native-paper';
import PropTypes from 'prop-types';

const TouchableItem = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <List.Item
                title={props.title}
                left={() => (
                    <List.Icon color={props.color} icon={props.leftIcon} />
                )}
                right={() => (
                    <List.Icon color={props.color} icon={props.rightIcon} />
                )}
            />
        </TouchableOpacity>
    );
};

TouchableItem.propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
    rightIcon: PropTypes.string,
    leftIcon: PropTypes.string,
    onPress: PropTypes.func,
};

export default TouchableItem;
