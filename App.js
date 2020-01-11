import React from 'react'
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/Ionicons'

import LoadingScreen from "./src/screens/LoadingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen"
import PomodoroScreen from "./src/screens/PomodoroScreen"

// import * as firebase from "firebase";
// import FirebaseKeys from "./config";

// var firebaseConfig = {
//   apiKey: "AIzaSyB3JwF-hphUMz3yl_mCFR1ugJIHKsWPxwo",
//   authDomain: "todo-f09ed.firebaseapp.com",
//   databaseURL: "https://todo-f09ed.firebaseio.com",
//   projectId: "todo-f09ed",
//   storageBucket: "todo-f09ed.appspot.com",
//   messagingSenderId: "154168512624",
//   appId: "1:154168512624:web:5332b79efa2117512a64b5"
// };

//var firebaseConfig = FirebaseKeys;

//firebase.initializeApp(firebaseConfig);

const AppTabNavigator = createBottomTabNavigator(
    {
        Pomodoro: {
            screen: PomodoroScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon name="md-stopwatch" size={24} color={tintColor} />
            }
        },
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon 
                  name="md-checkbox"
                  size={48} 
                  color='#000'
                  style={{ 
                    shadowColor: '#e9446a', 
                    shadowOffset: { width: 0, height: 0 },
                    shadowRadius: 10,
                    shadowOpacity: 0.3 
                  }}
                />,
                // headerShown: false
            }
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon name="md-person" size={24} color={tintColor} />
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: '#161f3d',
            activeBackgroundColor: '#b8bbc4',
            showLabel: false,
            headerShown: false
        },
        initialRouteName: "Home"
    }
);

const AuthStack = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: ({
            headerShown: false
        })
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: ({
            headerShown: false
        })
    }
});

export default createAppContainer(
    createSwitchNavigator(
        {
            Loading: LoadingScreen,
            App: AppTabNavigator,
            Auth: AuthStack
        },
        {
            initialRouteName: "Loading"
        }
    )
);