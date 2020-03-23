const btnLogin = document.getElementById('login');
const logOutBtn = document.getElementById('logout');
const loginUser = document.getElementById('login-user');
const imgAvatar = document.getElementById('img-avatar');
const firebaseConfig = {
  apiKey: 'AIzaSyDGTo41PYmovSD_uhkJTLMxEvmoutkmdzw',
  authDomain: 'piskel-9234c.firebaseapp.com',
  databaseURL: 'https://piskel-9234c.firebaseio.com',
  projectId: 'piskel-9234c',
  storageBucket: 'piskel-9234c.appspot.com',
  messagingSenderId: '967280018893',
  appId: '1:967280018893:web:f0d89886e2745518a7f084',
};

btnLogin.addEventListener('click', googleSignIn);
logOutBtn.addEventListener('click', googleSignOut);

/* eslint-disable */
/* loading "firebase" is due to the dependency specified in index.html" */
export default function createAuth() {
  firebase.initializeApp(firebaseConfig);
}

function googleSignIn() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(() => {
    const user = firebase.auth().currentUser;

    if (user != null) {
      user.providerData.forEach((profile) => {
        loginUser.innerText = profile.displayName;
        imgAvatar.src = profile.photoURL;
        imgAvatar.hidden = false;
        loginUser.hidden = false;
        btnLogin.hidden = true;
        logOutBtn.hidden = false;
      });
    }
  }).catch((error) => {
    console.log(error);
  });
}

function googleSignOut() {
  firebase.auth().signOut().then(() => {
    logOutBtn.hidden = true;
    imgAvatar.hidden = true;
    loginUser.hidden = true;
    imgAvatar.src = '';
    loginUser.innerText = '';
    btnLogin.hidden = false;
  }).catch((error) => {
    console.log(error);
  });
}
