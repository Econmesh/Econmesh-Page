import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "../index.css";
import Providers from "@/components/providers";
import { siteConfig } from "@/lib/site-config";

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin"],
	weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: "ECONMESH | Economia Circular",
		template: "%s | ECONMESH",
	},
	description: siteConfig.description,
	keywords: [
		"economia circular",
		"cleantech",
		"sustentabilidade industrial",
		"manufatura reversa",
		"recursos energéticos",
		"diagnóstico de circularidade",
		"ECONMESH",
	],
	authors: [{ name: siteConfig.name }],
	creator: siteConfig.name,
	openGraph: {
		type: "website",
		locale: "pt_BR",
		url: siteConfig.url,
		siteName: siteConfig.name,
		title: "ECONMESH | Economia Circular",
		description: siteConfig.description,
		images: [
			{
				url: "/images/background1.png",
				width: 1920,
				height: 1080,
				alt: "ECONMESH — economia circular e indústria sustentável",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "ECONMESH | Economia Circular",
		description: siteConfig.description,
		images: ["/images/background1.png"],
	},
	robots: {
		index: true,
		follow: true,
	},
	alternates: {
		canonical: "/",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR" className="light" suppressHydrationWarning>
			<body className={`${montserrat.variable} font-display antialiased`}>
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-econ-dark focus:px-4 focus:py-2 focus:text-white"
				>
					Pular para o conteúdo
				</a>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
