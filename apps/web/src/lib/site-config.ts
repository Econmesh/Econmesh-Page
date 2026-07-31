import { env } from "@econmesh/env/web";

export const siteConfig = {
	name: "ECONMESH",
	tagline: "CleanTech para a transição circular",
	description:
		"Um ecossistema digital que mapeia, conecta e viabiliza fluxos de recursos (materiais, água, energia e serviços) entre diversas empresas, de forma inteligente e confiável.",
	url: env.NEXT_PUBLIC_SITE_URL ?? "https://econmesh.com.br",
	accessUrl: env.NEXT_PUBLIC_ACCESS_APP_URL ?? "#contato",
	api: env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
	contact: {
		email: "contato@econmesh.com.br",
		phone: "(81) 99623-8779",
		location: "Recife - PE, Brasil",
	},
	social: [
		// {
		// 	label: "LinkedIn",
		// 	href: "#",
		// },
		{
			label: "Instagram",
			href: "https://www.instagram.com/econmesh",
		},
		// {
		// 	label: "YouTube",
		// 	href: "#",
		// },
	],
} as const;

export const navLinks = [
	{ href: "#home", label: "HOME" },
	{ href: "#solucoes", label: "SOLUÇÕES" },
	{ href: "#sobre", label: "SOBRE" },
	{ href: "#contato", label: "CONTATO" },
	// { href: "#novidades", label: "BLOG" },
] as const;

export const solutions = {
	heading: "Soluções da ECONMESH",
	subheading:
		"Infraestrutura digital, logística reversa e diagnóstico estratégico para acelerar a transição circular na indústria.",
	items: [
		{
			id: "plataforma",
			shortTitle: "ECONOMIA CIRCULAR",
			title: "Plataforma de Economia Circular",
			icon: "zap" as const,
			accent: "green" as const,
			paragraphs: [
				"Plataforma completa e integrada que atua como um ecossistema digital que mapeia, conecta e viabiliza fluxos de recursos (materiais, água, energia e serviços) entre diversas empresas, de forma inteligente e confiável.",
				"Seu diferencial reside em oferecer uma infraestrutura digital estratégica projetada para converter a complexidade da simbiose industrial em operações ágeis e rastreáveis. Ao integrar tecnologias como inteligência artificial e blockchain, atua como um motor de inteligência que conecta geradores de resíduos a receptores de matéria-prima secundária de forma otimizada. Através do algoritmo de Score Match, a plataforma elimina a assimetria de informações, permitindo que subprodutos industriais sejam transacionados com base em sua viabilidade técnica e econômica real.",
				"Estruturada para ser a ferramenta digital que vai apoiar as empresas no desafio da transição circular.",
			],
			modules: [
				"Comercialização de Resíduos",
				"Relação Simbiótica",
				"Transações de Compartilhamento",
			],
			closing:
				"A solução conecta empresas, reduz custos e apoia conformidade ESG com inteligência de dados. Seu modelo combina assinaturas, consultoria e serviços. A ECONMESH acelera a transição para uma economia circular real, prática e mensurável.",
		},
		
		{
			id: "dmc",
			shortTitle: "DIAGNÓSTICO DE MATURIDADE CIRCULAR",
			title: "Diagnóstico de Maturidade Circular – DMC",
			icon: "recycle" as const,
			accent: "green" as const,
			paragraphs: [
				"É uma auditoria completa formatada para avaliar a empresa em quatro dimensões estratégicas.",
				"O DMC transforma a incerteza técnica e financeira em um plano de negócios circular, permitindo que a empresa pare de tratar o resíduo como custo e passe a tratá-lo como oportunidade de lucro e conformidade.",
				"Diferentemente de inventários tradicionais de resíduos, o diagnóstico da ECONMESH analisa a dinâmica sistêmica da produção, tratando resíduos, subprodutos, capacidade ociosa e infraestrutura como ativos potenciais de um mercado circular.",
			],
			dimensions: [
				"Fluxos de Materiais",
				"Potencial de Simbiose",
				"Conformidade ESG",
				"Viabilidade Econômica",
			],
			problems: [
				"Invisibilidade do valor residual",
				"Despesas ocultas com logística e armazenamento de passivos ambientais",
				"Incerteza e risco de conformidade",
			],
		},
		{
			id: "mri",
			shortTitle: "MANUFATURA REVERSA ITINERANTE (MRI)",
			title: "Manufatura Reversa Itinerante",
			icon: "refresh" as const,
			accent: "orange" as const,
			paragraphs: [
				"É a solução definitiva para o gargalo logístico que hoje inviabiliza a economia circular em larga escala. Ao levarmos a planta de processamento até a fonte do resíduo — seja um parque solar ou uma planta industrial — eliminamos os custos proibitivos de frete e os riscos associados ao transporte de materiais de baixa densidade ou alta periculosidade.",
				"O diferencial tecnológico da MRI reside na sua agilidade e capacidade de escala, rompendo com o paradigma da centralização industrial. Enquanto as plantas convencionais exigem aportes fixos imensos e dependem de um fluxo constante de material para se manterem rentáveis, a nossa estrutura móvel é configurada para operar com máxima performance na ponta da demanda. Com o suporte de inteligência de dados, a unidade atua onde o resíduo é mais abundante e valioso, garantindo uma taxa de recuperação de materiais nobres superior às alternativas tradicionais, e tornando o ciclo de vida do produto não apenas fechado, mas economicamente vantajoso.",
				"O que apresentamos é um modelo de logística reversa descentralizada, que transforma um passivo ambiental oneroso em uma operação de alta eficiência, reduzindo drasticamente a pegada de carbono da própria cadeia de reciclagem.",
			],
		},
	],
} as const;

