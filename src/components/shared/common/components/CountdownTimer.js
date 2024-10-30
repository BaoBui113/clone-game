import React from 'react';
import { useCountdown } from '@/libs/hooks/useCountdown';

const ExpiredNotice = () => {
    return (
        <div className="expired-notice">
            <span>만료됨</span>
        </div>
    );
};
const addPreZero = (time) => {
    return time < 10 ? "0" + time : time
}
const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
        <div className="flex">
            {addPreZero(minutes)}:{addPreZero(seconds)}
        </div>
    );
};

const CountdownTimer = ({ targetDate }) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    if (days + hours + minutes + seconds <= 0) {
        return <ExpiredNotice />;
    } else {
        return (
            <ShowCounter
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        );
    }
};

export default CountdownTimer;