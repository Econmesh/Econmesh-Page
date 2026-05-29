"use client";

import { Input } from "@econmesh/ui/components/input";
import { useState } from "react";

import { siteConfig } from "@/lib/site-config";

export function ComingSoonSection() {
	const [submitted, setSubmitted] = useState(false);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const form = e.currentTarget;
		const email = new FormData(form).get("email");
		if (typeof email !== "string" || !email) return;

		const subject = encodeURIComponent(siteConfig.newsletter.subject);
		const body = encodeURIComponent(
			`Olá,\n\nGostaria de receber novidades da ECONMESH.\n\nE-mail: ${email}`,
		);
		const mailto = `mailto:${siteConfig.newsletter.mailto}?subject=${subject}&body=${body}`;
		window.location.href = mailto;
		setSubmitted(true);
	}

	return (
		<section
			id="novidades"
			className="border-econ-green/10 border-t bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
			aria-labelledby="novidades-heading"
		>
			<div className="mx-auto max-w-xl text-center">
				<h2
					id="novidades-heading"
					className="font-display font-extrabold text-econ-dark text-2xl uppercase tracking-wide sm:text-3xl"
				>
					Novidades em breve
				</h2>
				<p className="mt-4 text-econ-dark/80 leading-relaxed">
					Estamos preparando conteúdos sobre economia circular, cases industriais e insights do
					nosso ecossistema. Cadastre-se para ser avisado quando o blog estiver no ar.
				</p>

				{submitted ? (
					<p className="mt-8 font-medium text-econ-green" role="status">
						Obrigado! Seu cliente de e-mail será aberto para confirmar o cadastro.
					</p>
				) : (
					<form className="mt-8 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
						<label htmlFor="newsletter-email" className="sr-only">
							Seu e-mail
						</label>
						<Input
							id="newsletter-email"
							name="email"
							type="email"
							required
							placeholder="seu@email.com"
							autoComplete="email"
							className="h-11 flex-1 rounded-lg border-econ-green/30 px-4 text-base"
						/>
						<button
							type="submit"
							className="inline-flex h-11 min-w-[140px] items-center justify-center rounded-lg bg-econ-green px-6 font-display font-semibold text-sm text-white uppercase tracking-wide transition-colors hover:bg-econ-dark"
						>
							Avise-me
						</button>
					</form>
				)}
			</div>
		</section>
	);
}
