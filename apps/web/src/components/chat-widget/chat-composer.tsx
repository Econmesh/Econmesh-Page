"use client";

import { Loader2, SendHorizonal } from "lucide-react";
import { type FormEvent, useState } from "react";

type Props = {
	disabled?: boolean;
	isSubmitting?: boolean;
	placeholder?: string;
	onSend: (text: string) => void | Promise<void>;
};

export function ChatComposer({
	disabled = false,
	isSubmitting = false,
	placeholder = "Digite sua mensagem...",
	onSend,
}: Props) {
	const [value, setValue] = useState("");
	const canSend = Boolean(value.trim()) && !disabled && !isSubmitting;

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		const trimmed = value.trim();
		if (!trimmed || disabled || isSubmitting) return;
		setValue("");
		await onSend(trimmed);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="border-t border-econ-green/10 bg-white p-3"
		>
			<label className="relative flex h-11 items-center rounded-full border border-econ-green/25 bg-econ-cream/60 pr-1.5 pl-4 focus-within:border-econ-green focus-within:ring-2 focus-within:ring-econ-green/20">
				<span className="sr-only">{placeholder}</span>
				<input
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder={placeholder}
					disabled={disabled || isSubmitting}
					className="min-w-0 flex-1 border-0 bg-transparent py-2 text-sm text-econ-dark outline-none placeholder:text-econ-dark/45 disabled:cursor-not-allowed disabled:opacity-60"
					autoComplete={placeholder.includes("e-mail") ? "email" : "off"}
					type={placeholder.includes("e-mail") ? "email" : "text"}
				/>
				<button
					type="submit"
					disabled={!canSend}
					className="flex size-8 shrink-0 items-center justify-center rounded-full bg-econ-green text-white transition-colors hover:bg-econ-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-econ-green disabled:bg-econ-green/35 disabled:opacity-70"
					aria-label="Enviar mensagem"
				>
					{isSubmitting ? (
						<Loader2 className="size-4 animate-spin" aria-hidden="true" />
					) : (
						<SendHorizonal className="size-4" aria-hidden="true" />
					)}
				</button>
			</label>
		</form>
	);
}
