import {getCenterOfBounds, getDistance} from "geolib";
import {Point} from "@/types";

//
// #CALLOUT
// Promisified function implementation
// - async/await
// - promises
// - event loop
//

export function getBrowserPosition(): Promise<Point> {
    return new Promise((resolve, reject) => {
        function onSuccess(position: GeolocationPosition) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const timestamp = position.timestamp;
            resolve({latitude, longitude})
        }

        function onError(err: GeolocationPositionError) {
            reject(err)
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        )
    })
}

export function getCenterPoint(points: { latitude: number, longitude: number }[]) {
    return getCenterOfBounds(points)
}

export function calculateTotalDistance(points: { latitude: number, longitude: number }[]) {
    let totalDistance = 0;

    for (let i = 0; i < points.length - 1; i++) {
        const distance = getDistance(points[i], points[i + 1]);
        totalDistance += distance;
    }

    return (totalDistance / 1609.34).toFixed(2);
};