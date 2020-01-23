import React, { Component } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TextInput, 
    FlatList,
    ListView
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import IconTwo from 'react-native-vector-icons/Feather'
import moment from "moment"
import * as firebase from 'firebase'

// import FirebaseKeys from '../../config'

// firebase.initializeApp(FirebaseKeys);

// {
    //     task: "task One"
    // }, 
    // {
    //     task: "task Two"
    // }
var data = [
    // {
    //     task: 'New Task',
    //     checked: false
    // },
    // {
    //     task: 'Do',
    //     chacked: false
    // }
]

export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            listData: data,
            newTask: ""
        }
    }

    componentDidMount() {
        var that = this
        firebase.database().ref('/tasks').on('child_added', function(data) {
            var newData = [...that.state.listData]
            newData.push(data.val())
            that.setState({listData: newData})
            console.log("new data: ", newData)
        })
    }

    addTask(data) {
        var key = firebase.database().ref('/tasks').push().key
        firebase.database().ref('/tasks').child(key).set({ task: data, checked: false })
    }

    showInformation() {

    }

    renderTask({item}) {
        const { taskStyle, titleStyle, timestamp, checkStyle } = styles
        return (
            <View style={taskStyle}>
                <IconTwo name='circle' style={checkStyle} />
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <Text style={titleStyle}>{item.task}</Text>
                            {/* <Text style={timestamp}>{moment(post.timestamp).fromNow()}</Text> */}
                        </View>
                    </View>
                </View>
            </View>
            // <Text style={titleStyle}>{item.task}</Text>
        );
    };

    render() {
        const { container, inputText, newTaskStyle, addButton } = styles

        return (
            <View style={container}>

                <FlatList
                    style={{ marginHorizontal: 16 }}
                    data={this.state.listData}
                    renderItem={this.renderTask}
                    keyExtractor={item => item.key}
                ></FlatList>

                <View style={newTaskStyle}>
                    <TextInput
                        onChangeText={(newTask) => this.setState({ newTask })}
                        value={this.state.text}
                        placeholder="new task"
                        style={inputText}
                    />

                    <TouchableOpacity style={addButton} onPress={() => {this.addTask(this.state.newTask)}}>
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
    checkStyle: {
        marginRight: 10,
        marginTop: 5,
        marginLeft: 4
    },
    newTaskStyle: {
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