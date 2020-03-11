import React, { useReducer, useState, useEffect } from "react";
import useInterval from "./components/useInterval";
import TimerDisplay from "./components/TimerDisplay";
import TimerSetup from "./components/TimerSetup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faPauseCircle,
  faSyncAlt
} from "@fortawesome/free-solid-svg-icons";

const initialState = {
  breakLength: 5,
  sessionLength: 25,
  isRunning: false,
  isBreak: false
};

const TIME_INC = "TIME_INC";
const TIME_DEC = "TIME_DEC";
const START_PAUSE = "START_PAUSE";
const SWITCH = "SWITCH";
const RESET = "RESET";
const TIME_UP_LIMIT = 60;
const TIME_DOWN_LIMIT = 1;
const TIMER_STEP = 1;

const increaseTimeLength = timeType => {
  return {
    type: TIME_INC,
    timeType: timeType
  };
};

const decreaseTimeLength = timeType => {
  return {
    type: TIME_DEC,
    timeType: timeType
  };
};
const playBeep = () => {
  const beep = document.getElementById("beep");
  beep.currentTime = 0;
  beep.play();
};
const pauseBeep = () => {
  const beep = document.getElementById("beep");
  beep.pause();
  beep.currentTime = 0;
};

const reducer = (state, action) => {
  switch (action.type) {
    case TIME_INC:
      return state[action.timeType] < TIME_UP_LIMIT
        ? Object.assign({}, state, {
            [action.timeType]: state[action.timeType] + TIMER_STEP
          })
        : state;
    case TIME_DEC:
      return state[action.timeType] > TIME_DOWN_LIMIT
        ? Object.assign({}, state, {
            [action.timeType]: state[action.timeType] - TIMER_STEP
          })
        : state;
    case START_PAUSE:
      return Object.assign({}, state, { isRunning: !state.isRunning });
    case SWITCH:
      return Object.assign({}, state, { isBreak: !state.isBreak });
    case RESET:
      return initialState;
    default:
      return state;
  }
};
const PomodoroClock = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { breakLength, sessionLength, isRunning, isBreak } = state;
  const [timer, setTimer] = useState(1500);

  useEffect(() => {
    setTimer((isBreak ? breakLength : sessionLength) * 60);
  }, [isBreak]);

  useEffect(() => {
    if (timer === 0) {
      playBeep();
      dispatch({ type: SWITCH });
    }
  }, [timer]);

  useInterval(
    () => {
      setTimer(timer - 1);
    },
    isRunning && timer > 0 ? 1000 : null
  );
  const increaseTime = type => {
    if (!isRunning && timer < 60 * 60) {
      if (type === "sessionLength") setTimer(timer + 60);
      dispatch(increaseTimeLength(type));
    }
  };
  const decreaseTime = type => {
    if (!isRunning && timer > 60) {
      if (type === "sessionLength") setTimer(timer - 60);
      dispatch(decreaseTimeLength(type));
    }
  };
  const clockify = () => {
    let minutes = Math.floor(timer / 60);
    let seconds = timer - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  };

  return (
    <div id="pomodoro" className="container-fluid mt-4 py-3 shadow">
      <div className="text-center">
        <h4 className="">Pomodoro clock</h4>
      </div>
      <div className="container p-0">
        <div className="row mx-1">
          <TimerSetup
            label={"break"}
            length={breakLength}
            increaseTimeLength={() => increaseTime("breakLength")}
            decreaseTimeLength={() => decreaseTime("breakLength")}
          />
          <TimerSetup
            label={"session"}
            length={sessionLength}
            increaseTimeLength={() => increaseTime("sessionLength")}
            decreaseTimeLength={() => decreaseTime("sessionLength")}
          />
        </div>
        <div className="row mx-1 mb-1">
          <TimerDisplay
            timer={clockify()}
            label={isBreak ? "Break" : "Session"}
          />
        </div>
        <div className="row justify-content-center mx-1 mb-2">
          <div className="col-5 text-center pt-2">
            <button
              id="start_stop"
              onClick={() => {
                dispatch({ type: START_PAUSE });
              }}
              className="remove_button_css"
            >
              <FontAwesomeIcon icon={faPlayCircle} />
              <FontAwesomeIcon icon={faPauseCircle} />
            </button>
            <button
              id="reset"
              className="remove_button_css"
              onClick={() => {
                dispatch({ type: RESET });
                setTimer(1500);
                pauseBeep();
              }}
            >
              <FontAwesomeIcon icon={faSyncAlt} />
            </button>
          </div>
        </div>
        <audio preload="auto" id="beep" src="https://goo.gl/65cBl1" />
      </div>
    </div>
  );
};
export default PomodoroClock;
