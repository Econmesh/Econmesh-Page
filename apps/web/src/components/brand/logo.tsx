import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

type LogoProps = {
	className?: string;
	width?: number;
	height?: number;
};

export function Logo({ className, width = 180, height = 36 }: LogoProps) {
	return (
		<Link href="#home" className={className} aria-label={`${siteConfig.name} — início`}>
			<Image
				src="/logo.svg"
				alt={siteConfig.name}
				width={width}
				height={height}
				className="h-8 w-auto md:h-9"
				priority
			/>
		</Link>
	);
}
