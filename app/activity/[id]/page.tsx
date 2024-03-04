import React from 'react'
import Map from "@/components/Map";
import {epochDurationString} from "@/utils/time";
import {calculateTotalDistance} from "@/utils/geo";
import {fetchRunsByUser} from "@/utils/db";

export default async function ActivityPage({params}: { params: { id: string } }) {
    const runs = await fetchRunsByUser()
    const run = runs.find(r => r.id === params.id)

    if (!run) {
        return <p>Activity not found!</p>
    }

    return <div className="p-5">
        <div className="mb-28">
            <Map serializedPoints={run.geo_data}/>
        </div>

        <div className="p-4 rounded bg-gray-800">
            <h2 className="font-bold">Date</h2>
            <p className="mb-3">{new Date(run.start_time).toLocaleString()}</p>

            <h2 className="font-bold">Duration</h2>
            <p className="mb-3">{epochDurationString(run.end_time, run.start_time)}</p>

            <h2 className="font-bold">Distance</h2>
            <p className="mb-3">{calculateTotalDistance(JSON.parse(run.geo_data))} mi.</p>
        </div>
    </div>
};
