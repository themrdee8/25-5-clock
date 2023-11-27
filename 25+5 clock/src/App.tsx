import { useEffect, useState } from 'react'
import './App.css'
import {FaArrowUp, FaArrowDown, FaPlay, FaPause, FaArrowsRotate} from "react-icons/fa6/"

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [play, setPlay] = useState(false);
  const [timingType, setTimingType] = useState("SESSION");
  const [timeLeft, setTimeLeft] = useState(1500);
  //const [title, setTitle] = useState("");

  const timeout = setTimeout(() => {
    if(timeLeft && play) {
      setTimeLeft(timeLeft - 1)
    }
  }, 1000);

  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleSessionIncrease = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft(timeLeft + 60);
    }
  };

  const handleSessionDecrease = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft(timeLeft - 60);
    }
  };

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);  
  };

  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if(!timeLeft && timingType === "SESSION") {
      setTimeLeft(breakLength * 60)
      setTimingType("BREAK")
     /*  audio.play() */
    }

    if(!timeLeft && timingType === "BREAK") {
      setTimeLeft(sessionLength * 60)
      setTimingType("SESSION")
      /* audio.pause()
      audio.currentTime = 0; */
    }
  }

  const clock = () => {
    if(play) {
      timeout
      resetTimer()
    }
    else {
      clearTimeout(timeout);
    }
  }

  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingType("SESSION");
    const audio = document.getElementById("beep");
    /* audio.pause();
    audio.currentTime = 0; */
  };

  useEffect(() => {
    clock()
  }, [play, timeLeft, timeout])
  
  const title = timingType === "SESSION" ? "Session" : "Break";

  return (
    <div>
      <div className="container">
        <h2>25 + 5 Clock</h2>
        <div className="break-session-container">
          <div>
            <h3 id="break-label">Break Length</h3>
            <div>
              <button disabled={play} id="break-decrement" onClick={handleBreakDecrease}>
                <FaArrowDown />
              </button>
                <strong id="break-length">{breakLength}</strong>
              <button disabled={play} id="break-increment" onClick={handleBreakIncrease}>
                <FaArrowUp />
              </button>
            </div>
          </div>
          <div>
            <h3 id="session-label">Session Length</h3>
            <div>
              <button disabled={play} id="session-decrement" onClick={handleSessionDecrease}>
                <FaArrowDown />
              </button>
                <strong id="session-length">{sessionLength}</strong>
              <button disabled={play} id="session-increment" onClick={handleSessionIncrease}>
                <FaArrowUp />
              </button>
            </div>
          </div>
        </div>
        <div className="timer-container">
          <div className="timer">
            <h2 id="timer-label">{title}</h2>
            <h3 id="time-left">{timeFormatter()}</h3>
          </div>
          <button id="start_stop" onClick={handlePlay}>
            <FaPlay /> <FaPause />
          </button>
          <button id="reset" onClick={handleReset}>
            <FaArrowsRotate />
          </button>
        </div>
      </div>
      <audio src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" 
        id="beep" 
        preload="auto" 
      />
    </div>
  )
}

export default App
