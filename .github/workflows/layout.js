import "./globals.css";

export const metadata = {
  title: "Anna & Jonas – Unsere Hochzeit",
  description: "Alle Informationen zu unserer Hochzeit am 12. Juni 2027.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
