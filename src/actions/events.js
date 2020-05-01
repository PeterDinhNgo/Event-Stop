import uuid from 'uuid';
import database from '../firebase/firebase';

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
        public_event = false
      } = eventData;
      const event = { description, note, amount, createdAt, time, public_event };
      
      if (event.public_event === true) {
        return database.ref(`public_events`).push(event) && database.ref(`users/${uid}/events`).push(event).then((ref) => {
          dispatch(addEvent({
            id: ref.key,
            ...event
          }));
        });
      } else {
          return database.ref(`users/${uid}/events`).push(event).then((ref) => {
              dispatch(addEvent({
                id: ref.key,
                ...event
              }));
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

  export const setPublicEvents = (events) => ({
    type: 'SET_PUBLIC_EVENTS',
    events
  });

  export const startSetPublicEvents = () => {
    return (dispatch) => {
      return database.ref(`public_events`).once('value').then((snapshot) => {
        const events = [];
  
        snapshot.forEach((childSnapshot) => {
          events.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
  
        dispatch(setPublicEvents(events));
      });
    };
  };


