import { useState, useEffect, useContext } from "react";

import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Countdown.module.css";

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(0.05 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteleft, minuteright] = String(minutes).padStart(2, '0').split('');
    const [secondleft, secondright] = String(seconds).padStart(2, '0').split('');

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.05 * 60);
    }

    useEffect(() => {
        if(isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if(isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);

    return (
        <div>
            <div className={styles.countdownContainer}>
            <div>
                <span>{minuteleft}</span>
                <span>{minuteright}</span>
            </div>
            <span>:</span>
            <div>
                <span>{secondleft}</span>
                <span>{secondright}</span>
            </div>
        </div>

        { hasFinished ? (
            <button 
            disabled 
            className={styles.countdownButton}
            >
            Ciclo encerrado
        </button>
        ) : (
            <>
                { isActive ? (
                    <button 
                    type="button" 
                    className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                    onClick={resetCountdown}
                    >
                    Abandonar ciclo
                </button>
                ) : (
                <button 
                    type="button" 
                    className={styles.countdownButton}
                    onClick={startCountdown}
                    >
                    Inicar ciclo
                </button>
                )}
            </>
        )}
            
        </div>
    );
}