import firebase from "./app";

class Auth {
     registerEmail(name, email, pass){
        firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then((userCredential) => {
                userCredential.user.updateProfile({
                    displayName: name
                })
            }).catch(error => {
            console.error(error)
        })

    }
}
export default Auth

