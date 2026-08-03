import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { listPublishedPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 60;

export const metadata: Metadata = {
	title: "Blog",
	description:
		"Artigos e novidades sobre economia circular, simbiose industrial e tecnologias limpas da ECONMESH.",
	alternates: {
		canonical: "/blog",
	},
	openGraph: {
		title: "Blog | ECONMESH",
		description:
			"Artigos e novidades sobre economia circular e tecnologias limpas.",
		url: `${siteConfig.url}/blog`,
		type: "website",
	},
};

function formatDate(value: string | null) {
	if (!value) return null;
	return new Date(value).toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
}

export default async function BlogIndexPage() {
	const data = await listPublishedPosts({ page: 1, page_size: 24 });

	return (
		<>
			<BreadcrumbJsonLd
				items={[
					{ name: "Home", href: "/" },
					{ name: "Blog", href: "/blog" },
				]}
			/>
			<SiteHeader />
			<main id="main-content" className="bg-econ-cream min-h-[70vh]">
				<section className="border-b border-econ-green/10 bg-white">
					<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
						<p className="mb-2 font-display font-semibold text-econ-green text-sm uppercase tracking-widest">
							Conteúdo
						</p>
						<h1 className="font-display font-extrabold text-3xl text-econ-dark tracking-wide uppercase sm:text-4xl">
							Blog ECONMESH
						</h1>
						<p className="mt-3 max-w-2xl text-econ-dark/80 leading-relaxed">
							Ideias, análises e novidades sobre economia circular e infraestrutura
							digital para a indústria.
						</p>
					</div>
				</section>

				<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
					{data.items.length === 0 ? (
						<p className="text-econ-dark/70">Nenhum artigo publicado no momento.</p>
					) : (
						<ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
							{data.items.map((post) => {
								const dateLabel = formatDate(
									post.published_at ?? post.publish_at,
								);
								return (
									<li key={post.id}>
										<article className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-transform hover:-translate-y-0.5">
											{post.cover_image?.public_url ? (
												<div className="relative aspect-[16/10] bg-econ-dark/5">
													<Image
														src={post.cover_image.public_url}
														alt=""
														fill
														className="object-cover"
														sizes="(max-width: 768px) 100vw, 33vw"
														unoptimized
													/>
												</div>
											) : (
												<div className="aspect-[16/10] bg-gradient-to-br from-econ-green/20 to-econ-dark/10" />
											)}
											<div className="flex flex-1 flex-col gap-3 p-5">
												{dateLabel ? (
													<time
														dateTime={post.published_at ?? post.publish_at ?? undefined}
														className="text-econ-green text-xs font-semibold uppercase tracking-wide"
													>
														{dateLabel}
													</time>
												) : null}
												<h2 className="font-display font-bold text-econ-dark text-lg leading-snug">
													<Link
														href={`/blog/${post.slug}`}
														className="hover:text-econ-green"
													>
														{post.title}
													</Link>
												</h2>
												{post.excerpt ? (
													<p className="line-clamp-3 text-sm text-econ-dark/75 leading-relaxed">
														{post.excerpt}
													</p>
												) : null}
												<div className="mt-auto pt-2">
													<Link
														href={`/blog/${post.slug}`}
														className="font-display font-semibold text-econ-orange text-sm tracking-wide hover:underline"
													>
														Ler artigo →
													</Link>
												</div>
											</div>
										</article>
									</li>
								);
							})}
						</ul>
					)}
				</section>
			</main>
			<SiteFooter />
		</>
	);
}
