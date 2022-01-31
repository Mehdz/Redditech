import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {getUserSubreddit} from '../../reducers/Actions/User';
import AccountListSubreddit from '../../components/Account/AccountListSubreddit';
import Loading from '../../components/Loading';
import PropTypes from 'prop-types';
import {resetData} from '../../reducers/Actions/Posts';

const AccountSubedItem = ({navigation, item}) => {
    if (
        item.data &&
        item.data.url &&
        item.data.user_is_subscriber &&
        !item.data.url.includes('/user/')
    )
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => {
                    navigation.navigate('AccountSubed', {
                        data: item,
                    });
                }}>
                <AccountListSubreddit data={item.data} />
            </TouchableOpacity>
        );
    return null;
};

const AccountSubed = ({navigation}) => {
    const {data} = useSelector(state => state.dataReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const refreshOnFocus = navigation.addListener('focus', () => {
            dispatch(resetData());
            dispatch(getUserSubreddit(null));
        });

        return refreshOnFocus;
    }, [dispatch]);

    const subredditData = data.subredditData && data.subredditData;

    return (
        <View style={styles.container}>
            {(subredditData[0] &&
                subredditData.map((item, key) => (
                    <View key={key}>
                        <AccountSubedItem navigation={navigation} item={item} />
                    </View>
                ))) || <Loading />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});

AccountSubed.propTypes = {
    navigation: PropTypes.object.isRequired,
};

AccountSubedItem.propTypes = {
    navigation: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
};

export default AccountSubed;
