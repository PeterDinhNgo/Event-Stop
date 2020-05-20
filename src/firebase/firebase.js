import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const storage = firebase.storage().ref();





export { firebase, googleAuthProvider, database as default };




//child_removed
// database.ref('events').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// })

// //child_changed fires when one of our children changes
// database.ref('events').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// })

// //child_added fires when we add a child
// database.ref('events').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// })


// // Subscription to changes on events array data.
// database.ref('events').on('value', (snapshot) => {
//     const events = [];

//     snapshot.forEach((childSnapshot) => {
//         events.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         })
//     })
//     console.log(events);
//  });


// // database.ref('events')
// //     .once('value')
// //     .then((snapshot) => {
// //         const events = [];

// //         snapshot.forEach((childSnapshot) => {
// //             events.push({
// //                 id: childSnapshot.key,
// //                 ...childSnapshot.val()
// //             })
// //         })
// //         console.log(events);
// //     })

// // database.ref('events').push({
// //     title: 'F1 Racing',
// //     location: 'Brisbane'
// // })

// // database.ref('events/-M4gaoBN0Ww29N-9HgRK').update({
// //     location: 'Hamilton'
// // })





// // const events = [
// //     {
// //     title: 'F1 Racing',
// //     location: 'Brisbane',
// //     description: 'F1 Racing at Hamilton for 2 Weekends over Christmas.'
// //     }, 
// //     {
// //         title: 'Sleep Over',
// //         location: 'Tasmania',
// //         description: 'Sleepy People.' 
// //     }
// // ];

// // database.ref('events').set(events);


// // const onValueChange = database.ref().on('value', (snapshot) => {
// //     console.log(snapshot.val());
// // }, (e) => {
// //     console.log('Error with fetching data.', e)
// // });

// // setTimeout(() => {
// //     database.ref('isSingle').set(
// //         true
// //     )
// // }, 3500);

// // // database.ref().off(onValueChange);

// // database.ref().on('value', (snapshot) => {
// //     const val = snapshot.val();
// //     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}.`);
// // }, (e) => {
// //     console.log('Error with fetching data.', e)
// // });

// // database.ref().set({
// //     name: 'Peter Ngo',
// //     isSingle: true,
// //     stressLevel: 1,
// //     job: {
// //         title: 'Software Developer',
// //         company: 'Peloton'
// //     },
// //     location: {
// //         city: 'Brisbane',
// //         country: 'Australia'
// //     }
// // }).then(() => {
// //     console.log('Data is saved');
// // }).catch((e) => {
// //     console.log('This failed.', e)
// // });

// // database.ref().update({
// //     stressLevel: 10,
// //     'job/company': 'CBA',
// //     'location/city': 'Melbourne'
// // });




// // database.ref('isSingle').set(null);

// //database.ref().set('Bippity Boopity')

// // database.ref('isSingle').set(false);
// // database.ref('location/city').set('Melbourne');

// // setup then and catch
// // make sure catch actually works
// // switch rules to be open
// // make sure runs

// // database.ref('events').set({
// //         price: 100,
// //         privacy: true
// // }). then(() => {
// //     console.log('works');
// // }). catch((e) => {
// //     console.log('Nope', e);
// // });

// // database.ref('isSingle').remove().then(() => {
// //     console.log('Remove succeeded.')
// // }).catch((e) => {
// //     console.log('Remove failed', e)
// // });




