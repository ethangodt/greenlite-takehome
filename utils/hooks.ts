import {useEffect, useState} from 'react';
import {getBrowserPosition} from "@/utils/geo";
import {Point} from "@/types";

export const useLocation = (capture: boolean) => {
    const [data, updateData] = useState<Point[]>([])

    useEffect(() => {
        if (capture) {
            const id = setInterval(async () => {
                const newPoint = await getBrowserPosition()
                updateData(currentData => [...currentData, newPoint]);
            }, 1000)
            return () => {
                clearInterval(id)
                updateData([])
            }
        }
    }, [capture]);

    return data
};

export const useTimer = (start: boolean) => {
    const [time, updateTime] = useState<number>(0)

    useEffect(() => {
        if (start) {
            const id = setInterval(async () => {
                updateTime(current => current + 1000)
            }, 1000)
            return () => {
                clearInterval(id)
                updateTime(0)
            }
        }
    }, [start]);

    return time
};