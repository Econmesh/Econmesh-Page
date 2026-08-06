"use client";

import { MessageCircle, X } from "lucide-react";

type Props = {
	isOpen: boolean;
	onClick: () => void;
};

export function ChatFab({ isOpen, onClick }: Props) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-label={isOpen ? "Fechar chat de suporte" : "Abrir chat de suporte"}
			aria-expanded={isOpen}
			className="group relative flex size-14 items-center justify-center rounded-full bg-econ-green text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-econ-dark hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-econ-green animate-in fade-in slide-in-from-bottom-4 duration-500"
		>
			<span
				className="absolute top-1 right-1 size-3 rounded-full border-2 border-white bg-emerald-400 animate-pulse"
				aria-hidden
				title="Suporte online"
			/>
			{isOpen ? (
				<X className="size-6 transition-transform duration-200" />
			) : (
				<MessageCircle className="size-6 transition-transform duration-200 group-hover:scale-110" />
			)}
		</button>
	);
}
