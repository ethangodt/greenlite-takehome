import React from "react";
import {Activity as ActivityType} from "@/types";
import styles from "../styles.module.css"
import Link from "next/link";

export const Activity: React.FC<{ activity: ActivityType }> = ({activity}) => {
    return <div className={styles.activity}>
        <Link href={`/activity/${activity.id}`}>
            <p>{new Date(activity.start_time).toLocaleString()}</p>
        </Link>
    </div>
}