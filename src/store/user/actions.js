import {firestoreAction} from 'vuexfire'
import {userRef} from 'src/services/firebase/db'
import firebase from "firebase/app";

export const getCurrentUser = firestoreAction(({bindFirestoreRef}, id) => {
  return bindFirestoreRef('currentUser', userRef('users', id))
})

export const clearCurrentUser = firestoreAction(({unbindFirestoreRef},) => {
  unbindFirestoreRef('currentUser')
})

export const updateUserData = async function ({state}, payload) {
  return userRef('users', payload.id).update(payload)
}


export const updateUserAddWatchlistItem = async function ({state}, payload) {
  return userRef('users', payload.id).update({
    watchListIds: firebase.firestore.FieldValue.arrayUnion(payload.movieId)
  })
}

export const updateUserDeleteWatchlistItem = async function ({state}, payload) {
  return userRef('users', payload.id).update({
    watchListIds: firebase.firestore.FieldValue.arrayRemove(payload.movieId)
  })
}


export const updateUserAddWatchedlistItem = async function ({state}, payload) {
  return userRef('users', payload.id).update({
    watchedListIds: firebase.firestore.FieldValue.arrayUnion(payload.movieId)
  })
}

export const updateUserDeleteWatchedlistItem = async function ({state}, payload) {
  return userRef('users', payload.id).update({
    watchedListIds: firebase.firestore.FieldValue.arrayRemove(payload.movieId)
  })
}

export const getWholeWatchList = async function ({state}, payload) {
  const doc = await userRef('users', payload.id).get()
  return doc.data().watchListIds
}

export const getWholeWatchedList = async function ({state}, payload) {
  const doc = await userRef('users', payload.id).get()
  return doc.data().watchedListIds
}


export const checkIfMovieIsInWatchList = async function ({state}, payload) {
  const doc = await userRef('users', payload.id).get()
  return doc.data().watchListIds.includes(payload.movieId)
}

export const checkIfMovieIsInWatchedList = async function ({state}, payload) {
  const doc = await userRef('users', payload.id).get()
  return doc.data().watchedListIds.includes(payload.movieId)
}
