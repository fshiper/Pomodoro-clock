import React from 'react'
const TimerDisplay = props => {
    return (
      <div id="timer-label" className="col mx-1 mt-2 p-3 text-center shadow">
        <h3>{props.label}</h3>
        <div >
          <div id="time-left" className="display-3">{props.timer}</div>
        </div>
      </div>
    );
  };
  export default TimerDisplay;