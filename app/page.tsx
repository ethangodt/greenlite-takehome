import {fetchRunsByUser} from "@/utils/db";
import styles from './home.module.css'
import {Activity} from "@/components/Activity";
import Link from "next/link";

export default async function Home() {
    const runs = await fetchRunsByUser()
    return (
        <div>
            <div className={styles.header} style={{width: "100%", height: 400}}/>
            <div className="flex my-12 justify-center">
                <Link href={'/new'}>
                    <button className="bg-green-400 text-black font-bold py-2 px-14 rounded-lg focus:outline-none">Start
                        Run!
                    </button>
                </Link>
            </div>
            <div className={"flex flex-col items-center"}>
                <p style={{marginBottom: "15px"}}>PREVIOUS ACTIVITY</p>
                {runs.map((r) => {
                    return <Activity key={r.id} activity={r}/>
                })}
            </div>
        </div>
    );
}
