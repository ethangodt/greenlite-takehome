'use server'

import {SaveData, saveRun as save} from "@/utils/db";


export async function saveRun(data: SaveData) {
    await save(data)
}