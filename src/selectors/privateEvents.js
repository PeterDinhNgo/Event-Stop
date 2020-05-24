import moment from 'moment';

const privateEvents = (events, { text, startDate, endDate }) => {
    return events.filter((event) => {
        const createdAtMoment = moment(event.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        const textMatch = event.description.toLowerCase().includes(text.toLowerCase());
        const publicMatch = event.public_event === true;

        return startDateMatch && endDateMatch && textMatch && publicMatch;
    })
}

export default privateEvents;