// Remember, we have access to our Vue instance not using
// an arrow function in our actions file. This allows us
// to create a scoped reference to our firebaseService - $fb
// That was assigned to the Vue instance earlier in our serviceConnection
// boot file.

import User from '../../models/User.js'

/**
 * Adds User to FB collection
 * @param state
 * @param userRef
 * @returns {Promise<*>}
 */
export const addUserToUsersCollection = async function (state, userRef) {
  const
    {email} = state,
    user = new User({email})
  return userRef.set(user)
}

/**
 * Creates new user
 * @param $root
 * @param data
 * @returns {Promise<*>}
 */
export const createNewUser = async function ($root, data) {
  const $fb = this.$fb
  const {email, password} = data
  const fbAuthResponse = await $fb.createUserWithEmail(email, password)
  const id = fbAuthResponse.user.uid
  const userRef = $fb.userRef('users', id)
  return addUserToUsersCollection({email}, userRef)
}

/**
 * function to login user with email
 * @param $root
 * @param payload
 * @returns {Promise<*>}
 */
export const loginUser = async function ($root, payload) {
  const $fb = this.$fb
  const {email, password} = payload
  return $fb.loginWithEmail(email, password)
}

/**
 * logout user
 * @param $root
 * @param payload
 * @returns {Promise<void>}
 */
export const logoutUser = async function ($root, payload) {
  const $fb = this.$fb
  await $fb.logoutUser()
}

/**
 * routes user to login page if required
 */
export function routeUserToAuth() {
  this.$router.push({
    path: '/auth/login'
  })
}
