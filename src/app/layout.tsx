import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { ArchivalAtmosphere } from '@/components/ui/ArchivalAtmosphere';

export const metadata: Metadata = {
 title: 'Osho Documentary — The Life, Teachings & Controversies of Rajneesh',
 description:
 'An impartial, evidence-graded investigative inquiry into Bhagwan Shree Rajneesh (1931–1990). Forensic examination of the Oregon commune, 1984 bioterror attack, and global legacy.',
 openGraph: {
 title: 'Osho Documentary — The Life, Teachings & Controversies of Rajneesh',
 description:
 'An impartial, evidence-graded investigative inquiry into Bhagwan Shree Rajneesh (1931–1990).',
 siteName: 'Osho Documentary',
 type: 'website',
 },
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
 <html lang="en"suppressHydrationWarning>
 <head>
 <link rel="preconnect"href="https://fonts.googleapis.com"/>
 <link rel="preconnect"href="https://fonts.gstatic.com"crossOrigin="anonymous"/>
 <link
 href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..800;1,9..144,300..700&family=Plus+Jakarta+Sans:wght@400..700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400..700;1,8..60,400..600&display=swap"
 rel="stylesheet"
 />
 </head>
 <body className="min-h-screen flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-300">
 <ThemeProvider attribute="class"defaultTheme="system"enableSystem>
 <ArchivalAtmosphere />
 <SmoothScroll>
 <Navbar />
 <main className="flex-1 pt-24">{children}</main>
 <Footer />
 <CommandPalette />
 </SmoothScroll>
 </ThemeProvider>
 </body>
 </html>
 );
}
