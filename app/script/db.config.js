import * as firebase from 'firebase';
const config = {
    apiKey: "AIzaSyDxUwatH0HBcUfJ3y3uyvhEY3YT4BctwDI",
    authDomain: "todolist-1bab9.firebaseapp.com",
    databaseURL: "https://todolist-1bab9.firebaseio.com",
    storageBucket: "todolist-1bab9.appspot.com",
    messagingSenderId: "575781552241"
};
firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth();

export function objToArrCategories(obj) {
    var arr = [];
    for (var key in obj) {
        let object={};
        object.name = obj[key].name;
        object.description = obj[key].description;
        object.id = obj[key].id;
        object.tasks = obj[key].tasks ? obj[key].tasks.length : 0;
        arr.push(object);
    }
    return arr;
}
