import firebase from 'firebase/app'
import 'firebase/firestore'

let config;
config = require('../config.json')

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId
}

const db = firebase.initializeApp(firebaseConfig).firestore()
export default db

const { TimeStamp, GeoPoint } = firebase.firestore
export { TimeStamp, GeoPoint }
