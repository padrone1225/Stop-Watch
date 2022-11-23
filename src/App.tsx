import React, { useEffect, useState } from "react";
import { clearInterval } from "timers";
import "./App.css";

function App() {
  const [title, setTitle] = useState(true);
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
      let TT = setInterval(() => {
        setTimer((prev) => {
          if (prev !== 0) return prev - 1;
          return 300;
        });
      }, 1000);

      return () => clearInterval(TT);
    }
    if (!title && timerState) {
      let T = setInterval(() => {
        setWatch((prev) => {
          return prev + 1;
        });
      }, 10);

      return () => clearInterval(T);
    }
    // return () => {
    //   clearInterval(TT);
    // };
  }, [timerState, title]);

  return (
    <div className="bg-slate-300 relative h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[400px] border-slate-700 border-2 rounded-xl">
        <div className="flex" id="header">
          <div
            className="cursor-pointer px-10 py-5 hover:bg-slate-400 w-1/2 text-center rounded-[12px_0_0_0]"
            onClick={() => setTitle(true)}
          >
            TIMER
          </div>
          <div
            className="cursor-pointer px-10 py-5 hover:bg-slate-400 w-1/2 text-center rounded-[0_12px_0_0]"
            onClick={() => setTitle(false)}
          >
            STOPWATCH
          </div>
        </div>
        {title ? (
          <div className="flex gap-2 my-5 mx-auto pl-5 items-end justify-center">
            <div id="min" className="text-xl">
              {Math.floor(timer / 60)} m
            </div>
            <div id="s">{timer % 60} s</div>
          </div>
        ) : (
          <div className="flex gap-2 my-5 mx-auto pl-5 items-end justify-center">
            <div id="sec">{Math.floor(watch / 100)} s</div>
            <div id="msec">{watch % 100}</div>
          </div>
        )}
        <div className="flex justify-around" id="footer">
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
