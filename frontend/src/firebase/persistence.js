import firebase from "./app";
import camelcase from "camelcase"
const db = firebase.firestore()

class Persistence {


    async uploadProduct(name, description, category, colors, stock, images, price){
        const id = camelcase(name)
        const imagesLink = images.map((img, index) => this.uploadImage(img, id, index))
        await db.collection("products").doc(id).set({
            name: name,
            description: description,
            category: category,
            colors: colors,
            stock: stock,
            images: imagesLink,
            price: price,
        })
    }

   async uploadImage(img, uid, imgPOS){

        const fileRef = firebase.storage().ref('public/img/' + uid + `/${imgPOS}`)
         fileRef.put(img)

         return ( await fileRef.getDownloadURL())

    }


}
export default Persistence
