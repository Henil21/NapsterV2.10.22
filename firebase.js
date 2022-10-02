import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAEH558UjKQH2joX7bMXH7g2Q-aa0THfl0",
  authDomain: "jabber-2.firebaseapp.com",
  projectId: "jabber-2",
  storageBucket: "jabber-2.appspot.com",
  messagingSenderId: "933440777384",
  appId: "1:933440777384:web:9c8c15cf16598e405ae69d"
};

const app = !firebase.apps.length


? firebase.initializeApp (firebaseConfig)

: firebase.app();


const db = app.firestore();

const auth= app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
