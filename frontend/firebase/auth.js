import firebase from "./app";

import { toast } from 'react-toastify';
import Axios from 'axios'
import {API} from '../redux/constants/backend'
// Todo: Crear un hook para el manejo de estado
class Auth {
    static getAuth(){
        return firebase.auth()
    }
    static async registerEmail(name, email, pass) {
        return new Promise((resolve, reject) => {
            this.getAuth().createUserWithEmailAndPassword(email, pass)
                .then((userCredential) => {
                    userCredential.user.updateProfile({
                        displayName: name
                    })

                    Axios.post(`${API}/users/`, {
                        name,
                        email,
                        uid: userCredential.user.uid
                    })

                    toast.success("Registro creado correctamente")
                    resolve(this.userPropsToJson(userCredential))


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

            this.getAuth().signInWithEmailAndPassword(email, pass)
                .then((user) => {
                    toast.success(`${user.user.displayName} Bienvenid@ a Celina`)

                    resolve(this.userPropsToJson(user))

                }).catch((e) => {
                    toast.error('Email o contraseña incorrecta')
                    console.error(e)

                    reject(e)
                })

        })
    }

    static loginWithGoogle() {
        return new Promise(((resolve, reject) => {
            const provider = new firebase.auth.GoogleAuthProvider()

            this.getAuth().signInWithPopup(provider).then(result => {
                toast.success(`Bienvenido a celina ${result.user.displayName}`)

                resolve(this.userPropsToJson(result))
            }).catch((e) => {
                toast.error(e.message)
                console.error(e)
                reject(false)
            })



        }))
    }
    static isLogIn() {
        let user = this.getAuth().currentUser
        return !!user;
    }

    static logOut() {
        this.getAuth().signOut()
            .then(() => {
                toast.info('Se ha cerrado sesión correctamnete')
                return true
            })
            .catch(() => { return false })
    }

    static async userPropsToJson(userCredential) {
        try {
            const token = await userCredential.user.getIdToken()
            return {
                name: userCredential.user.displayName,
                email: userCredential.user.email,
                picture: userCredential.user.photoURL,
                token: token
            }

        }
        catch (e) {
            console.log(e)
        }


    }

}

export default Auth

