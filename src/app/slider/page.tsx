import HomeButton from "@/components/HomeButton";
import SliderGrid from "@/components/slider/SliderGrid";

export default function Slider() {
    return (
        <>
            <h1>Slider</h1>
            <h3>Use the arrow keys to slide the pieces. Fix the image!</h3>

            <SliderGrid></SliderGrid>

            <HomeButton></HomeButton>
        </>
    );
}
