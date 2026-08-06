"use client";

import { Button } from "@econmesh/ui/components/button";
import { Input } from "@econmesh/ui/components/input";
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
			className="flex items-center gap-2 border-t border-econ-green/10 bg-white p-3"
		>
			<Input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder={placeholder}
				disabled={disabled || isSubmitting}
				className="h-10 flex-1 rounded-lg border-econ-green/20 bg-econ-cream/50 text-sm text-econ-dark placeholder:text-econ-dark/45 focus-visible:border-econ-green focus-visible:ring-econ-green/20"
				autoComplete={placeholder.includes("e-mail") ? "email" : "off"}
				type={placeholder.includes("e-mail") ? "email" : "text"}
			/>
			<Button
				type="submit"
				disabled={disabled || isSubmitting || !value.trim()}
				className="size-10 shrink-0 rounded-full bg-econ-green text-white hover:bg-econ-dark disabled:opacity-50"
				aria-label="Enviar mensagem"
			>
				{isSubmitting ? (
					<Loader2 className="size-4 animate-spin" />
				) : (
					<SendHorizonal className="size-4" />
				)}
			</Button>
		</form>
	);
}
