import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	client: {
		NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
		NEXT_PUBLIC_ACCESS_URL: z.string().url().optional(),
	},
	runtimeEnv: {
		NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
		NEXT_PUBLIC_ACCESS_URL: process.env.NEXT_PUBLIC_ACCESS_URL,
	},
	emptyStringAsUndefined: true,
});
