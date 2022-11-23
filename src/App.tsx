import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState(false);
  const [timer, setTimer] = useState(300);
  const [watch, setWatch] = useState(0);
  const [timerState, setTimerState] = useState(false);

  const setClean = () => {
    if (title) {
      setTimer(300);
    } else {
      setWatch(0);
    }
  };

  useEffect(() => {
    if (title && timerState) {
      let T = setInterval(() => {
        setTimer((prev) => {
          if (prev !== 0) return prev - 1;
          return 300;
        });
      }, 1000);

      return () => clearInterval(T);
    }
    if (!title && timerState) {
      let T = setInterval(() => {
        setWatch((prev) => {
          return prev + 1;
        });
      }, 10);

      return () => clearInterval(T);
    }
  }, [timerState, title]);

  return (
    <div className="h h-40 w-80 p-4">
      <div className="flex" id="header">
        <div
          className="cursor-pointer px-10 py-5 hover:bg-slate-400"
          onClick={() => setTitle(true)}
        >
          TIMER
        </div>
        <div
          className="cursor-pointer px-10 py-5 hover:bg-slate-400"
          onClick={() => setTitle(false)}
        >
          STOPWATCH
        </div>
      </div>
      {title ? (
        <div className="flex gap-2 my-5 mx-auto pl-5">
          <div id="min">{Math.floor(timer / 60)} m</div>
          <div id="s">{timer % 60} s</div>
        </div>
      ) : (
        <div className="flex gap-2 my-5 mx-auto pl-5">
          <div id="sec">{Math.floor(watch / 100)} s</div>
          <div id="msec">{watch % 100}</div>
        </div>
      )}
      <div className="flex" id="footer">
        <div className="grid grid-cols-3 gap-3">
          <div
            className="cursor-pointer bg-white text-blue-700 p-3 border-black border-2"
            onClick={() => setTimerState(!timerState)}
          >
            {timerState ? "STOP" : "START"}
          </div>
          <div
            className="cursor-pointer bg-blue-700 text-white p-3 border-cyan-500 border-2"
            onClick={setClean}
          >
            RESET
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
