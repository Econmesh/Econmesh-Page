import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function NotFound() {
	return (
		<>
			<SiteHeader />
			<main
				id="main-content"
				className="flex min-h-[60vh] flex-col items-center justify-center bg-econ-cream px-4 text-center"
			>
				<p className="font-display font-semibold text-econ-green text-sm uppercase tracking-widest">
					404
				</p>
				<h1 className="mt-2 font-display font-extrabold text-3xl text-econ-dark uppercase tracking-wide">
					Página não encontrada
				</h1>
				<p className="mt-3 max-w-md text-econ-dark/75 leading-relaxed">
					O conteúdo que você procura não existe ou não está mais disponível.
				</p>
				<div className="mt-8 flex flex-wrap justify-center gap-3">
					<Link
						href="/"
						className="inline-flex min-h-11 items-center rounded-full bg-econ-green px-6 font-display font-semibold text-sm text-white tracking-wide"
					>
						Ir para a home
					</Link>
					<Link
						href="/blog"
						className="inline-flex min-h-11 items-center rounded-full border-2 border-econ-orange px-6 font-display font-semibold text-econ-orange text-sm tracking-wide"
					>
						Ver blog
					</Link>
				</div>
			</main>
			<SiteFooter />
		</>
	);
}
