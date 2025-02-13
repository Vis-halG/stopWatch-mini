import { useState, useEffect } from "react";
import "./styles/Timer.css";

const imgLinks = [
  "https://res.cloudinary.com/dwtn2kajc/image/upload/v1739426711/zero_cvmixq.png",
  "https://res.cloudinary.com/dwtn2kajc/image/upload/v1739426710/one_josesm.png",
  "https://res.cloudinary.com/dwtn2kajc/image/upload/v1739426711/two_ta0jlr.png",
  "https://res.cloudinary.com/dwtn2kajc/image/upload/v1739426711/three_eprh7n.png",
  "https://res.cloudinary.com/dwtn2kajc/image/upload/v1739426711/four_toycdk.png",
  "https://res.cloudinary.com/dwtn2kajc/image/upload/v1739426710/five_bohdcc.png",
  "https://res.cloudinary.com/dwtn2kajc/image/upload/v1739426711/six_whnvm9.png",
  "https://res.cloudinary.com/dwtn2kajc/image/upload/v1739426710/seven_etjdxo.png",
  "https://res.cloudinary.com/dwtn2kajc/image/upload/v1739426710/eight_lnjvlq.png",
  "https://res.cloudinary.com/dwtn2kajc/image/upload/v1739426710/nine_pdjizm.png"
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

  const getImgSrc = (value) => imgLinks[Math.floor(value)];

  return (
    <div className="timer-container">
      <section className="timer-box">
        <div className="timer-display">
          <img src={getImgSrc(time.hr / 10)} alt="hour tens" />
          <img src={getImgSrc(time.hr % 10)} alt="hour ones" />
          <span>:</span>
          <img src={getImgSrc(time.min / 10)} alt="minute tens" />
          <img src={getImgSrc(time.min % 10)} alt="minute ones" />
          <span>:</span>
          <img src={getImgSrc(time.sec / 10)} alt="second tens" />
          <img src={getImgSrc(time.sec % 10)} alt="second ones" />
          <span>:</span>
          <img src={getImgSrc(time.msec / 10)} alt="millisecond tens" />
          <img src={getImgSrc(time.msec % 10)} alt="millisecond ones" />
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
