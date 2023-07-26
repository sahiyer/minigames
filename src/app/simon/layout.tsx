import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Simon",
    description: "A game of Simon Says",
};

export default function SimonLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
