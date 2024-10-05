import "./globals.css";
import { Afacad } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const font = Afacad({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={font.className}
      >
        {children}
      </body>
    </html>
  );
}
