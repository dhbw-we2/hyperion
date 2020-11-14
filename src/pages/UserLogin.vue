<template>
  <div class="userlogin">

    <!-- The surrounding HTML is left untouched by FirebaseUI.
     Your app may use that space for branding, controls and other customizations.-->
    <h1>Welcome to My Awesome App</h1>
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading...</div>

    <!-- registration for new users -->
    <h1>Sign Up</h1>
    <input type="text" placeholder="Username" v-model="username"/>
    <input type="text" placeholder="Password" v-model="password"/>
    <input
      type="text"
      placeholder="Password (repeat)"
      v-model="password_repeat"
    />
    <input type="button" @click="signUp" value="Sign Up"/>
    <p v-if="msg">{{ msg }}</p>

  </div>
</template>

<script>

export default {
  name: "UserLogin",
  data: function () {
    var firebase = require('firebase');
    var firebaseui = require('firebaseui');

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    ui.start('#firebaseui-auth-container', {
        signInOptions: [
          {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
          }
        ]
      },
    )
    // Is there an email link sign-in?
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      ui.start('#firebaseui-auth-container', uiConfig);
    }
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());


    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        uiShown: function () {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader').style.display = 'none';
        }
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      signInSuccessUrl: '<url-to-redirect-to-on-success>',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: '<your-tos-url>',
      // Privacy policy url.
      privacyPolicyUrl: '<your-privacy-policy-url>'
    };
// The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
    return {
      username: '',
      password: '',
      password_repeat: '',
      msg: ''
    };
  },

  // create registration view for new users
  methods: {
    async signUp() {
      try {
        const credentials = {
          username: this.username,
          password: this.password,
          password_repeat: this.password_repeat
        };
        const response = await firebase.auth().signUp(credentials);
        this.msg = response.msg;
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    }
  },
}
</script>


