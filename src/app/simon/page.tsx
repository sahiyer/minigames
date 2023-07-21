"use client";

import { useState } from "react";

import styles from "./simon.module.scss"
import clsx from "clsx";

export default function Simon() {
    const [status, setStatus] = useState("Level 1 - Ready?");

    return (
        <>
            <h1>Simon</h1>
            <h3>{status}</h3>

            <button>Start</button>

            <div className={styles.gameGrid}>
                <div className={clsx(styles.gameTile, styles.green, styles.subdued)}></div>
                <div className={clsx(styles.gameTile, styles.yellow, styles.subdued)}></div>
                <div className={clsx(styles.gameTile, styles.blue, styles.subdued)}></div>
                <div className={clsx(styles.gameTile, styles.red, styles.subdued)}></div>
            </div>
        </>
    )
}
