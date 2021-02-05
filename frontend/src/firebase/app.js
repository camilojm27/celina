import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

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
//
// firebase.auth().onAuthStateChanged(user => {
//    // let profile = document.getElementById('profile')
//     //let username = document.getElementById('username')
//
//     if (user) {
//
//         if (user.photoURL) {
//             //profile.src = user.photoURL
//             //username.innerText = user.displayName
//         }
//     } else {
//         //profile.src = 'https://firebasestorage.googleapis.com/v0/b/celina-tienda.appspot.com/o/assets%2Fuser1.svg?alt=media&token=4f2fd9c4-ecb3-4013-ad07-68224d89b97f'
//     }
// })

export default firebase

