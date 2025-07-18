import type { Metadata } from 'next'
import TermsContent from './terms-content'

export const metadata: Metadata = {
  title: 'Terms of Service | Sahara Developers',
  description: 'Clear and fair terms of service for Sahara Developers construction and interior design services.',
}

export default function TermsPage() {
  return <TermsContent />
}