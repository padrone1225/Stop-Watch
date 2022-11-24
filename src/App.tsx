import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [titleType, setTitleType] = useState(true);
  const [timer, setTimer] = useState(300);
  const [watch, setWatch] = useState(0);
  const [timerState, setTimerState] = useState(false);
  const [watchState, setWatchState] = useState(false);
  const [timerIntervalId, setTimerIntervalId] = useState(0);
  const [watchIntervalId, setWatchIntervalId] = useState(0);

  const setClean = () => {
    if (titleType) {
      setTimer(300);
      clearInterval(timerIntervalId);
      setTimerState(false);
    } else {
      setWatch(0);
      clearInterval(watchIntervalId);
      setWatchState(false);
    }
  };

  const handleClick = () => {
    if (titleType) {
      setTimerState(!timerState);
    } else {
      setWatchState(!watchState);
    }
  };

  useEffect(() => {
    if (titleType && timerState) {
      let T: any = setInterval(() => {
        setTimer((prev) => {
          if (prev !== 0) return prev - 1;
          return 300;
        });
      }, 1000);
      setTimerIntervalId(T);

      return () => clearInterval(T);
    } else if (titleType && !timerState) {
      clearInterval(timerIntervalId);
    }

    if (!titleType && watchState) {
      let T: any = setInterval(() => {
        setWatch((prev) => {
          return prev + 1;
        });
      }, 10);
      setWatchIntervalId(T);

      return () => clearInterval(T);
    } else if (!titleType && !watchState) {
      clearInterval(watchIntervalId);
    }
  }, [timerState, titleType, watchState]);

  return (
    <div className="bg-slate-300 relative h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[400px] border-slate-700 border-2 rounded-xl">
        <div className="flex" id="header">
          {titleType ? (
            <>
              <div className="cursor-pointer w-1/2 px-10 py-5 uppercase text-center rounded-[12px_0_0_0] border-b-2 border-green-600">
                timer
              </div>
              <div
                className="cursor-pointer px-10 py-5 hover:bg-slate-400 w-1/2 text-center rounded-[0_12px_0_0]"
                onClick={() => setTitleType(false)}
              >
                STOPWATCH
              </div>
            </>
          ) : (
            <>
              <div
                className="cursor-pointer px-10 py-5 hover:bg-slate-400 w-1/2 text-center rounded-[12px_0_0_0]"
                onClick={() => setTitleType(true)}
              >
                TIMER
              </div>
              <div className="cursor-pointer w-1/2 px-10 py-5 uppercase text-center rounded-[0_12px_0_0] border-b-2 border-green-600">
                stopwatch
              </div>
            </>
          )}
        </div>
        {titleType ? (
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
            onClick={() => handleClick()}
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
