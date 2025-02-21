import { useState, useEffect } from "react";
import "./Timer.css";

function Timer() {
  const [time, setTime] = useState({ hr: 0, min: 0, sec: 0, msec: 0 });
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prev) => {
          let { hr, min, sec, msec } = prev;
          msec++;
          if (msec === 100) { sec++; msec = 0; }
          if (sec === 60) { min++; sec = 0; }
          if (min === 60) { hr++; min = 0; }
          return { hr, min, sec, msec };
        });
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const reset = () => {
    setRunning(false);
    setTime({ hr: 0, min: 0, sec: 0, msec: 0 });
  };

  const formatTime = (value) => value.toString().padStart(2, "0");

  return (
    <div className="timer-container">
      <section className="timer-box">
        <div className="timer-display">
          <span>{formatTime(time.hr)}</span>
          <span>:</span>
          <span>{formatTime(time.min)}</span>
          <span>:</span>
          <span>{formatTime(time.sec)}</span>
          <span>:</span>
          <span>{formatTime(time.msec)}</span>
        </div>
        <div className="timer-controls">
          <button onClick={() => setRunning(true)} className="start-button">Start</button>
          <button onClick={() => setRunning(false)} className="stop-button">Stop</button>
          <button onClick={reset} className="reset-button">Reset</button>
        </div>
      </section>
    </div>
  );
}

export default Timer;
