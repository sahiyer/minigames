import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Slider",
    description: "A sliding image game",
};

export default function SliderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
