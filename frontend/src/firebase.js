import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const app = firebase.initializeApp ({
    apiKey: "AIzaSyC1MUs_x9ik3ZZ7AS1SlYxtDuhjl2QFm6I",
    authDomain: "helpmate-4ad4c.firebaseapp.com",
    projectId: "helpmate-4ad4c",
    storageBucket: "helpmate-4ad4c.appspot.com",
    messagingSenderId: "604737241673",
    appId: "1:604737241673:web:21b6560168c69fcc5f3598",
    measurementId: "G-K697680DGG"
})

export const auth = app.auth(app)
export default app