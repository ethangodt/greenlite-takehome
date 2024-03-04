"use client"

import React, {useState} from 'react'
import {useLocation, useTimer} from "@/utils/hooks";
import {formatMilliTime} from "@/utils/time";
import {saveRun} from "@/actions/actions";

export default function New() {
    const [startTime, updateStartTime] = useState(0)
    const [capture, updateCapture] = useState(false)
    const points = useLocation(capture)
    const time = useTimer(capture)

    return <div className="m-10 flex flex-col items-center">
        {formatMilliTime(time)}
        <button onClick={async () => {
            if (!capture) {
                updateStartTime(Date.now())
                updateCapture(true)
            } else {
                await saveRun({
                    start_time: startTime,
                    end_time: Date.now(),
                    geo_data: JSON.stringify(points),
                })
                updateCapture(false)
                updateStartTime(0)
            }
        }}
                className="bg-green-400 text-black font-bold py-2 px-14 rounded-lg focus:outline-none">{capture ? "Save" : "Begin"}
        </button>

    </div>
}
