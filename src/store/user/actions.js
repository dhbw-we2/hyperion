import {firestoreAction} from 'vuexfire'
import {userRef} from 'src/services/firebase/db'
import firebase from "firebase/app";


/**
 * gets currentUser from FB
 */
export const getCurrentUser = firestoreAction(({bindFirestoreRef}, id) => {
  return bindFirestoreRef('currentUser', userRef('users', id))
})

/**
 * Clears currentUser in VUEX Store
 */
export const clearCurrentUser = firestoreAction(({unbindFirestoreRef},) => {
  unbindFirestoreRef('currentUser')
})

/**
 * updates userData
 * @param state
 * @param payload
 * @returns {Promise<*>}
 */
export const updateUserData = async function ({state}, payload) {
  return userRef('users', payload.id).update(payload)
}

/**
 * add movie to watchlist
 * @param state
 * @param payload
 * @returns {Promise<*>}
 */
export const updateUserAddWatchlistItem = async function ({state}, payload) {
  return userRef('users', payload.id).update({
    watchListIds: firebase.firestore.FieldValue.arrayUnion(payload.movieId)
  })
}

/**
 * delete movie from watchlist
 * @param state
 * @param payload
 * @returns {Promise<*>}
 */
export const updateUserDeleteWatchlistItem = async function ({state}, payload) {
  return userRef('users', payload.id).update({
    watchListIds: firebase.firestore.FieldValue.arrayRemove(payload.movieId)
  })
}

/**
 * add movie to watchedList
 * @param state
 * @param payload
 * @returns {Promise<*>}
 */
export const updateUserAddWatchedlistItem = async function ({state}, payload) {
  return userRef('users', payload.id).update({
    watchedListIds: firebase.firestore.FieldValue.arrayUnion(payload.movieId)
  })
}

/**
 * delete movie from watchedList
 * @param state
 * @param payload
 * @returns {Promise<*>}
 */
export const updateUserDeleteWatchedlistItem = async function ({state}, payload) {
  return userRef('users', payload.id).update({
    watchedListIds: firebase.firestore.FieldValue.arrayRemove(payload.movieId)
  })
}


/**
 * get all movies in watchList
 * @param state
 * @param payload
 * @returns {Promise<*>}
 */
export const getWholeWatchList = async function ({state}, payload) {
  const doc = await userRef('users', payload.id).get()
  return doc.data().watchListIds
}

/**
 * get all movies in watchedList
 * @param state
 * @param payload
 * @returns {Promise<*>}
 */
export const getWholeWatchedList = async function ({state}, payload) {
  const doc = await userRef('users', payload.id).get()
  return doc.data().watchedListIds
}

/**
 * checks if movie is in watchList
 * @param state
 * @param payload
 * @returns {Promise<*>}
 */
export const checkIfMovieIsInWatchList = async function ({state}, payload) {
  const doc = await userRef('users', payload.id).get()
  return doc.data().watchListIds.includes(payload.movieId)
}

/**
 * checks if movie is in watchedList
 * @param state
 * @param payload
 * @returns {Promise<*>}
 */
export const checkIfMovieIsInWatchedList = async function ({state}, payload) {
  const doc = await userRef('users', payload.id).get()
  return doc.data().watchedListIds.includes(payload.movieId)
}
