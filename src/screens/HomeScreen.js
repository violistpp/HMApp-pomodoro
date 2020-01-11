import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native'
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from "moment";
import Fire from '../../Fire'

const firebase = require('firebase')
require("firebase/firestore")

posts = [
    {
        id: "1",
        name: "Joe McKay",
        text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        timestamp: 1569109273726,
    },
    {
        id: "2",
        name: "Karyn Kim",
        text:
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        timestamp: 1569109273726,
    },
    {
        id: "3",
        name: "Emerson Parsons",
        text:
            "Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant.",
        timestamp: 1569109273726,
    },
    {
        id: "4",
        name: "Kathie Malone",
        text:
            "At varius vel pharetra vel turpis nunc eget lorem. Lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor. Adipiscing tristique risus nec feugiat in fermentum.",
        timestamp: 1569109273726,
    }
];

export default class HomeScreen extends Component {

    state = {
        text: ""
    }

    handleTask = () => {
        Fire.shared.addPost({text: this.state.text.trim()})
        .then(ref => {
            this.setState({text: ""});
        })
        .catch(error => {
            alert(error);
        })
    }

    renderTask = post => {
        const { taskStyle, titleStyle, timestamp } = styles
        return (
            <View style={taskStyle}>
                <CheckBox />
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <Text style={titleStyle}>{post.name}</Text>
                            <Text style={timestamp}>{moment(post.timestamp).fromNow()}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    render() {
        const { container, inputText, newTask, addButton } = styles

        return (
            <View style={container}>

                <FlatList
                    style={{ marginHorizontal: 16 }}
                    data={posts}
                    renderItem={({ item }) => this.renderTask(item)}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                ></FlatList>

                <View style={ newTask }>
                    <TextInput
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                        placeholder="new task"
                        style={inputText}
                    />

                    <TouchableOpacity style={addButton}>
                        {/* <Text>md-add-circle-outline, md-add-circle, md-arrow-up, md-checkbox</Text> */}
                        <Icon name="md-arrow-dropup-circle" size={32} color="#D8D9DB"></Icon>
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBECF4"
    },
    taskStyle: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8
    },
    titleStyle: {
        fontSize: 15,
        fontWeight: "500",
        color: "#454D65"
    },
    timestamp: {
        fontSize: 11,
        color: "#C4C6CE",
        marginTop: 4
    },
    newTask: {
        flexDirection: "row",
        alignItems: "flex-end",
        paddingHorizontal: 10,
        paddingBottom: 8,
    },
    inputText: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#D8D9DB',
    },
    addButton: {
        marginLeft: 20
    }
});