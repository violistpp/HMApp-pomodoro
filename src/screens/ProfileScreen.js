import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation } from 'react-native'
import * as firebase from 'firebase'

export default class ProfileScreen extends Component {

    state = {
        email: "",
        displayName: ""
    };

    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;

        this.setState({ email, displayName });
    }

    singOutUser = () => {
        firebase.auth().signOut();
    };

    render() {
        const { container } = styles
        LayoutAnimation.easeInEaseOut();
        
        return (
            <View style={container}>
                <Text>Hi {this.state.displayName}</Text>

                <TouchableOpacity style={{ marginTop: 30 }} onPress={this.singOutUser}>
                    <Text>Logout</Text>
                </TouchableOpacity>
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