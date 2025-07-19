import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Sahara Developers',
  description: 'Find answers to common questions about our construction and interior design services.',
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}