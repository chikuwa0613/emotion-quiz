import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "占い統合診断 ～あなたの本質を読み解く～",
  description:
    "生年月日・手相・MBTIから算命学・5アニマル占い・手相占いを統合して、あなたの本質と運命を読み解く診断アプリ。",
  keywords: "占い,算命学,5アニマル,手相,MBTI,性格診断",
  openGraph: {
    title: "占い統合診断 ～あなたの本質を読み解く～",
    description: "複数の占いを統合して、あなたの本質を読み解く。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          background:
            "radial-gradient(ellipse at top, #1E2640 0%, #0B0E1A 60%)",
          minHeight: "100vh",
        }}
      >
        {children}
      </body>
    </html>
  );
}
