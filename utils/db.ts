import {open} from 'sqlite'
import sqlite3 from 'sqlite3'
import {cache} from 'react'
import path from 'path'
import {Activity} from "@/types";
import {v4} from 'uuid'

async function getClient() {
    return await open({
        filename: path.resolve('db/sql.db'),
        driver: sqlite3.Database
    });
}

export const fetchRunsByUser = async (): Promise<Activity[]> => {
    const db = await getClient()
    return await db.all('SELECT * FROM Run');
}

export type SaveData = Pick<Activity, 'start_time' | 'end_time' | 'geo_data'>

export const saveRun = async (data: SaveData) => {
    const db = await getClient()
    await db.run('INSERT INTO Run (id, user_id, start_time, end_time, geo_data) VALUES (?,?,?,?,?)', [v4(), "fa1ee978-d5c5-4da6-a0bf-b0ea51011868", data.start_time, data.end_time, data.geo_data])
}