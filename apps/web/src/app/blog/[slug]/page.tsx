import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogPostingJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getPostBySlug } from "@/lib/blog";
import { renderBlogHtml } from "@/lib/blog-html";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 60;

type PageProps = {
	params: Promise<{ slug: string }>;
};

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const { post, status } = await getPostBySlug(slug);
	if (!post || status === 410) {
		return {
			title: "Artigo indisponível",
			robots: { index: false, follow: false },
		};
	}
	const title = post.meta_title || post.title;
	const description =
		post.meta_description || post.excerpt || siteConfig.description;
	const url = `${siteConfig.url}/blog/${post.slug}`;
	return {
		title,
		description,
		authors: post.author ? [{ name: post.author }] : undefined,
		alternates: { canonical: `/blog/${post.slug}` },
		openGraph: {
			type: "article",
			title,
			description,
			url,
			publishedTime: post.published_at ?? post.publish_at ?? undefined,
			modifiedTime: post.updated_at,
			authors: post.author ? [post.author] : undefined,
			images: post.cover_image?.public_url
				? [{ url: post.cover_image.public_url, alt: post.title }]
				: undefined,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: post.cover_image?.public_url
				? [post.cover_image.public_url]
				: undefined,
		},
	};
}

function formatDate(value: string | null) {
	if (!value) return null;
	return new Date(value).toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
}

export default async function BlogPostPage({ params }: PageProps) {
	const { slug } = await params;
	const { post, status } = await getPostBySlug(slug);

	if (status === 410 || !post) {
		notFound();
	}

	const html = renderBlogHtml(post.content);
	const dateLabel = formatDate(post.published_at ?? post.publish_at);

	return (
		<>
			<BlogPostingJsonLd post={post} />
			<BreadcrumbJsonLd
				items={[
					{ name: "Home", href: "/" },
					{ name: "Blog", href: "/blog" },
					{ name: post.title, href: `/blog/${post.slug}` },
				]}
			/>
			<SiteHeader />
			<main id="main-content" className="bg-econ-cream">
				<article>
					<header className="border-b border-econ-green/10 bg-white">
						<div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
							<nav className="mb-6 text-sm text-econ-dark/60" aria-label="Breadcrumb">
								<ol className="flex flex-wrap items-center gap-2">
									<li>
										<Link href="/" className="hover:text-econ-green">
											Home
										</Link>
									</li>
									<li aria-hidden>/</li>
									<li>
										<Link href="/blog" className="hover:text-econ-green">
											Blog
										</Link>
									</li>
									<li aria-hidden>/</li>
									<li className="text-econ-dark/80 line-clamp-1">{post.title}</li>
								</ol>
							</nav>
							{post.category ? (
								<p className="mb-2 font-display font-semibold text-econ-green text-xs uppercase tracking-widest">
									{post.category}
								</p>
							) : null}
							<h1 className="font-display font-extrabold text-3xl text-econ-dark tracking-tight sm:text-4xl">
								{post.title}
							</h1>
							<div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-econ-dark/70">
								{post.author ? <span>Por {post.author}</span> : null}
								{dateLabel ? (
									<time dateTime={post.published_at ?? post.publish_at ?? undefined}>
										{dateLabel}
									</time>
								) : null}
							</div>
							{post.excerpt ? (
								<p className="mt-5 text-econ-dark/80 text-lg leading-relaxed">
									{post.excerpt}
								</p>
							) : null}
						</div>
						{post.cover_image?.public_url ? (
							<div className="relative mx-auto aspect-[21/9] max-w-5xl overflow-hidden bg-econ-dark/5 sm:rounded-t-xl">
								<Image
									src={post.cover_image.public_url}
									alt=""
									fill
									className="object-cover"
									priority
									sizes="(max-width: 1024px) 100vw, 1024px"
									unoptimized
								/>
							</div>
						) : null}
					</header>

					<div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
						<div
							className="blog-prose"
							// biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized TipTap HTML
							dangerouslySetInnerHTML={{ __html: html }}
						/>
						{post.tags.length > 0 ? (
							<ul className="mt-10 flex flex-wrap gap-2 border-t border-econ-green/10 pt-6">
								{post.tags.map((tag) => (
									<li
										key={tag}
										className="rounded-full bg-econ-green/10 px-3 py-1 font-display text-econ-dark text-xs font-semibold tracking-wide"
									>
										{tag}
									</li>
								))}
							</ul>
						) : null}
						<div className="mt-10">
							<Link
								href="/blog"
								className="font-display font-semibold text-econ-orange text-sm tracking-wide hover:underline"
							>
								← Voltar ao blog
							</Link>
						</div>
					</div>
				</article>
			</main>
			<SiteFooter />
		</>
	);
}
