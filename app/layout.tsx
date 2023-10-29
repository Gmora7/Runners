import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "@/app/AuthContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Runners San José",
	description:
		"Pagina web del equipo de atletismo del Comité Cantonal de Deportes y Recreación",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<AuthProvider>
				<body className={inter.className}>
					<Navbar />
					{children}
					<Footer />
				</body>
			</AuthProvider>
		</html>
	);
}
