import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

 //inputs
 const email = document.querySelector('.js-signup-email').value;
 const password = document.querySelector('.js-signup-password').value;
 const submit = document.querySelector('.js-signup-btn');

 //submit button
 submit.addEventListener('click', (event) => {
  event.preventDefault();

  const email = document.querySelector('.js-signup-email').value;
  const password = document.querySelector('.js-signup-password').value;
  
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    alert('Creating Account...')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });
 })


