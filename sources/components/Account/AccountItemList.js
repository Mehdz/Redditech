import React from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import {PropTypes} from 'prop-types';
import TouchableItem from '../TouchableItem';
import {resetData} from '../../reducers/Actions/Posts';

const AccountItemList = ({navigation}) => {
    const dispatch = useDispatch();

    return (
        <List.Section style={styles.containerList}>
            <TouchableItem
                title="Subscribed"
                leftIcon="account-group-outline"
                rightIcon="chevron-right"
                color="#fe4500"
                onPress={() => {
                    dispatch(resetData());
                    navigation.navigate('AccountData', {
                        dataname: 'friends',
                    });
                }}
            />
            <TouchableItem
                title="Posts"
                leftIcon="developer-board"
                rightIcon="chevron-right"
                color="#fe4500"
                onPress={() => {
                    dispatch(resetData());
                    navigation.navigate('AccountData', {
                        dataname: 'submitted',
                    });
                }}
            />
            <TouchableItem
                title="Comments"
                leftIcon="forum"
                rightIcon="chevron-right"
                color="#fe4500"
                onPress={() => {
                    dispatch(resetData());
                    navigation.navigate('AccountData', {
                        dataname: 'comments',
                    });
                }}
            />
            <TouchableItem
                title="Saved"
                leftIcon="bookmark-multiple-outline"
                rightIcon="chevron-right"
                color="#fe4500"
                onPress={() => {
                    dispatch(resetData());
                    navigation.navigate('AccountData', {
                        dataname: 'saved',
                    });
                }}
            />
            <TouchableItem
                title="Upvoted"
                leftIcon="arrow-up-bold"
                rightIcon="chevron-right"
                color="#fe4500"
                onPress={() => {
                    dispatch(resetData());
                    navigation.navigate('AccountData', {
                        dataname: 'upvoted',
                    });
                }}
            />
            <TouchableItem
                title="Downvoted"
                leftIcon="arrow-down-bold"
                rightIcon="chevron-right"
                color="#fe4500"
                onPress={() => {
                    dispatch(resetData());
                    navigation.navigate('AccountData', {
                        dataname: 'downvoted',
                    });
                }}
            />
            <TouchableItem
                title="Hidden"
                leftIcon="eye-off-outline"
                rightIcon="chevron-right"
                color="#fe4500"
                onPress={() => {
                    dispatch(resetData());
                    navigation.navigate('AccountData', {
                        dataname: 'hidden',
                    });
                }}
            />
            <TouchableItem
                title="Trophies"
                leftIcon="trophy-variant-outline"
                rightIcon="chevron-right"
                color="#fe4500"
                onPress={() => {
                    dispatch(resetData());
                    navigation.navigate('AccountData', {
                        dataname: 'trophies',
                    });
                }}
            />
        </List.Section>
    );
};
const styles = StyleSheet.create({
    containerList: {
        paddingLeft: 20,
        paddingRight: 20,
    },
});

AccountItemList.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default AccountItemList;
