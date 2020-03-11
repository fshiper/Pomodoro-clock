import React from "react";
const TimerSetup = props => {
  return (
    <div
      id={props.label + "-label"}
      className="col py-2 mx-1 shadow rounded text-capitalize text-center"
    >
      {props.label} length
      <div className="container m-0 p-0">
        <div className="row">
          <div className="col">
            <button
              id={props.label + "-increment"}
              className="remove_button_css"
              onClick={props.increaseTimeLength}
            >
              <i className="fa fa-arrow-circle-o-up"></i>
            </button>
          </div>
          <div id={props.label + "-length"} className="col">
            {props.length}
          </div>
          <div className="col">
            <button
              id={props.label + "-decrement"}
              className="remove_button_css"
              onClick={props.decreaseTimeLength}
            >
              <i className="fa fa-arrow-circle-o-down" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TimerSetup;
