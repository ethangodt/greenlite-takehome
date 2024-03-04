export type Point = {
    latitude: number,
    longitude: number,
}

export type Activity = {
    id: string,
    user_id: string,
    start_time: number,
    end_time: number,
    geo_data: string,
}