export const featureCards = solutions.items.map((solution) => ({
	title: solution.shortTitle,
	icon: solution.icon,
	href: `#solucao-${solution.id}`,
}));

export const team = {
	heading: "Nosso Time",
	subheading:
		"Pessoas que unem tecnologia, indústria e sustentabilidade para tornar a economia circular uma realidade prática.",
	members: [
		{
			name: "Osangela Sena",
			role: "CEO e Fundadora",
			description:
				"Economista e Cientista de Dados, é a mente por trás da arquitetura de inteligência da plataforma. Ela lidera o desenvolvimento e refinamento do algoritmo proprietário da startup (Score Match), combinando modelagem preditiva e economia para identificar padrões invisíveis de simbiose industrial e garantir que dados químicos, físicos e logísticos se traduzam em conexões sustentáveis seguras.",
			image: "/images/team/Osangela.jpg",
		},
		{
			name: "Rafaela Sena",
			role: "CSO e Fundadora",
			description:
				"Engenheira, lidera os projetos de energia solar da startup, Rafaela assegura a precisão e a confiabilidade de todas as frentes de engenharia do ecossistema. Sua visão de processos industriais e de transição energética é fundamental para viabilizar as soluções de manufatura reversa itinerante no setor fotovoltaico e coordenar com excelência técnica as integrações da plataforma com grandes polos produtivos.",
			image: "/images/team/Rafaela.jpg",
		},
		{
			name: "Danielson Holanda",
			role: "HEAD de Consultoria Ambiental",
			description:
				"Danielson é o responsável por traduzir as métricas de impacto socioambiental da Econmesh em valor tangível para as empresas. Ele lidera o desenvolvimento e aplicação do Diagnóstico de Maturidade Circular (DMC), ajudando as indústrias parceiras a implementar ações sustentáveis em escala prática e local, além de consolidar os indicadores de conformidade e governança ESG.",
			image: "/images/team/Danielson.jpg",
		},
		{
			name: "Roberto Guimarães ",
			role: "HEAD de Processos",
			description:
				"Na Econmesh, Roberto atua na linha de frente operacional, supervisionando as atividades de campo e liderando o mapeamento técnico dos fluxos de materiais e descarte das indústrias. Sua atuação garante que a validação física dos dados das empresas seja feita com alto rigor técnico e operacional, pavimentando o caminho para a simbiose industrial em escala real nos Complexos Industriais.",
			image: "/images/team/Roberto.jpg",
		},
		{
			name: "Guilherme Rodrigues",
			role: "HEAD de Automação",
			description:
				"Engenheiro, lidera os projetos de automação e manufatura avançada. Ele atua diretamente na inteligência de dados aplicada à indústria 4.0, desenhando a integração tecnológica dos sistemas de rastreamento de resíduos (incluindo hardware de sensoriamento IoT) e as interfaces que garantem o dinamismo do nosso ecossistema circular.",
			image: "/images/team/Guilherme.png",
		},
	],
} as const;

export const strategy = {
	heading: "Nossa Estratégia",
	mission: {
		title: "Missão",
		description:
			"Catalisar a transição para a economia circular por meio de solução digital inteligente que conecta empresas, viabiliza fluxos de recursos e comprova impacto de forma auditável e escalável.",
	},
	vision: {
		title: "Visão",
		description:
			"Ser a principal autoridade global em infraestrutura digital para economia circular até 2035, presente nos maiores polos industriais da América Latina e Europa.",
	},
	valuesHeading: "Valores que nos Guiam",
	values: [
		{
			title: "Inovação Disruptiva",
			description: "Tecnologia de ponta para resolver problemas reais",
			icon: "sparkles" as const,
		},
		{
			title: "Sustentabilidade Pragmática",
			description: "Impacto ambiental concreto, não apenas discurso",
			icon: "leaf" as const,
		},
		{
			title: "Confiança & Transparência",
			description: "Blockchain como pilar da credibilidade",
			icon: "shield-check" as const,
		},
		{
			title: "Colaboração & Impacto",
			description: "Crescemos juntos quando geramos valor real",
			icon: "users" as const,
		},
	],
} as const;

export const footerQuickLinks = [
	{ href: "#home", label: "Home" },
	{ href: "#solucoes", label: "Soluções" },
	{ href: "#sobre", label: "Sobre" },
	{ href: "#contato", label: "Contato" },
	// { href: "#novidades", label: "Blog" },
] as const;
