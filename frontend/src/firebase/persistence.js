import firebase from "./app";
import camelcase from "camelcase"
const db = firebase.firestore()

class Persistence {


    async uploadProduct(name, description, category, colors, stock, images, price){
        const id = camelcase(name)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")

        const imagesLink = []

             for  (let i = 0; i < images.length; i++) {

                 imagesLink.push(await this.uploadImage(images[i], id, i))
                 console.log(imagesLink)
             }


        await db.collection("products").doc(id).set({
            name: name,
            description: description,
            category: category,
            colors: colors,
            stock: stock,
            images: imagesLink,
            price: price,
        }).then((doc) => {
             console.log('creado correctamente' +doc)
         })
    }

   async uploadImage(img, uid, imgPOS){

        const fileRef = firebase.storage().ref('public/img/' + uid + `/${imgPOS}`)
         await fileRef.put(img)

         return ( await fileRef.getDownloadURL())

    }


}
export default Persistence
