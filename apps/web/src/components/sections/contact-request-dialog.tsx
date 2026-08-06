"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";

export type ContactRequestInterest = "dmc" | "mri";

type ContactRequestDialogProps = {
	interest: ContactRequestInterest;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description: string;
	requireAddress?: boolean;
};

type FormState = {
	name: string;
	company: string;
	position: string;
	email: string;
	phone: string;
	address: string;
	message: string;
};

const emptyForm: FormState = {
	name: "",
	company: "",
	position: "",
	email: "",
	phone: "",
	address: "",
	message: "",
};

const fieldClassName =
	"mt-1.5 w-full rounded-lg border border-econ-green/20 bg-white px-3 py-2.5 text-econ-dark text-sm outline-none transition-colors placeholder:text-econ-dark/40 focus:border-econ-orange focus:ring-2 focus:ring-econ-orange/20";

const labelClassName = "block font-display font-semibold text-econ-dark text-xs uppercase tracking-wide";

export function ContactRequestDialog({
	interest,
	open,
	onOpenChange,
	title,
	description,
	requireAddress = false,
}: ContactRequestDialogProps) {
	const titleId = useId();
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [form, setForm] = useState<FormState>(emptyForm);
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (open && !dialog.open) {
			dialog.showModal();
		} else if (!open && dialog.open) {
			dialog.close();
		}
	}, [open]);

	useEffect(() => {
		if (!open) {
			setForm(emptyForm);
			setSubmitting(false);
		}
	}, [open]);

	const updateField = (field: keyof FormState) => (value: string) => {
		setForm((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (submitting) return;

		setSubmitting(true);
		try {
			const response = await fetch("/api/support/contact-request", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					interest,
					name: form.name.trim(),
					company: form.company.trim(),
					position: form.position.trim(),
					email: form.email.trim(),
					phone: form.phone.trim(),
					address: form.address.trim() || undefined,
					message: form.message.trim() || undefined,
				}),
			});

			if (!response.ok) {
				throw new Error("submit_failed");
			}

			toast.success("Solicitação enviada com sucesso!", {
				description: "Nossa equipe entrará em contato em breve.",
			});
			onOpenChange(false);
		} catch {
			toast.error("Não foi possível enviar sua solicitação.", {
				description: "Tente novamente em instantes.",
			});
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<dialog
			ref={dialogRef}
			aria-labelledby={titleId}
			className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-econ-green/15 bg-econ-cream p-0 text-econ-dark shadow-2xl backdrop:bg-econ-dark/45"
			onClose={() => onOpenChange(false)}
			onClick={(event) => {
				if (event.target === dialogRef.current) {
					onOpenChange(false);
				}
			}}
		>
			<div className="flex items-start justify-between gap-4 border-econ-green/10 border-b px-5 py-4 sm:px-6">
				<div>
					<h2
						id={titleId}
						className="font-display font-extrabold text-econ-dark text-lg uppercase tracking-wide sm:text-xl"
					>
						{title}
					</h2>
					<p className="mt-1 text-econ-dark/70 text-sm leading-relaxed">{description}</p>
				</div>
				<button
					type="button"
					onClick={() => onOpenChange(false)}
					className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-econ-dark/60 transition-colors hover:bg-econ-green/10 hover:text-econ-dark"
					aria-label="Fechar"
				>
					<X className="size-5" aria-hidden="true" />
				</button>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4 px-5 py-5 sm:px-6">
				<div className="grid gap-4 sm:grid-cols-2">
					<label className={labelClassName}>
						Nome *
						<input
							required
							name="name"
							autoComplete="name"
							value={form.name}
							onChange={(e) => updateField("name")(e.target.value)}
							className={fieldClassName}
						/>
					</label>
					<label className={labelClassName}>
						Empresa *
						<input
							required
							name="company"
							autoComplete="organization"
							value={form.company}
							onChange={(e) => updateField("company")(e.target.value)}
							className={fieldClassName}
						/>
					</label>
				</div>

				<label className={labelClassName}>
					Cargo *
					<input
						required
						name="position"
						autoComplete="organization-title"
						value={form.position}
						onChange={(e) => updateField("position")(e.target.value)}
						className={fieldClassName}
					/>
				</label>

				{requireAddress ? (
					<label className={labelClassName}>
						Endereço *
						<input
							required
							name="address"
							autoComplete="street-address"
							value={form.address}
							onChange={(e) => updateField("address")(e.target.value)}
							className={fieldClassName}
						/>
					</label>
				) : null}

				<div className="grid gap-4 sm:grid-cols-2">
					<label className={labelClassName}>
						E-mail *
						<input
							required
							type="email"
							name="email"
							autoComplete="email"
							value={form.email}
							onChange={(e) => updateField("email")(e.target.value)}
							className={fieldClassName}
						/>
					</label>
					<label className={labelClassName}>
						Telefone *
						<input
							required
							type="tel"
							name="phone"
							autoComplete="tel"
							value={form.phone}
							onChange={(e) => updateField("phone")(e.target.value)}
							className={fieldClassName}
						/>
					</label>
				</div>

				<label className={labelClassName}>
					Mensagem <span className="font-normal normal-case tracking-normal">(opcional)</span>
					<textarea
						name="message"
						rows={3}
						value={form.message}
						onChange={(e) => updateField("message")(e.target.value)}
						className={`${fieldClassName} resize-y`}
					/>
				</label>

				<div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
					<button
						type="button"
						onClick={() => onOpenChange(false)}
						className="inline-flex min-h-11 items-center justify-center rounded-full px-5 font-display font-semibold text-econ-dark/70 text-sm tracking-wide transition-colors hover:bg-econ-green/10"
					>
						Cancelar
					</button>
					<button
						type="submit"
						disabled={submitting}
						className="inline-flex min-h-11 items-center justify-center rounded-full bg-econ-orange px-5 font-display font-semibold text-sm text-white tracking-wide transition-colors hover:bg-econ-orange/90 disabled:cursor-not-allowed disabled:opacity-60"
					>
						{submitting ? "Enviando..." : "Enviar solicitação"}
					</button>
				</div>
			</form>
		</dialog>
	);
}
