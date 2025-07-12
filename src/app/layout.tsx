import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeepMeet.AI",
  description: "DeepMeet.AI",
  icons: ["/logo.svg"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
      <NuqsAdapter>
        <TRPCReactProvider>
          {" "}
          <html lang="en">
            <body className={`${inter.className}  antialiased`}>
              <Toaster />
              {children}
            </body>
          </html>
        </TRPCReactProvider>
      </NuqsAdapter>
    </ThemeProvider>
  );
}
