import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		API_URL: z.string().url().optional(),
	},
	client: {
		NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
		NEXT_PUBLIC_ACCESS_APP_URL: z.string().url().optional(),
	},
	runtimeEnv: {
		API_URL: process.env.API_URL,
		NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
		NEXT_PUBLIC_ACCESS_APP_URL: process.env.NEXT_PUBLIC_ACCESS_APP_URL,
	},
	emptyStringAsUndefined: true,
});
