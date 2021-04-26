importScripts('https://www.gstatic.com/firebasejs/8.4.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.2/firebase-messaging.js');
firebase.initializeApp({
  apiKey: 'AIzaSyAul-rgjkwHK3OsGuvq0rCjbzRWEiL-z7g',
  authDomain: 'blwahda-6a522.firebaseapp.com',
  databaseURL: 'https://blwahda-6a522.firebaseio.com',
  projectId: 'blwahda-6a522',
  storageBucket: 'blwahda-6a522.appspot.com',
  messagingSenderId: '503666408165',
  appId: '1:503666408165:web:3f5038634210278cc0b20c',
  measurementId: 'G-8RJ5SLXNGG',
});
const messaging = firebase.messaging();
// messaging.onBackgroundMessage(() => {});

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
