import React from 'react';
import { connect } from 'react-redux';
import PublicEventListItem from './PublicEventListItem';
import getVisibleEvents from '../selectors/selectEvents';


export const PublicEventList = (props) => (
  <div>    
     <div className="p-3 my-2 rounded bg-docs-transparent-grid">
     <div className="row">
    {
      props.events.length === 0 ? (
        <h1>No events</h1>
      ) : (
          props.events.map((event) => {
            return <div key={event.id} className="col-sm-4">
                            <div className="card">
                                <div className="card-body">
                                <PublicEventListItem key={event.id} {...event} />
                                </div>
                            </div>
                    </div>      
          })
        )
    }
    </div>
  
    </div>
    
  </div>
  
);

const mapStateToProps = (state) => {
  return {
    events: getVisibleEvents(state.events, state.filters)
  };
};

export default connect(mapStateToProps)(PublicEventList);
