import { Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { hasPublishedPosts } from "@/lib/blog";
import { getFooterQuickLinks, siteConfig } from "@/lib/site-config";

const socialIcons = {
	LinkedIn: Linkedin,
	Instagram: Instagram,
	YouTube: Youtube,
} as const;

export async function SiteFooter() {
	const year = new Date().getFullYear();
	const showBlog = await hasPublishedPosts();
	const footerQuickLinks = getFooterQuickLinks(showBlog);

	return (
		<footer className="bg-econ-dark text-white" aria-labelledby="footer-heading">
			<h2 id="footer-heading" className="sr-only">
				Rodapé
			</h2>
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
				<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
					<div className="space-y-4">
						<Logo href="/" className="[&_img]:brightness-0 [&_img]:invert" />
						<p className="text-sm text-white/80 leading-relaxed">{siteConfig.tagline}</p>
					</div>

					<div>
						<h3 className="mb-4 font-display font-bold text-sm uppercase tracking-wide">
							Links rápidos
						</h3>
						<ul className="space-y-2">
							{footerQuickLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-sm text-white/80 transition-colors hover:text-econ-orange"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div id="contato">
						<h3 className="mb-4 font-display font-bold text-sm uppercase tracking-wide">
							Contato
						</h3>
						<ul className="space-y-3 text-sm text-white/80">
							<li>
								<a
									href={`mailto:${siteConfig.contact.email}`}
									className="inline-flex items-center gap-2 transition-colors hover:text-econ-orange"
								>
									<Mail className="size-4 shrink-0" aria-hidden="true" />
									{siteConfig.contact.email}
								</a>
							</li>
							<li>
								<a
									href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
									className="inline-flex items-center gap-2 transition-colors hover:text-econ-orange"
								>
									<Phone className="size-4 shrink-0" aria-hidden="true" />
									{siteConfig.contact.phone}
								</a>
							</li>
							<li className="inline-flex items-start gap-2">
								<MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
								{siteConfig.contact.location}
							</li>
						</ul>
					</div>

					<div>
						<h3 className="mb-4 font-display font-bold text-sm uppercase tracking-wide">
							Redes sociais
						</h3>
						<ul className="flex gap-3">
							{siteConfig.social.map((social) => {
								const Icon =
									socialIcons[social.label as keyof typeof socialIcons] ?? Linkedin;
								return (
									<li key={social.label}>
										<a
											href={social.href}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={social.label}
											className="flex size-11 items-center justify-center rounded-full border border-white/30 transition-colors hover:border-econ-orange hover:bg-econ-orange/20 hover:text-econ-orange"
										>
											<Icon className="size-5" aria-hidden="true" />
										</a>
									</li>
								);
							})}
						</ul>
					</div>
				</div>

				<div className="mt-12 border-white/20 border-t pt-6 text-center text-sm text-white/60">
					© {year} {siteConfig.name} — CleanTech. Todos os direitos reservados.
				</div>
			</div>
		</footer>
	);
}
