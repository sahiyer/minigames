import Head from "next/head";
import Link from "next/link";
import styles from "./page.module.scss";

export default function Index() {
    return (
        <main>
            <Head>
                <title>Minigames</title>
            </Head>

            <h1 className={styles.heading}>Minigames</h1>
            <h3 className={styles.subheading}>What would you like to play?</h3>

            <Link href="/">
                <button className={styles.gameButton}>Simon</button>
            </Link>
        </main>
    );
}
