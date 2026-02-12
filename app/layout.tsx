import './globals.css'

// Fixes the "red" lines in IDE
declare global {
  interface Window {
    aiEmbedder: any;
    aiClassifier: any;
    aiGenerator: any;
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Injects the AI bootloader */}
        <script src="/ai-engine.js" defer />
      </head>
      <body>{children}</body>
    </html>
  )
}