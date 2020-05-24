import uuid from 'uuid';
import database from '../firebase/firebase';
import { storage } from '../firebase/firebase';


// component calls action generator
// action generator returns object
// component dispatches object
// redux store changes

// component calls action generator
// action generator returns function
// component dispatches function(?) // redux by default does not let you dispatch functions
// function runs (redux will execute internally) (firebase code goes here)

export const addEvent = (event) => ({
    type: 'ADD_EVENT',
    event
});

export const startAddEvent = (eventData = {}) => {
    return (dispatch, getState) => {
      const uid = getState().auth.uid;
      const {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0,
        time = '',
        public_event = false,
        picture = '',
        pictureUrl = ''
      } = eventData;
      const event = { description, note, amount, createdAt, time, public_event, picture, pictureUrl };
      
      if (event.public_event === true) {
        storage.child(`users/${uid}/${createdAt}`).put(picture).then((snapshot) => {
          //console.log('Uploaded a blob or file!');
          const imgurl = snapshot.metadata.downloadURLs[0];
          //console.log(imgurl);
          event.pictureUrl = imgurl;

          return database.ref(`public_events`).push(event) && database.ref(`users/${uid}/events`).push(event).then((ref) => {

            dispatch(addEvent({
              id: ref.key,
              ...event
            }));
          }).catch((e) => {
            console.log(e);
          })

        });

      } else {
          storage.child(`users/${uid}/${createdAt}`).put(picture).then((snapshot) => {
            const imgurl = snapshot.metadata.downloadURLs[0];
            event.pictureUrl = imgurl;
            return database.ref(`users/${uid}/events`).push(event).then((ref) => {
              dispatch(addEvent({
                id: ref.key,
                ...event
              }));
            });
          });     
        }
    };
  };

export const removeEvent = ({ id }={}) => ({
    type: 'REMOVE_EVENT',
    id
});

export const startRemoveEvent = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/events/${id}`).remove().then(() => {
            dispatch(removeEvent({ id }));
        });
    };
};



export const editEvent = (id, updates) => ({ //implicitly return an object
    type: 'EDIT_EVENT',
    id,
    updates
});

export const startEditEvent = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/events/${id}`).update(updates).then(() => {
            dispatch(editEvent(id, updates));
        })
    }
}


export const setEvents = (events) => ({
    type: 'SET_EVENTS',
    events
  });
  
  export const startSetEvents = () => {
    return (dispatch, getState) => {
      const uid = getState().auth.uid;
      return database.ref(`users/${uid}/events`).once('value').then((snapshot) => {
        const events = [];
  
        snapshot.forEach((childSnapshot) => {
          events.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
  
        dispatch(setEvents(events));
      });
    };
  };

  export const setPublicEvents = (publicEvents) => ({
    type: 'SET_PUBLIC_EVENTS',
    publicEvents
  });

  export const startSetPublicEvents = () => {
    return (dispatch) => {
      return database.ref(`public_events`).once('value').then((snapshot) => {
        const publicEvents = [];
  
        snapshot.forEach((childSnapshot) => {
          publicEvents.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
  
        dispatch(setPublicEvents(publicEvents));
      });
    };
  };



