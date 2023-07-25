import styles from "./GameTile.module.scss";
import clsx from "clsx";

export default function GameTile({ colour }: { colour: string }) {
  return <div className={clsx(styles.gameTile, colour)}></div>;
}
