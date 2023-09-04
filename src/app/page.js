'use client'
import {Stat} from "@/components/Stat";
import {useEffect, useState} from "react";

export default function Home() {

    const [progressData, setProgressData] = useState([]);

    useEffect(() => {
        // Load progress data from the JSON file
        fetch('data.json') // Update the path to your JSON file
            .then((response) => response.json())
            .then((data) => setProgressData(data))
            .catch((error) => console.error('Error loading progress data:', error));
    }, []);

    return (
        <main className="flex flex-col items-center py-10 gap-10">
            <h1 className="text-2xl font-black uppercase text-teal-600">Progress Everything</h1>
            <ul className="flex flex-col w-[80vw] gap-10">
                {progressData.map((progressItem) => (
                    <Stat
                        key={progressItem.id}
                        title={progressItem.title}
                        start={progressItem.start}
                        end={progressItem.end}
                        dif={progressItem.dif ? progressItem.dif : 0}
                    />
                ))}
            </ul>
        </main>
    )
}
