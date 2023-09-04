'use client'
import {useEffect, useState} from 'react';

export const Stat = (props) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            setProgress(calculatePercentageElapsed(props.start, props.end, props.dif))
        };

        const interval = setInterval(updateProgress, 1000);

        updateProgress();

        return () => {
            clearInterval(interval);
        };
    }, [props]);

    return (
        <li className="bg-gray-200 rounded-md py-5 px-10 w-full flex flex-col gap-4 border-solid border-4 border-teal-600 bg-opacity-80">
            <div className="flex flex-row justify-between text-teal-600 font-bold">
                <h2 className="">{props.title}</h2>
                <p>{progress}%</p>
            </div>
            <div className="relative flex rounded-full bg-teal-100">
                <div
                    className="h-10 rounded-full bg-teal-600 transition-all"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </li>
    )
}

const calculatePercentageElapsed = (start=1, end=0, dif=0) => {
    const today = Date.now();
    let s = start
    const currentUnixTimestamp = Math.floor(today / 1000);
    switch (start){
        case 1: {
            const lastMinuteUnixTimestamp = currentUnixTimestamp - (currentUnixTimestamp % 60);
            s = Math.floor(lastMinuteUnixTimestamp)*1000
            break
        } //Minute date
        case 2: {
            const lastMinuteUnixTimestamp = currentUnixTimestamp - (currentUnixTimestamp % 3600);
            s = Math.floor(lastMinuteUnixTimestamp)*1000
            break
        } //Hour date
        case 3: {
            const lastMinuteUnixTimestamp = currentUnixTimestamp - (currentUnixTimestamp % 86400);
            s = Math.floor(lastMinuteUnixTimestamp)*1000
            break
        } //Day date
    }
    const e = dif === 0 ? end : (s+dif)
    const q = Math.abs(today - s);
    const d = Math.abs(e - s);
    return Math.round((q / d) * 100)
};