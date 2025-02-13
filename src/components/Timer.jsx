import { useState, useEffect } from "react";
import "./styles/Timer.css";

const imgNames = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"
];

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

  const getImgSrc = (value) => `/images/${imgNames[Math.floor(value)]}.png`;

  return (
    <div className="timer-container">
      <section className="timer-box">
        <div className="timer-display">
          <img src={getImgSrc(time.hr / 10)} alt="0" />
          <img src={getImgSrc(time.hr % 10)} alt="0" />
          <span>:</span>
          <img src={getImgSrc(time.min / 10)} alt="0" />
          <img src={getImgSrc(time.min % 10)} alt="0" />
          <span>:</span>
          <img src={getImgSrc(time.sec / 10)} alt="0" />
          <img src={getImgSrc(time.sec % 10)} alt="0" />
          <span>:</span>
          <img src={getImgSrc(time.msec / 10)} alt="0" />
          <img src={getImgSrc(time.msec % 10)} alt="0" />
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
