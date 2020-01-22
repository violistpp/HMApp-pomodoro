import React, { Component} from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import FirebaseKeys from '../../config';
import * as firebase from 'firebase'

// const firebaseAuth = firebase.auth();

const firebaseApp = firebase.initializeApp(FirebaseKeys);
const firebaseAuth = firebaseApp.auth();

export default class LoadingScreen extends Component {

    componentDidMount() {
        firebaseAuth.onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "App" : "Auth");
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
                <ActivityIndicator size='large'></ActivityIndicator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});