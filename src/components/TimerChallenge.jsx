import React, { useRef, useState } from "react";
import ResultModal from "./ResultModal";

function TimerChallenge({ title, targetTime }) {
    const [timeRemainging, setTimeRemaining] = useState(targetTime * 1000);

    const timer = useRef();
    const dialog = useRef();

    const timerIsActive =
        timeRemainging > 0 && timeRemainging < targetTime * 1000;

    if (timeRemainging <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset() {
        setTimeRemaining(targetTime * 1000);
    }

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining((prevState) => prevState - 10);
        }, 10);
    }
    function handleStop() {
        dialog.current.open();
        clearInterval(timer.current);
    }
    return (
        <>
            <ResultModal
                ref={dialog}
                targetTime={targetTime}
                remainingTime={timeRemainging}
                onReset={handleReset}
            />

            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? "s" : ""}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? "Stop" : "Start"} Challenge
                    </button>
                </p>

                <p className={timerIsActive ? "active" : undefined}>
                    {timerIsActive ? "Time is running..." : "Time inactive"}
                </p>
            </section>
        </>
    );
}

export default TimerChallenge;
