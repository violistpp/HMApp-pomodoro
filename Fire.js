import FirebaseKeys from "./config";
import firebase from 'firebase'

class Fire {
    constructor() {
        firebase.initializeApp(FirebaseKeys);
    }

    addTask = async ({text}) => {
        return new Promise((res, rej) => {
            this.firesore
            .collection("tasks")
            .add({
                text,
                uid: this.uid,
                timestamp: this.timestamp
            })
            .then(ref => {
                res(ref);
            }).catch(error => {
                rej(error)
            })
        })
    }

    get firesore() {
        return firebase.firestore()
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }

    get timestamp() {
        return DataCue.now()
    }
}

Fire.shared = new Fire();
export default Fire;