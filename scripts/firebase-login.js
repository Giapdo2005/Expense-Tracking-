import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

 const firebaseConfig = {
   apiKey: "AIzaSyAyoJNHTBmtuJ31qGQL86ZSW4en7MtBG3o",
   authDomain: "expense-tracking-2e017.firebaseapp.com",
   projectId: "expense-tracking-2e017",
   storageBucket: "expense-tracking-2e017.appspot.com",
   messagingSenderId: "455005252770",
   appId: "1:455005252770:web:46707490602bf6fc7cbbfb",
   measurementId: "G-QHESXB9B8J"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);

 const submit = document.querySelector('.js-submit-btn');

 submit.addEventListener('click', (event) => {
  event.preventDefault();

  const email = document.querySelector('.js-login-email').value;
  const password = document.querySelector('.js-login-password').value;
  
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    alert('Logging In..')
    window.location.href = 'expense.html'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });
 })


