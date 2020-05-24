const eventsReducerDefaultState = [];
                        // Default Value = Empty Array
const eventsReducer = (state = eventsReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EVENT':
            return [
                ...state, //Array spread operator
                action.event
            ];

        case 'REMOVE_EVENT':
            return state.filter(({ id }) => id !== action.id);

        case 'EDIT_EVENT':
            //1 - go through every expense in the array finding the match
            //2 - when we find a match edit the amount
            return state.map((event) => {
                if(event.id === action.id){
                    return {
                        ...event, // grab all existing properties
                        ...action.updates // override any updates passed down and make it the new value
                    }; // return a new object
                } else {
                    return event;
                };
            });
        case 'SET_EVENTS':
            return action.events;  
        case 'SET_PUBLIC_EVENTS':
            return action.publicEvents;

        default:
            return state;
    }
};

export default eventsReducer;