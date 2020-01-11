import React, { Component} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import * as firebase from 'firebase'

export default class RegisterScreen extends Component {

    state = {
        name: "",
        email: "",
        password: "",
        errorMessage: null
    };

    handleSingUp = () => {
        firebase.auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(userCredentials => {
              return userCredentials.user.updateProfile({
                  displayName: this.state.name
              });
          })
          .catch(error => this.setState({ errorMessage: error.message }));
    }

    render() {
        const { container, greeting, errorMessageStyle, form, inputTitle, input, button, error, back } = styles
        return (
            <View style={container}>
                <TouchableOpacity style={back} onPress={() => this.props.navigation.goBack()}>
                    <Icon name="md-arrow-back" size={32}></Icon>
                </TouchableOpacity>

                <Text style={greeting}>{'Hello.\nSing up to get started.'}</Text>

                <View style={errorMessageStyle}>
                    {this.state.errorMessage && <Text style={error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={form}>
                    <View style={{ marginTop: 1 }}>
                        <Text style={inputTitle} >Full Name</Text>
                        <TextInput style={input}
                            autoCapitalize='none'
                            onChangeText={name => this.setState({ name })}
                            value={this.state.name}
                        ></TextInput>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Text style={inputTitle} >Email Address</Text>
                        <TextInput style={input}
                            autoCapitalize='none'
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        ></TextInput>
                    </View>
                    <View style={{ marginTop: 29 }}>
                        <Text style={inputTitle} >Password</Text>
                        <TextInput style={input}
                            secureTextEntry
                            autoCapitalize='none'
                            onChangeText={password => this.setState({ password })}
                            value={ this.state.password }
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={button} onPress={this.handleSingUp}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>
                        Sign up
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignSelf: 'center', marginTop: 32 }} on>
                    <Text style={{ color: '#414959', fontSize: 13 }}
                      onPress={() => this.props.navigation.navigate('Login')}>
                        already have ToDo? <Text style={{ fontWeight: '500', color: '#e9446a' }}>Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greeting: {
        marginTop: 70,
        fontSize: 18,
        fontWeight: "400",
        textAlign: 'center'
    },
    errorMessageStyle: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    back: {
        position: "absolute",
        top: 32,
        left: 32,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(21, 22, 48, 0.1)",
        alignItems: "center",
        justifyContent: "center"
    }
});