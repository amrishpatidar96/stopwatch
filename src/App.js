import "./App.css";
import { useState } from "react";

function App() {
  const [time, setTime] = useState({ min: 0, sec: 0 });
  const [btnClicked,setBtnClicked] = useState(false);

  let setTimer = (state) => {
    //console.log(state);
    if (state.min === 0 && state.sec === 0) {
      return {
        min: state.min,
        sec: state.sec,
      };
    }
    if (state.min > 0 && state.sec === 0) {
      return {
        min: state.min - 1,
        sec: 59,
      };
    }
    return {
      min: state.min,
      sec: state.sec - 1,
    };
  };

  let ChangeHandler = (event) => {
    //console.log(event);

    if (event.target.name === "min")
      setTime((state) => {
        return {
          ...state,
          min: event.target.value,
        };
      });

    if (event.target.name === "sec")
      setTime((state) => {
        return {
          ...state,
          sec: event.target.value,
        };
      });

    if (event.target.name === "btn") {
      //console.log("btn clicked");
      let intervalId = (time.min > 0 || time.sec > 0 ) && setInterval(() => setTime(setTimer, 1000), 1000);
      let timer = time.min * 60 * 1000 + time.sec * 1000;

      if (intervalId && timer > 0) {
        setBtnClicked(true);
        setTimeout(() => {
          console.log(time);
          setBtnClicked(false);
          clearInterval(intervalId);
        }, timer);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 flex flex-col p-5 gap-y-4 border-black border-2 rounded-md text-center">
        <h5 className="text-3xl font-bold font-mono">STOPWATCH</h5>

        <div className="inline-flex w-full justify-between">
          <input
            placeholder="minutes"
            name="min"
            type="number"
            value={time.min}
            className="outline-none h-12 p-2 border-b-black border-2 rounded-md w-2/5 disabled:animate-bounce"
            onChange={ChangeHandler}
            disabled={btnClicked}
          />
          <b className="text-2xl mt-1">:</b>
          <input
            placeholder="second"
            name="sec"
            type="number"
            value={time.sec}
            className="outline-none h-12 p-2 border-b-black border-2 rounded-md w-2/5 disabled:animate-bounce disabled:border-lime-500"
            onChange={ChangeHandler}
            disabled={btnClicked}
          />
        </div>
        <button
          name="btn"
          onClick={ChangeHandler}
          className="p-4 bg-green-400 rounded-md"
        >
          button
        </button>
      </div>
    </div>
  );
}

export default App;
