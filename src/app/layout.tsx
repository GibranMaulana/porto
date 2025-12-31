import type { Metadata } from "next";
import { Manrope, Space_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScroll";
import { ThemeProvider } from "@/providers/ThemeProvider";

const manrope = Manrope({
   variable: '--font-manrope',
   subsets: ['latin']
})

const spaceMono = Space_Mono({
   variable: '--font-space',
   weight: ['400', '700'],
})

export const metadata: Metadata = {
   title: "Gibran Maulana Azmi",
   description: "Portfolio of Gibran Maulana. Motion Enthusiast",
   keywords: ["Frontend Developer", "Creative Developer", "Next.js", "React", "Portfolio", "Framer Motion"],
   openGraph: {
     title: "Gibran Maulana Azmi | Motion Enthusiast",
     description: "Porto of Gibran Maulana Azmi V.1",
     url: "https://gibranmaulana.me", 
     siteName: "Gibran Maulana",
     images: [
       {
         url: "/image.png", 
         width: 1200,
         height: 630,
       },
     ],
     locale: "en-US",
     type: "website",
   },
 };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${spaceMono.variable} antialiased`}
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
         <SmoothScrolling>
            {children}
         </SmoothScrolling>
      </ThemeProvider>
      </body>
    </html>
  );
}
