importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js'
);
firebase.initializeApp({
  apiKey: 'AIzaSyBa0RQ_ZIYU2hwKvI5YM6UFOuahP8pEcTY',
  authDomain: 'fir-db572.firebaseapp.com',
  projectId: 'fir-db572',
  storageBucket: 'fir-db572.appspot.com',
  messagingSenderId: '886162324851',
  appId: '1:886162324851:web:44f58e6fbbde5ff0d91906',
  measurementId: 'G-ZBWPNQCWSS',
});
const messaging = firebase.messaging();

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('../firebase-messaging-sw.js')
//     .then(function (registration) {
//       console.log('Registration successful, scope is:', registration.scope);
//     })
//     .catch(function (err) {
//       console.log('Service worker registration failed, error:', err);
//     });
// }
