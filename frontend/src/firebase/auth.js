import firebase from "./app";

import {toast} from 'react-toastify';

class Auth {
    registerEmail(name, email, pass) {
        return new Promise((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(email, pass)
                .then((userCredential) => {
                    userCredential.user.updateProfile({
                        displayName: name
                    })
                    toast.success("Registro creado correctamente")
                    resolve(true)

                    //userCredential.user.sendEmailVerification()
                }).catch(error => {
                console.error(error)
                toast.error("No fue posible registrarte en este momento :(" + error)
                reject(false)
            })
        })


    }

    loginWithEmail(email, pass) {
        return new Promise((resolve, reject) => {

            firebase.auth().signInWithEmailAndPassword(email, pass)
                .then((user) => {
                    toast.success(`${user.user.displayName} Bienvenid@ a Celina`)
                    resolve(true)
                }).catch((e) => {
                toast.error('Email o contraseña incorrecta')
                console.error(e)

                reject(false)
            })

        })
    }

    loginWithGoogle(){
        return new Promise(((resolve, reject) => {
            const provider = new firebase.auth.GoogleAuthProvider()

            firebase.auth().signInWithPopup(provider).then(result => {
               toast.success(`Bienvenido a celina ${result.user.displayName}`)
                resolve(true)
            }).catch((e) => {
                toast.error(e.message)
                console.error(e)
                reject(false)
            })



        }))
    }

}

export default Auth

