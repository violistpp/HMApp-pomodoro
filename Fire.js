import firebase from 'react-native-firebase'

export function addTask(task, addComplete) {
    firebase.firestore()
    .collection('Tasks')
    .add({
        name: task.name,
        checked: task.checked,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then((snapshot) => snapshot.get())
    .then((taskData) => addComponent(taskData.data()))
    .catch((error) => console.log(error));
}

export async function getTasks(tasksRetreived) {
    
    var taskList = [];

    var snapshot = await firebase.firestore()
    .collection('Tasks')
    .orderBy('createdAt')
    .get()

    snapshot.forEach((doc) => {
        taskList.push(doc.data())
    });

    tasksRetreived(taskList);
}