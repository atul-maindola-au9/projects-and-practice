import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyBiyF3tN2gApIKoIuLB8j27wX_TS3jP-IM',
	authDomain: 'shopit-166d4.firebaseapp.com',
	projectId: 'shopit-166d4',
	storageBucket: 'shopit-166d4.appspot.com',
	messagingSenderId: '1066039366659',
	appId: '1:1066039366659:web:0eded783e715d70ec2aa36',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
