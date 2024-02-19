import { initializeApp } from 'firebase/app';
import {getDatabase} from 'firebase/database';
import { getAuth,GoogleAuthProvider } from "firebase/auth";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAp-bO8yxJc57DmE0l14IcsahUqBAXkUWc",
    authDomain: "textinger-dc9bc.firebaseapp.com",
    projectId: "textinger-dc9bc",
    storageBucket: "textinger-dc9bc.appspot.com",
    messagingSenderId: "915136898336",
    appId: "1:915136898336:web:e2fa291d989e24a0ab6345",
    measurementId: "G-MYFD6GC103"
  };

  const firebaseApp = initializeApp(firebaseConfig)

  const db = getDatabase(firebaseApp)
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider()

  export {auth,provider}
  export default db;