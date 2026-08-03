import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

type LogoProps = {
	className?: string;
	width?: number;
	height?: number;
	href?: string;
};

export function Logo({
	className,
	width = 180,
	height = 36,
	href = "/#home",
}: LogoProps) {
	return (
		<Link href={href} className={className} aria-label={`${siteConfig.name} — início`}>
			<Image
				src="/ECONMESH-LOGO.png"
				alt={siteConfig.name}
				width={width}
				height={height}
				className="h-8 w-auto md:h-9"
				priority
			/>
		</Link>
	);
}
