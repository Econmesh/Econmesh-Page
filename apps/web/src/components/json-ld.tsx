import { siteConfig } from "@/lib/site-config";

export function OrganizationJsonLd() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: siteConfig.name,
		url: siteConfig.url,
		description: siteConfig.description,
		email: siteConfig.contact.email,
		sameAs: siteConfig.social.map((s) => s.href),
	};

	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires inline script
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	);
}
