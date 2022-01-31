import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import {getUserSpecificData} from '../../reducers/Actions/User';
import Loading from '../../components/Loading';
import PropTypes from 'prop-types';
import {resetData} from '../../reducers/Actions/Posts';
import ContentPost from '../../components/Posts/ContentPost';

const AccountDetails = ({navigation, dataname}) => {
    const {data} = useSelector(state => state.dataReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const refreshOnFocus = navigation.addListener('focus', () => {
            dispatch(resetData());
            dispatch(getUserSpecificData(dataname, data.userInfos.name, null));
        });

        return refreshOnFocus;
    }, [dispatch]);

    const subredditData = data.subredditData && data.subredditData;

    return (
        <View style={styles.containerItems}>
            {(subredditData[0] &&
                subredditData.map((item, key) => (
                    <View key={key}>
                        <ContentPost key={key} data={item.data} />
                    </View>
                ))) || <Loading />}
        </View>
    );
};

const styles = StyleSheet.create({
    containerItems: {
        paddingBottom: 70,
    },
});

AccountDetails.propTypes = {
    navigation: PropTypes.object.isRequired,
    dataname: PropTypes.string.isRequired,
};

export default AccountDetails;
