import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native';
import {
    getUserSubreddit,
    getUserSpecificData,
    getUserTrophies,
} from '../../reducers/Actions/User';
import {Appbar} from 'react-native-paper';
import PropTypes from 'prop-types';
import AccountSubed from './AccountSubed';
import AccountTrophies from './AccountTrophies';
import AccountDetails from './AccountDetails';

const checkLastData = (after, lastData, {nativeEvent}) => {
    const maxHeight = nativeEvent.contentSize.height;
    const contentHeight = nativeEvent.contentOffset.y;

    if (maxHeight - 1000 <= contentHeight && maxHeight - 800 >= contentHeight)
        if (lastData !== after) {
            return true;
        }
    return false;
};

const AccountPosts = ({route, navigation}) => {
    const {data} = useSelector(state => state.dataReducer);
    const {dataname} = route.params;
    const dispatch = useDispatch();
    const [lastData, setlastData] = useState('');
    const subredditData = data.subredditData && data.subredditData;
    const after =
        subredditData[subredditData.length - 1] &&
        subredditData[subredditData.length - 1].data.name;

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <Appbar.Content
                    title="Account"
                    subtitle={'Your account details'}
                />
            </Appbar.Header>
            <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={nativeEvent => {
                    if (checkLastData(after, lastData, nativeEvent)) {
                        setlastData(after);
                        if (dataname === 'trophies')
                            dispatch(getUserTrophies(after));
                        else if (dataname === 'friends')
                            dispatch(getUserSubreddit(after));
                        else
                            dispatch(
                                getUserSpecificData(
                                    dataname,
                                    data.userInfos.name,
                                    after,
                                ),
                            );
                    }
                }}
                scrollEventThrottle={16}>
                {dataname === 'friends' && (
                    <AccountSubed navigation={navigation} />
                )}
                {dataname === 'trophies' && (
                    <AccountTrophies navigation={navigation} />
                )}
                {dataname !== 'friends' && dataname !== 'trophies' && (
                    <AccountDetails
                        navigation={navigation}
                        dataname={dataname}
                    />
                )}
            </ScrollView>
        </>
    );
};

AccountPosts.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};

export default AccountPosts;
