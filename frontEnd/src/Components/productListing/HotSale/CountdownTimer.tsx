import { useEffect, useState } from "react";
interface CountdownTimerProps {
    initialTimeInSeconds: any;
    onComplete: any;
}
const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialTimeInSeconds, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft((prevTimeLeft: any) => prevTimeLeft - 1);
            } else {
                clearInterval(countdownInterval);
                onComplete();
            }
        }, 1000);
        return () => {
            clearInterval(countdownInterval);
        };
    }, [timeLeft, onComplete]);

    const days = Math.floor(timeLeft / (60 * 60 * 24));
    const hours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="flex text-black  gap-1 font-semibold" >
            <p>kết thúc sau: </p>
            <p className="bg-white px-2 rounded-border">{days}</p>
            <span className="">:</span>
            <p className="bg-white px-2 rounded-border">{hours}</p>
            <span className="">:</span>
            <p className="bg-white px-2 rounded-border">{minutes}</p>
            <span className="">:</span>
            <p className="bg-white px-2 rounded-border">{seconds}</p>
        </div>
    );
}

export default CountdownTimer;