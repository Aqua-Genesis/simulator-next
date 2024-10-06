import "./globals.css";

export const metadata = {
  title: 'Aqua Genesis',
  description: 'Create your own ocean world!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
