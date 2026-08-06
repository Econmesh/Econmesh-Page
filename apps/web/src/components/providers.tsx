"use client";

import { Toaster } from "@econmesh/ui/components/sonner";

import { ChatWidget } from "@/components/chat-widget/chat-widget";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			{children}
			<ChatWidget />
			<Toaster richColors />
		</>
	);
}
