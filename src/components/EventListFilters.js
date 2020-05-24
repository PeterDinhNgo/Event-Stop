import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';
import { Container, Row, Col } from 'reactstrap';

export class EventListFilters extends React.Component {
    state = {
      calendarFocused: null
    };
    onDatesChange = ({ startDate, endDate }) => {
      this.props.setStartDate(startDate);
      this.props.setEndDate(endDate);
    };
    onFocusChange = (calendarFocused) => {
      this.setState(() => ({ calendarFocused }));
    }
    onTextChange = (e) => {
      this.props.setTextFilter(e.target.value);
    };
    onSortChange = (e) => {
      if (e.target.value === 'date') {
        this.props.sortByDate();
      } else if (e.target.value === 'amount') {
        this.props.sortByAmount();
      }
    };
    render() {
      return (
        <div>
          <Container>
          <Row>
          
          <Col xs={{ size: 12, order: 1}} md={{ size: 6, order: 1 }} className="input-field__padder">
          <input
            className="input-field"
            type="text"
            placeholder="search events"
            value={this.props.filters.text}
            onChange={this.onTextChange}
          />
    
          <select
            className="input-field__dropdown"
            value={this.props.filters.sortBy}
            onChange={this.onSortChange}
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
          </Col>
          
          <Col xs={{size: 12, order: 2}} md={{ size: 6, order: 2 }} className="input-field__padder">
          <DateRangePicker
            startDate={this.props.filters.startDate}
            endDate={this.props.filters.endDate}
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            showClearDates={true}
            numberOfMonths={1}
            isOutsideRange={() => false}
            
          />
          </Col>
          </Row>
          </Container>
        </div>
      );
    }
  };
  
  const mapStateToProps = (state) => ({
    filters: state.filters
  });
  
  const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(EventListFilters);