"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";

import { navLinks } from "@/lib/site-config";

type MobileNavProps = {
	accessHref: string;
};

export function MobileNav({ accessHref }: MobileNavProps) {
	const isExternalAccess = accessHref.startsWith("http");
	const [open, setOpen] = useState(false);
	const panelId = useId();

	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<div className="lg:hidden">
			<button
				type="button"
				className="flex size-11 items-center justify-center text-econ-green"
				aria-expanded={open}
				aria-controls={panelId}
				aria-label={open ? "Fechar menu" : "Abrir menu"}
				onClick={() => setOpen((prev) => !prev)}
			>
				{open ? <X className="size-6" /> : <Menu className="size-6" />}
			</button>

			{open ? (
				<>
					<button
						type="button"
						className="fixed inset-0 z-40 bg-black/40"
						aria-label="Fechar menu"
						onClick={() => setOpen(false)}
					/>
					<nav
						id={panelId}
						className="fixed top-[4.5rem] right-0 left-0 z-50 border-econ-green/20 border-b bg-white px-6 py-6 shadow-lg"
						aria-label="Menu principal"
					>
						<ul className="flex flex-col gap-1">
							{navLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="block min-h-11 py-2 font-display font-semibold text-econ-green text-sm tracking-wide"
										onClick={() => setOpen(false)}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
						<a
							href={accessHref}
							target={isExternalAccess ? "_blank" : undefined}
							rel={isExternalAccess ? "noopener noreferrer" : undefined}
							className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-econ-orange px-6 font-display font-semibold text-econ-orange text-sm tracking-wide"
							onClick={() => setOpen(false)}
						>
							ACESSAR
						</a>
					</nav>
				</>
			) : null}
		</div>
	);
}
