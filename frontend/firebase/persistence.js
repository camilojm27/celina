import firebase from "./app";
import camelcase from "camelcase"
import {toast} from "react-toastify";
const db = firebase.firestore()

class Persistence {

//TODO: Actualizar estas funciones con promesas y manejar mensajes en interfaz
    async uploadProduct(name, description, category, colors, stock, images, price){
        const id = camelcase(name)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")

        const imagesLink = []

             for  (let i = 0; i < images.length; i++) {

                 imagesLink.push(await this.uploadImage(images[i], id, i))
                 console.log(imagesLink)
             }

            const time = firebase.firestore.FieldValue.serverTimestamp()
        await db.collection("products").doc(id).set({
            name: name,
            description: description,
            category: category,
            colors: colors,
            stock: stock,
            images: imagesLink,
            price: price,
            created: time,
            updated: time
        }).then(
            () => toast.success("Producto creado correctamente")

        )
            .catch((e) => {
                toast.error("Error" + e.message)
            })
    }

    async updateProduct(id, name, description, category, colors, stock, price){


        await db.collection("products").doc(id).update({
            name: name,
            description: description,
            category: category,
            colors: colors,
            stock: stock,
            price: price,
            updated: firebase.firestore.FieldValue.serverTimestamp()

        }).then(
            () => toast.success("Producto actualizado correctamente")

        )
            .catch((e) => {
                toast.error("Error" + e.message)
            })
    }

   async uploadImage(img, uid, imgPOS){

        const fileRef = firebase.storage().ref('public/img/' + uid + `/${imgPOS}`)
         await fileRef.put(img)

         return ( await fileRef.getDownloadURL())

    }


}
export default Persistence
