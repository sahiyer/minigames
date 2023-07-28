import { SliderData } from "@/utility/slider/SliderData";
import styles from "./Options.module.scss";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export default function Options({
    sliderData,
    setSliderData,
}: {
    sliderData: SliderData;
    setSliderData: Dispatch<SetStateAction<SliderData>>;
}) {
    const toggleShowTargetCoordinates = () => {
        setSliderData((oldData) => {
            return {
                ...oldData,
                showTargetCoordinates: !oldData.showTargetCoordinates,
            };
        });
    };

    const onDifficultyChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSliderData((oldData) => ({
            ...oldData,
            difficulty: event.target.value,
        }));
    };

    return (
        <div className={styles.options}>
            <h1>Options</h1>

            <label className={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    onChange={toggleShowTargetCoordinates}
                ></input>
                Show target coordinates
            </label>

            <div className={styles.difficultyGrid}>
                <span className={styles.difficultyLabel}>Difficulty:</span>

                <div className={styles.difficultyCheckboxes}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="radio"
                            name="difficulty"
                            value="easy"
                            className={styles.checkbox}
                            onChange={onDifficultyChange}
                            checked
                        ></input>
                        Easy
                    </label>

                    <br />

                    <label className={styles.checkboxLabel}>
                        <input
                            type="radio"
                            name="difficulty"
                            value="medium"
                            className={styles.checkbox}
                            onChange={onDifficultyChange}
                        ></input>
                        Medium
                    </label>

                    <br />

                    <label className={styles.checkboxLabel}>
                        <input
                            type="radio"
                            name="difficulty"
                            value="hard"
                            className={styles.checkbox}
                            onChange={onDifficultyChange}
                        ></input>
                        Hard
                    </label>
                </div>
            </div>
        </div>
    );
}
