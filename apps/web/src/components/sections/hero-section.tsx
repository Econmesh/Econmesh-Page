import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export function HeroSection() {
	return (
		<section
			id="home"
			className="relative flex min-h-[60vh] items-center md:min-h-[70vh]"
			aria-labelledby="hero-heading"
		>
			<Image
				src="/images/background1.png"
				alt="Parque industrial com turbinas eólicas, painéis solares e infraestrutura sustentável"
				fill
				className="object-cover"
				priority
				sizes="100vw"
			/>
			<div className="hero-gradient-overlay absolute inset-0" aria-hidden="true" />

			<div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
				<div className="max-w-2xl">
					<h1
						id="hero-heading"
						className="font-display font-extrabold text-white text-[clamp(1.75rem,5vw,3rem)] uppercase leading-tight tracking-wide"
					>
						Economia circular
					</h1>
					<p className="mt-3 font-display font-bold text-econ-orange text-[clamp(0.875rem,2.5vw,1.125rem)] uppercase tracking-wide">
						O futuro da indústria é regenerativo
					</p>
					<p className="mt-5 max-w-xl text-base text-white/95 leading-relaxed sm:text-lg">
						{siteConfig.description}
					</p>
					<Link
						href="#solucoes"
						className="mt-8 inline-flex min-h-11 items-center rounded-lg border-2 border-white bg-white/10 px-6 font-display font-semibold text-sm text-white uppercase tracking-wide backdrop-blur-sm transition-colors hover:bg-white/20"
					>
						Conhecer soluções
					</Link>
				</div>
			</div>
		</section>
	);
}
