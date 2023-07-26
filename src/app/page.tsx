import Head from "next/head";
import Link from "next/link";

export default function Index() {
    return (
        <main>
            <h1>Minigames</h1>
            <h3>What would you like to play?</h3>

            <Link href="/simon">
                <button>Simon</button>
            </Link>
        </main>
    );
}
