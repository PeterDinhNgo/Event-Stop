import { addEvent, editEvent, removeEvent } from '../../actions/events';

test('Should setup remove event action object', () => {
    const action = removeEvent({id: '12345'});
    expect(action).toEqual({ 
        type: 'REMOVE_EVENT',
        id: '12345'
    });
});

test('Should setup edit event action object', () => {
    const action = editEvent('12345', { note: '123456' });
    expect(action).toEqual({
        type: 'EDIT_EVENT',
        id: '12345',
        updates: {
            note: '123456'
        }
    });
});

test('Should setup add event action object with provided values', () => {
    const eventData = {
        description: 'John Music Festival',
        amount: 1000,
        createdAt: 1000,
        note: 'Welcome to the party'
    };
    const action = addEvent(eventData);
    expect(action).toEqual({ 
        type: 'ADD_EVENT',
        event: {
            ...eventData,
            id: expect.any(String)
        }
    })
});

test('should setup add event action object with default values', () => {
    const eventData = {
        description: '', 
        note: '', 
        amount: 0, 
        createdAt: 0
    };
    const action = addEvent();
    expect(action).toEqual({
        type: 'ADD_EVENT',
        event: {
            ...eventData,
            id: expect.any(String)
        }
    })
});

