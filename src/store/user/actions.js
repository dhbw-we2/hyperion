import { firestoreAction } from 'vuexfire'
import { userRef } from '../../services/firebase/db.js'
import firebase from "firebase";

/** Get current user from the firestore collection user's
 * via firebase uid
 *
 * @param  {Ojbect} payload.id - Firebase currentUser id
 */
export const getCurrentUser = firestoreAction(({ bindFirestoreRef }, id) => {
  return bindFirestoreRef('currentUser', userRef('users', id))
})

/**
 * @param  {Object} {state}
 * @param  {String} id
 * @param  {Object} payload
 */
export const updateUserData = async function ({ state }, payload) {
  return userRef('users', payload.id).update(payload)
}

export const updateUserAddWatchlistItem = async function ({ state }, payload) {
  return userRef('users', payload.id).update({
    watchListIds: firebase.firestore.FieldValue.arrayUnion(payload.movieId)
  })
}


export const updateUserAddWatchedlistItem = async function ({ state }, payload) {
  return userRef('users', payload.id).update({
    watchedListIds: firebase.firestore.FieldValue.arrayUnion(payload.movieId)
  })
}

export const checkIfMovieIsInWatchList = async function ({ state }, payload) {
  const doc = await userRef('users', payload.id).get()
  const includes = doc.data().watchListIds.includes(payload.movieId)
  return includes
}

export const checkIfMovieIsInWatchedList = async function ({ state }, payload) {
  const doc = await userRef('users', payload.id).get()
  const includes = doc.data().watchedListIds.includes(payload.movieId)
  return includes
}
