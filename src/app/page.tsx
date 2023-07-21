import Head from "next/head";
import Link from "next/link";
import styles from "./index.module.scss";

export default function Index() {
    return (
        <main>
            <Head>
                <title>Minigames</title>
            </Head>

            <h1>Minigames</h1>
            <h3>What would you like to play?</h3>

            <Link href="/simon">
                <button>Simon</button>
            </Link>
        </main>
    );
}
