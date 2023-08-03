import { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import { UserContext } from '.';
import { COST_CREDIT, MAX_CREDIT } from '../utils';
interface LoadingData {
    time: number;
    isLoading: () => void;
    isNotLoading: () => void;
}

export const TimeContext = createContext<LoadingData>({
    time: 3,
    isLoading: () => { },
    isNotLoading: () => { },
});


interface TimeProvider {
    children: ReactNode
}

export const TimeProvider = ({ children }: TimeProvider) => {
    const [time, setTime] = useState(0);
    const { englishUser, addCredits } = useContext(UserContext);

    const calculateTimeDifferenceInSec = (pastDate: Date, presentDate: Date): number => {
        const differenceInMilliseconds = presentDate.getTime() - pastDate.getTime();
        const differenceInSeconds = differenceInMilliseconds / 1000;
        return differenceInSeconds;
    }

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
                    timeOut += COST_CREDIT
                }

                const dateObject = new Date(englishUser.lastCreditDate);
                dateObject.setSeconds(dateObject.getSeconds() + timeOut);
                const newDate = dateObject.toISOString();

                console.log(newCredits)
                console.log(differenceInSeconds)
                setTime(differenceInSeconds)
                addCredits(newCredits, englishUser.credits, englishUser.idForm as string, newDate as string);
            }
        }
    }, [englishUser.credits])

    const isLoading = () => {
        /*   setLoading(true); */
    };

    const isNotLoading = () => {
        /*   setLoading(false); */
    };

    return (
        <TimeContext.Provider value={{ time, isLoading, isNotLoading }}>
            {children}
        </TimeContext.Provider>
    );
};

