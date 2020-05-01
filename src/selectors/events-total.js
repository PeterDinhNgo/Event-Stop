export default (events) => {
    if (events.length === 0) {
        return 0;
    } else {
        return events.map((event) => event.amount).reduce((sum, value) => {
            return sum + value;
        }, 0);
    }
}