import { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import { UserContext } from '.';

const COST_CREDIT = parseInt(import.meta.env.VITE_COST_CREDIT);
const MAX_CREDIT = parseInt(import.meta.env.VITE_MAX_CREDIT);

interface LoadingData {
    time: number;
    timeRemaining: number;
    resetTimer: () => void;
}

export const TimeContext = createContext<LoadingData>({
    time: 3,
    resetTimer: () => { },
    timeRemaining: 0,
});


interface TimeProvider {
    children: ReactNode
}

export const TimeProvider = ({ children }: TimeProvider) => {
    const [time, setTime] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(COST_CREDIT - time);
    const { englishUser, addCredits } = useContext(UserContext);
    const [addCredit, setAddCredit] = useState(false);
    const calculateTimeDifferenceInSec = (pastDate: Date, presentDate: Date): number => {
        const differenceInMilliseconds = presentDate.getTime() - pastDate.getTime();
        const differenceInSeconds = differenceInMilliseconds / 1000;
        return differenceInSeconds;
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime === 0) {
                    clearInterval(intervalId);
                    setAddCredit(!addCredit)
                    return prevTime;
                }
                return prevTime - 1;
            });
        }, 1000);
        if (englishUser.credits == MAX_CREDIT) {
            clearInterval(intervalId);
        }
        return () => {
            clearInterval(intervalId);
        };
    }, [timeRemaining]);

    useEffect(() => {

        if (englishUser.lastCreditDate != "" && englishUser.lastCreditDate != undefined) {
            const presentDate = new Date();
            const lastCredit = Date.parse(englishUser.lastCreditDate);
            const lastCreditDate = new Date(lastCredit);

            let differenceInSeconds = Math.round(calculateTimeDifferenceInSec(lastCreditDate, presentDate));
            if (englishUser.credits != undefined) {
                let newCredits = 0
                let timeOut = 0
                while (differenceInSeconds >= COST_CREDIT && newCredits < MAX_CREDIT) {
                    newCredits++;
                    differenceInSeconds -= COST_CREDIT;
                    timeOut += COST_CREDIT;
                }
                setTimeRemaining(COST_CREDIT - differenceInSeconds)
                const dateObject = new Date(englishUser.lastCreditDate);
                dateObject.setSeconds(dateObject.getSeconds() + timeOut);
                const newDate = dateObject.toISOString();
                setTime(differenceInSeconds)
                addCredits(newCredits, englishUser.credits, englishUser.idForm as string, newDate as string);
            }
        }
    }, [englishUser.credits, addCredit, timeRemaining])

    const resetTimer = () => {
        setAddCredit(!addCredit);
    };

    return (
        <TimeContext.Provider value={{ timeRemaining, time, resetTimer }}>
            {children}
        </TimeContext.Provider>
    );
};

