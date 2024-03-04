"use client"

import React, {useEffect, useRef, useMemo} from "react";
import mapboxgl from 'mapbox-gl';
import {getCenterPoint} from "@/utils/geo";
import {Point} from "@/types";

// TODO use .env
mapboxgl.accessToken = "pk.eyJ1IjoiZXRoYW5wZWV0aGFuIiwiYSI6ImNsdGM4a3JrdzIwdncyaW1ndG5hOWliemUifQ.IuV5z7FOghLvx1mABt0kbw"

const Map: React.FC<{ serializedPoints: string }> = ({serializedPoints}) => {
    const points = JSON.parse(serializedPoints) as Point[]
    const mapContainerRef = useRef(null);
    const centerPoint = useMemo(() => {
        return getCenterPoint(points)
    }, [points])

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [centerPoint.longitude, centerPoint.latitude],
            zoom: 12,
        });

        map.on('load', () => {
            map.addSource('route', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: points.map(point => [point.longitude, point.latitude]),
                    },
                },
            });

            map.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': '#888',
                    'line-width': 8,
                },
            });
        });

        return () => map.remove();
    }, [points]);

    return <div ref={mapContainerRef} style={{width: '100%', height: '400px'}}/>;
};

export default Map;
