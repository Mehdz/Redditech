import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserMessages} from '../../reducers/Actions/User';
import InboxModal from '../../components/Inbox/InboxModal';
import InboxBody from '../../components/Inbox/InboxBody';
import PropTypes from 'prop-types';
import Loading from '../../components/Loading';

const Inbox = ({navigation}) => {
    const {data} = useSelector(state => state.dataReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const refreshOnFocus = navigation.addListener('focus', () => {
            dispatch(getUserMessages(null, null, 0, 25));
        });

        return refreshOnFocus;
    }, [dispatch]);

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <InboxModal />
                {(data &&
                    data.userMessages[0] &&
                    data.userMessages.map((item, key) => {
                        return (
                            <InboxBody
                                key={key}
                                title={item.data.subject}
                                author={item.data.author}
                                content={item.data.body}
                                authorId={item.data.name}
                                navigation={navigation}
                            />
                        );
                    })) || <Loading />}
            </ScrollView>
        </SafeAreaView>
    );
};

Inbox.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Inbox;
