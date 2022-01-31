import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AccountUserSettingsSwitch from '../../components/Account/AccountUserSettings';
import {getUserSettings} from '../../reducers/Actions/User';
import PropTypes from 'prop-types';
import Loading from '../../components/Loading';

const Settings = ({navigation}) => {
    const {data} = useSelector(state => state.dataReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const refreshOnFocus = navigation.addListener('focus', () => {
            dispatch(getUserSettings());
        });
        return refreshOnFocus;
    }, [dispatch]);

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {(data && data.userSettings && data.userSettings.accept_pms && (
                <View
                    style={styles.container}
                    showsVerticalScrollIndicator={false}>
                    <AccountUserSettingsSwitch
                        text="Personalize recommendations based on your location"
                        description="Allow us to use your city, state, or country (based on your IP) to recommend better posts and communities."
                        param="show_location_based_recommendations"
                        value={data.userSettings.show_location_based_recommendations}
                    />
                    <AccountUserSettingsSwitch
                        text="Conceal in search results"
                        description="Prevent search engines like Google to link to your profile in their search results."
                        param="hide_from_robots"
                        value={data.userSettings.hide_from_robots}
                    />
                    <AccountUserSettingsSwitch
                        text="Allow people to follow you"
                        description="Followers will be notified about posts you make to your profile and see them in their home feed."
                        param="enable_followers"
                        value={data.userSettings.enable_followers}
                    />
                    <AccountUserSettingsSwitch
                        text="Personalize ads based on information from our partners"
                        description="Allow us to use information that our advertising partners send us to show you better ads."
                        param="third_party_data_personalized_ads"
                        value={
                            data.userSettings.third_party_data_personalized_ads
                        }
                    />
                    <AccountUserSettingsSwitch
                        text="Active in communities visibility"
                        description="Show which communities I am active in on my profile."
                        param="top_karma_subreddits"
                        value={data.userSettings.top_karma_subreddits}
                    />
                    <AccountUserSettingsSwitch
                        text="Autoplay media"
                        description="Play videos and gifs automatically when in the viewport."
                        param="video_autoplay"
                        value={data.userSettings.video_autoplay}
                    />
                </View>
            )) || <Loading />}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 20,
    },
});

Settings.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Settings;
