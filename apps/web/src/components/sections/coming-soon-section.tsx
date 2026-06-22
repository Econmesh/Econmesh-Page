"use client";

import { Input } from "@econmesh/ui/components/input";
import { useState } from "react";
import { toast } from "sonner";

type FormStatus = "idle" | "loading" | "success";

export function ComingSoonSection() {
	const [status, setStatus] = useState<FormStatus>("idle");

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const form = e.currentTarget;
		const email = new FormData(form).get("email");
		if (typeof email !== "string" || !email) return;

		setStatus("loading");

		try {
			const response = await fetch("/api/newsletter/subscribe", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});

			if (!response.ok) {
				const data = (await response.json().catch(() => null)) as { error?: string } | null;
				throw new Error(data?.error ?? "Falha ao cadastrar.");
			}

			setStatus("success");
		} catch (error) {
			setStatus("idle");
			toast.error(
				error instanceof Error ? error.message : "Não foi possível cadastrar. Tente novamente.",
			);
		}
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

				{status === "success" ? (
					<p className="mt-8 font-medium text-econ-green" role="status">
						Obrigado! Você será avisado quando o blog estiver no ar.
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
							disabled={status === "loading"}
							placeholder="seu@email.com"
							autoComplete="email"
							className="h-11 flex-1 rounded-lg border-econ-green/30 px-4 text-base"
						/>
						<button
							type="submit"
							disabled={status === "loading"}
							className="inline-flex h-11 min-w-[140px] items-center justify-center rounded-lg bg-econ-green px-6 font-display font-semibold text-sm text-white uppercase tracking-wide transition-colors hover:bg-econ-dark disabled:cursor-not-allowed disabled:opacity-70"
						>
							{status === "loading" ? "Enviando…" : "Avise-me"}
						</button>
					</form>
				)}
			</div>
		</section>
	);
}
