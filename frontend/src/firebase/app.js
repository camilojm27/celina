import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyApUnyKelyiZfrNhYe3A-JCImpqklU21nE",
    authDomain: "celina-tienda.firebaseapp.com",
    projectId: "celina-tienda",
    storageBucket: "celina-tienda.appspot.com",
    messagingSenderId: "420268254945",
    appId: "1:420268254945:web:6745bb9529da42423db9a0",
    measurementId: "G-KKEWJ5HN3N"
};

if(!firebase.apps.length){
    try {
        firebase.initializeApp(firebaseConfig);
        //firebase.analytics();
    }
    catch (err) {
        console.error('Firebase initialization error raised', err.stack)
    }
}

export default firebase

