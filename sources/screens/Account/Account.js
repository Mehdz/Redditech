import React, {useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Divider} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getUserInfos} from '../../reducers/Actions/User';
import PropTypes from 'prop-types';
import AccountHeader from '../../components/Account/AccountHeader';
import AccountButton from '../../components/Account/AccountButton';
import AccountUserInfo from '../../components/Account/AccountUserInfo';
import AccountItemList from '../../components/Account/AccountItemList';
import Loading from '../../components/Loading';

const Account = ({navigation}) => {
    const {data} = useSelector(state => state.dataReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const refreshOnFocus = navigation.addListener('focus', () => {
            dispatch(getUserInfos());
        });

        return refreshOnFocus;
    }, [dispatch]);

    return (
        <View style={styles.container}>
            {(data && data.userInfos && (
                <>
                    <AccountHeader data={data.userInfos} />
                    <AccountUserInfo data={(data && data.userInfos) || data} />
                    <AccountButton
                        data={data && data.userInfos}
                        navigation={navigation}
                    />
                    <View style={styles.dividerStyle}>
                        <Divider />
                    </View>

                    <ScrollView
                        style={styles.container}
                        showsVerticalScrollIndicator={false}>
                        <AccountItemList
                            data={data && data.userInfos}
                            navigation={navigation}
                        />
                    </ScrollView>
                </>
            )) ||
                (!data && <Loading />)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dividerStyle: {
        padding: 20,
        paddingBottom: 0,
    },
    containerActIndicator: {
        marginTop: 50,
        flex: 1,
    },
});

Account.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Account;
