import { OrganizationJsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ComingSoonSection } from "@/components/sections/coming-soon-section";
import { FeatureCards } from "@/components/sections/feature-cards";
import { HeroSection } from "@/components/sections/hero-section";
import { IntroSection } from "@/components/sections/intro-section";

export default function Home() {
	return (
		<>
			<OrganizationJsonLd />
			<SiteHeader />
			<main id="main-content">
				<HeroSection />
				<FeatureCards />
				<IntroSection />
				<ComingSoonSection />
			</main>
			<SiteFooter />
		</>
	);
}
