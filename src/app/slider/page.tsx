import Link from "next/link";

export default function Slider() {
    return (
        <>
            <h1>Slider</h1>
            <h3>Use the arrow keys to slide the pieces. Fix the image!</h3>

            <Link href="/">
                <button>{"<- Home"}</button>
            </Link>
        </>
    );
}
