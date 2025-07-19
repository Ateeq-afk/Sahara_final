export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-sahara-primary"
    >
      Skip to main content
    </a>
  )
}