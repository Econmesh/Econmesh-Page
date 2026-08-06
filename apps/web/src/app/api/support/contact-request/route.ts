import { env } from "@econmesh/env/web";
import { z } from "zod";

const contactRequestSchema = z
	.object({
		interest: z.enum(["dmc", "mri"]),
		name: z.string().trim().min(2).max(200),
		company: z.string().trim().min(1).max(200),
		position: z.string().trim().min(1).max(200),
		email: z.string().trim().email(),
		phone: z.string().trim().min(8).max(40),
		address: z.string().trim().max(500).optional(),
		message: z.string().trim().max(5000).optional(),
	})
	.superRefine((data, ctx) => {
		if (data.interest === "mri" && !data.address) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["address"],
				message: "Endereço é obrigatório para solicitação MRI.",
			});
		}
	});

const PUBLIC_CONTACT_REQUEST_PATH = "/public/support/contact-request";

export async function POST(request: Request) {
	const apiUrl = env.NEXT_PUBLIC_API_URL;
	if (!apiUrl) {
		return Response.json(
			{ error: "API não configurada. Defina NEXT_PUBLIC_API_URL no .env." },
			{ status: 503 },
		);
	}

	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "Corpo da requisição inválido." }, { status: 400 });
	}

	const parsed = contactRequestSchema.safeParse(body);
	if (!parsed.success) {
		return Response.json({ error: "Dados inválidos." }, { status: 400 });
	}

	const upstream = await fetch(`${apiUrl}${PUBLIC_CONTACT_REQUEST_PATH}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			interest: parsed.data.interest,
			name: parsed.data.name,
			company: parsed.data.company,
			position: parsed.data.position,
			email: parsed.data.email,
			phone: parsed.data.phone,
			address: parsed.data.address || undefined,
			message: parsed.data.message || undefined,
		}),
	});

	if (!upstream.ok) {
		return Response.json(
			{ error: "Não foi possível enviar sua solicitação." },
			{ status: upstream.status },
		);
	}

	return Response.json({ success: true }, { status: 201 });
}
