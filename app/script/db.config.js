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
export const firebaseAuth = firebase.auth;
