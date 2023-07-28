import { SliderData } from "@/utility/slider/SliderData";
import styles from "./Options.module.scss";
import { Dispatch, SetStateAction } from "react";

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
        </div>
    );
}
