import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { hasPublishedPosts } from "@/lib/blog";
import { getNavLinks, siteConfig } from "@/lib/site-config";

export async function SiteHeader() {
	const showBlog = await hasPublishedPosts();
	const links = getNavLinks(showBlog);

	return (
		<header className="sticky top-0 z-50 border-econ-green/10 border-b bg-white shadow-sm">
			<div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
				<Logo href="/" />

				<nav className="hidden items-center gap-6 lg:flex" aria-label="Menu principal">
					{links.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="pb-1 font-display font-semibold text-econ-green text-sm tracking-wide transition-colors hover:border-econ-green/40 hover:border-b-2 hover:text-econ-dark"
						>
							{link.label}
						</Link>
					))}
				</nav>

				<div className="flex items-center gap-2">
					<a
						href={siteConfig.accessUrl}
						target={siteConfig.accessUrl.startsWith("http") ? "_blank" : undefined}
						rel={
							siteConfig.accessUrl.startsWith("http")
								? "noopener noreferrer"
								: undefined
						}
						className="hidden min-h-11 items-center rounded-full border-2 border-econ-orange px-5 font-display font-semibold text-econ-orange text-sm tracking-wide transition-colors hover:bg-econ-orange hover:text-white lg:inline-flex"
					>
						Acessar a Econmesh Circular
					</a>
					<MobileNav accessHref={siteConfig.accessUrl} links={links} />
				</div>
			</div>
		</header>
	);
}
