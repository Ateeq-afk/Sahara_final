import { redirect } from 'next/navigation'

// Redirect to the main consultation page
export default function ServiceConsultationPage() {
  redirect('/consultation')
}