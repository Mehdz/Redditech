import React, {useEffect} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {setUserLoggedIn, setUserLoggedOut} from '../reducers/Actions/Auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from './Home';
import Account from './Account/Account';
import Settings from './Account/Settings';
import Login from './Login';
import Search from './Search';
import Inbox from './Messages/Inbox';
import Loading from '../components/Loading';
import AccountData from './Account/AccountData';
import SubredditProfile from '../components/Posts/SubredditProfile';
import {getUserInfos} from '../reducers/Actions/User';
import {resetData} from '../reducers/Actions/Posts';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'white',
        background: 'white',
        border: 'white',
    },
};

const UserAccount = () => {
    return (
        <Stack.Navigator initialRouteName="Account">
            <Stack.Screen
                name="Account"
                component={Account}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="AccountData"
                component={AccountData}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="AccountSubed"
                component={SubredditProfile}
                options={{headerShown: false}}
            />
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

const UserInbox = () => {
    return (
        <Stack.Navigator initialRouteName="Inbox">
            <Stack.Screen
                name="Inbox"
                component={Inbox}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};

const SearchStack = () => {
    return (
        <Stack.Navigator initialRouteName="Search">
            <Stack.Screen
                name="Search"
                component={Search}
                options={{headerShown: false}}
            />
            <Stack.Group>
                <Stack.Screen
                    name="SubredditDetails"
                    component={SubredditProfile}
                    options={{headerShown: false}}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
};

const AppStack = () => {
    const {isLogged} = useSelector(state => state.authReducer);

    return (
        <Tab.Navigator initialRouteName="Home" activeColor="#fe4500">
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    color: '#fe4500',
                    tabBarLabel: 'Home',
                    tabBarIcon: ({color}) => (
                        <Icon name="home" color={color} size={20} />
                    ),
                }}
            />
            {isLogged ? (
                <Stack.Group>
                    <Tab.Screen
                        name="Messages"
                        component={UserInbox}
                        options={{
                            tabBarLabel: 'Messages',
                            tabBarIcon: ({color}) => (
                                <Icon name="email" color={color} size={20} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="UserAccount"
                        component={UserAccount}
                        options={{
                            tabBarLabel: 'Account',
                            tabBarIcon: ({color}) => (
                                <Icon name="person" color={color} size={20} />
                            ),
                        }}
                    />
                </Stack.Group>
            ) : (
                <Tab.Screen
                    name="Login"
                    component={Login}
                    options={{
                        tabBarLabel: 'Log In',
                        tabBarIcon: ({color}) => (
                            <Icon name="login" color={color} size={20} />
                        ),
                    }}
                />
            )}
            <Tab.Screen
                name="SearchStack"
                component={SearchStack}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({color}) => (
                        <Icon name="search" color={color} size={20} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const Navigation = () => {
    const {isLogged} = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    useEffect(async () => {
        const accessToken = await EncryptedStorage.getItem('accessToken');

        if (accessToken && accessToken) {
            dispatch(resetData());
            dispatch(getUserInfos());
            dispatch(setUserLoggedIn());
        } else {
            dispatch(setUserLoggedOut());
        }
    }, [dispatch]);

    return (
        <>
            {isLogged === undefined ? (
                <Loading />
            ) : (
                <NavigationContainer theme={MyTheme}>
                    <AppStack />
                </NavigationContainer>
            )}
        </>
    );
};

export default Navigation;
