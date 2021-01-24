import firebase from "./app";

class Auth {
     registerEmail(name, email, pass){
        firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then((userCredential) => {
                userCredential.user.updateProfile({
                    displayName: name
                })

                userCredential.user.getIdTokenResult()
                userCredential.user.sendEmailVerification()
            }).catch(error => {
            console.error(error)
        })

    }
}
export default Auth

