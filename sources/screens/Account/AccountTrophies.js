import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import {getUserTrophies} from '../../reducers/Actions/User';
import AccountListTrophies from '../../components/Account/AccountListTrophies';
import Loading from '../../components/Loading';
import PropTypes from 'prop-types';
import {resetData} from '../../reducers/Actions/Posts';

const AccountTrophies = ({navigation}) => {
    const {data} = useSelector(state => state.dataReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const refreshOnFocus = navigation.addListener('focus', () => {
            dispatch(resetData());
            dispatch(getUserTrophies(null));
        });

        return refreshOnFocus;
    }, [dispatch]);

    return (
        <View style={styles.containerItems}>
            {(data &&
                data.subredditData[0] &&
                data.subredditData.map((item, key) => (
                    <AccountListTrophies key={key} data={item.data} />
                ))) || <Loading />}
        </View>
    );
};

const styles = StyleSheet.create({
    containerItems: {
        padding: 20,
    },
});

AccountTrophies.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default AccountTrophies;
