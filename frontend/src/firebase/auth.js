import firebase from "./app";

import {toast} from 'react-toastify';

 class  Auth {
     static registerEmail(name, email, pass) {
        return new Promise((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(email, pass)
                .then((userCredential) => {
                    userCredential.user.updateProfile({
                        displayName: name
                    })
                    toast.success("Registro creado correctamente")
                    resolve(this.json(userCredential))


                    //userCredential.user.sendEmailVerification()
                }).catch(error => {
                console.error(error)
                toast.error("No fue posible registrarte en este momento :(" + error)
                reject(error)
            })
        })


    }

     static loginWithEmail(email, pass) {
        return new Promise((resolve, reject) => {

            firebase.auth().signInWithEmailAndPassword(email, pass)
                .then((user) => {
                    toast.success(`${user.user.displayName} Bienvenid@ a Celina`)

                    resolve(this.json(user))

                }).catch((e) => {
                toast.error('Email o contraseña incorrecta')
                console.error(e)

                reject(e)
            })

        })
    }

     static loginWithGoogle(){
        return new Promise(((resolve, reject) => {
            const provider = new firebase.auth.GoogleAuthProvider()

            firebase.auth().signInWithPopup(provider).then(result => {
               toast.success(`Bienvenido a celina ${result.user.displayName}`)
                resolve(this.json(result))
            }).catch((e) => {
                toast.error(e.message)
                console.error(e)
                reject(false)
            })



        }))
    }
    static isLogIn(){
        let user = firebase.auth().currentUser
        console.log(user)
        return !!user;
    }

    static logOut(){
         firebase.auth().signOut()
             .then(()=> {
                 toast.info('Se ha cerrado sesión correctamnete')
                 return true})
             .catch(()=> {return false })
    }

   static json(userCredential){
         return {
             name: userCredential.user.displayName,
             email: userCredential.user.email,
             picture:  userCredential.user.photoURL,
         }
    }

}

export default Auth

